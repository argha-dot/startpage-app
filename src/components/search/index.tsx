import { useFocusOnInputElement } from "@/hooks/useFocus"
import useKeyPress from "@/hooks/useKeyPress"
import styles from "@/styles/search.module.scss"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

function SearchComponent() {
  const { htmlRef, setFocus } = useFocusOnInputElement();
  const [query, setQuery] = useState("")

  const keysPressed = useKeyPress({
    targetKeys: {
      "ControlLeft": () => {},
      "KeyK": () => {},
    }
  })

  useEffect(() => {
    console.log( keysPressed )
    if (keysPressed.KeyK && keysPressed.ControlLeft) {
      console.log(keysPressed.KeyK)
      console.log(keysPressed.ControlLeft)
      console.log("crtl + k");
      setFocus()
    }
  }, [keysPressed])

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(`https://www.google.com/search?q=${query}`, '_blank')
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
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
