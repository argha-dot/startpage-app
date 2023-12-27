import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { RxCross1 } from "react-icons/rx";

import { useFocusOnInputElement } from "@/hooks/useFocus";
import useKeyPress from "@/hooks/useKeyPress";
import parseQueryString, { SearchResultI, fuzzySearchOnLinks } from "./utils";
import { useAppSelector } from "@/hooks/reduxAppHooks";
import { selectPsuedoFS } from "@/redux/psuedoFSSlice";
import { selectMusic } from "@/redux/musicSlice";
import SearchResults from "./results";

import styles from "@/styles/search.module.scss";

function SearchComponent() {
  const { htmlRef, setFocus } = useFocusOnInputElement();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [displayValue, setDisplayValue] = useState("");
  const [queryResults, setQueryResults] = useState<string[]>([]);
  const { playing } = useAppSelector(selectMusic);
  const { psuedoFS } = useAppSelector(selectPsuedoFS);
  const [searchResults, setSearchResults] = useState<SearchResultI[]>([]);
  const fileLinks = useMemo(
    () => fuzzySearchOnLinks(query, Object.entries(psuedoFS.getAllLinks())),
    [psuedoFS, query],
  );

  const keysPressed = useKeyPress({
    targetKeys: {
      ControlLeft: { callback: () => {} },
      Tab: {
        callback: () => {},
      },
      KeyK: { callback: () => {} },
      ArrowDown: {
        callback: () => {
          console.log("hi", queryResults[selectedIndex + 1]);
          if (queryResults[selectedIndex + 1]) {
            setDisplayValue(queryResults[selectedIndex + 1]);
            setSelectedIndex((prev) => prev + 1);
          }
        },
        bypassInput: true,
      },
      ArrowUp: {
        callback: () => {
          console.log("hi", queryResults[selectedIndex - 1]);
          if (queryResults[selectedIndex - 1]) {
            setDisplayValue(queryResults[selectedIndex - 1]);
            setSelectedIndex((prev) => prev - 1);
          }

          if (htmlRef.current) {
            const val = htmlRef.current.value.length * 2;
            htmlRef.current.setSelectionRange(val, val);
          }
        },
        bypassInput: true,
      },
      ArrowRight: { callback: () => {} },
      ArrowLeft: { callback: () => {} },
      Escape: {
        callback: () => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        },
        bypassInput: true,
      },
    },
  });

  useEffect(() => {
    setFocus();
  }, []);

  useEffect(() => {
    if (keysPressed.KeyK && keysPressed.ControlLeft) {
      setFocus();
    }
  }, [keysPressed]);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (query.length > 1) {
        const resp = fetch(
          `${import.meta.env.VITE_BACKEND_URL}/search/${query}`,
        );
        resp
          .then((data) => data.json())
          .then((data) => {
            setQueryResults(data);
            setSearchResults(searchResultValues());
          })
          .catch((err) => console.error(err));
      }
    }, 200);

    return () => clearTimeout(getData);
  }, [query]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(parseQueryString(displayValue), playing ? "_blank" : "_top");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setDisplayValue(e.target.value);
    setQuery(e.target.value);
  };

  const searchResultValues = (): SearchResultI[] => {
    const fLinks: SearchResultI[] = fileLinks.map(([title, link]) => {
      return {
        link,
        title,
      };
    });

    const qResults: SearchResultI[] = queryResults.map((result) => {
      return {
        title: result,
        link: `https://duckduckgo.com/?q=${result}`,
      };
    });

    return [...fLinks, ...qResults];
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <img
          width={35}
          height={35}
          className={styles.search_icon}
          src="/search.png"
          alt="Logo"
        />
        <input
          data-input-id={"search-box"}
          value={displayValue}
          onChange={handleInputChange}
          className={styles.search_input}
          ref={htmlRef}
          type="text"
        />
        {displayValue && (
          <button
            className={styles.clear_button}
            type="button"
            onClick={() => {
              setDisplayValue("");
              setQuery("");
              setFocus();
            }}
          >
            <RxCross1 />
          </button>
        )}
      </form>

      <SearchResults results={searchResults} query={query} />
    </div>
  );
}

export default SearchComponent;
