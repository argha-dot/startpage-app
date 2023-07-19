import { useRef } from "react"

function useFocusOnInputElement() {
  const htmlRef = useRef<HTMLInputElement>(null);
  const setFocus = () => {
    if (htmlRef.current) {
      htmlRef.current.focus()
    }
  }

  return { htmlRef, setFocus }
}

export {
  useFocusOnInputElement,
}
