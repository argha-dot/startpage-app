import { useFocusOnInputElement } from "@/hooks/useFocus"
import useKeyPress from "@/hooks/useKeyPress"
import styles from "@/styles/search.module.scss"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import parseQueryString from "./utils";

function SearchComponent() {
  const { htmlRef, setFocus } = useFocusOnInputElement();
  const [query, setQuery] = useState("")
  // const [searchEngine, setSearchEngine] = useState("duck")

  const keysPressed = useKeyPress({
    targetKeys: {
      "ControlLeft": () => {},
      "KeyK": () => {},
    }
  })

  useEffect(() => {
    if (keysPressed.KeyK && keysPressed.ControlLeft) {
      setFocus()
    }
  }, [keysPressed])

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(parseQueryString(query), '_blank')
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <img className={styles.search_icon} src="/duckduckgo.png" alt="Logo" />
        <input
          value={query}
          onChange={handleInputChange}
          className={styles.search_input}
          ref={htmlRef}
          type="text"
        />
      </form>
    </div>
  )
}

export default SearchComponent;
