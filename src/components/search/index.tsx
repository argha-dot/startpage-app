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
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [displayValue, setDisplayValue] = useState("");
  const [queryResults, setQueryResults] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResultI[]>([]);

  const { htmlRef, setFocus } = useFocusOnInputElement();
  const { playing } = useAppSelector(selectMusic);
  const { psuedoFS } = useAppSelector(selectPsuedoFS);
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
          if (searchResults[selectedIndex + 1]) {
            setDisplayValue(searchResults[selectedIndex + 1].title);
            setSelectedIndex((prev) => prev + 1);
          }
        },
        bypassInput: true,
      },
      ArrowUp: {
        callback: () => {
          console.log("hi", queryResults[selectedIndex - 1]);
          if (searchResults[selectedIndex - 1]) {
            setDisplayValue(searchResults[selectedIndex - 1].title);
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
            setSearchResults(searchResultValues(data));
          })
          .catch((err) => console.error(err));
      }
    }, 200);

    return () => clearTimeout(getData);
  }, [query]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(
      parseQueryString(
        -1 === selectedIndex ? displayValue : searchResults[selectedIndex].link,
      ),
      playing ? "_blank" : "_top",
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setDisplayValue(e.target.value);
    setQuery(e.target.value);
  };

  const searchResultValues = (data: any): SearchResultI[] => {
    const fLinks: SearchResultI[] = fileLinks.map(([title, link]) => {
      return {
        link,
        title,
      };
    });

    const qResults: SearchResultI[] = data.map((result: string) => {
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
              setSelectedIndex(-1);
              setDisplayValue("");
              setQuery("");
              setFocus();
            }}
          >
            <RxCross1 />
          </button>
        )}
      </form>

      <SearchResults
        selected={selectedIndex}
        results={searchResults}
        query={query}
      />
    </div>
  );
}

export default SearchComponent;
