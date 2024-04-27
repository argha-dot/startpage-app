import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

import { useFocusOnInputElement } from "@/hooks/useFocus";
import useKeyPress from "@/hooks/useKeyPress";
import parseQueryString, { SearchResultI } from "./utils";
import { useAppSelector } from "@/hooks/reduxAppHooks";
import { selectMusic } from "@/redux/musicSlice";
import SearchResults from "./results";

import styles from "@/styles/search.module.scss";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [displayValue, setDisplayValue] = useState("");
  const [_queryResults, setQueryResults] = useState<string[]>([]);
  const [searchResults, _setSearchResults] = useState<SearchResultI[]>([]);

  const { htmlRef, setFocus } = useFocusOnInputElement();
  const { playing } = useAppSelector(selectMusic);

  const keysPressed = useKeyPress({
    targetKeys: {
      ControlLeft: { callback: () => {} },
      Tab: {
        callback: () => {},
      },
      KeyK: { callback: () => {} },
      ArrowDown: {
        callback: () => {
          if (searchResults[selectedIndex + 1]) {
            setDisplayValue(searchResults[selectedIndex + 1].title);
            setSelectedIndex((prev) => prev + 1);
          }
        },
        bypassInput: "search-input",
      },
      ArrowUp: {
        callback: () => {
          if (searchResults[selectedIndex - 1]) {
            setDisplayValue(searchResults[selectedIndex - 1].title);
            setSelectedIndex((prev) => prev - 1);
          }

          if (htmlRef.current) {
            const val = htmlRef.current.value.length * 2;
            htmlRef.current.setSelectionRange(val, val);
          }
        },
        bypassInput: "search-input",
      },
      ArrowRight: { callback: () => {} },
      ArrowLeft: { callback: () => {} },
      Escape: {
        callback: () => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
            setSelectedIndex(-1);
          }
        },
        bypassInput: "all",
      },
    },
  });

  useEffect(() => {
    setFocus();
    setSelectedIndex(-1);
  }, []);

  useEffect(() => {
    if (keysPressed.KeyK && keysPressed.ControlLeft) {
      setFocus();
      setSelectedIndex(-1);
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
    setSelectedIndex(-1);
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
          autoComplete="off"
          data-input-id={"search-box"}
          value={displayValue}
          onChange={handleInputChange}
          className={styles.search_input}
          ref={htmlRef}
          type="text"
          id="search-input"
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
