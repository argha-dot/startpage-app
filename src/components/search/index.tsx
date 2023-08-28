import { useFocusOnInputElement } from "@/hooks/useFocus";
import useKeyPress from "@/hooks/useKeyPress";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import parseQueryString from "./utils";
import { useAppSelector } from "@/hooks/reduxAppHooks";
import { selectMusic } from "@/redux/musicSlice";
import SearchResults from "./results";

import styles from "@/styles/search.module.scss";

function SearchComponent() {
  const { htmlRef, setFocus } = useFocusOnInputElement();
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState<string[]>([]);
  const { playing } = useAppSelector(selectMusic);

  const keysPressed = useKeyPress({
    targetKeys: {
      ControlLeft: () => {},
      KeyK: () => {},
      Escape: () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
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
          `${import.meta.env.VITE_BACKEND_URL}/search/${query}`
        );
        resp
          .then((data) => data.json())
          .then((data) => setQueryResults(data))
          .catch((err) => console.error(err));
      }
    }, 200);

    return () => clearTimeout(getData);
  }, [query]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(parseQueryString(query), playing ? "_blank" : "_top");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
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
          value={query}
          onChange={handleInputChange}
          className={styles.search_input}
          ref={htmlRef}
          type="text"
        />
      </form>

      <SearchResults queryResults={queryResults} query={query} />
    </div>
  );
}

export default SearchComponent;
