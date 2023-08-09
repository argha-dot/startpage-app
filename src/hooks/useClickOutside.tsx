import { RefObject, useEffect } from "react";

const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
) => {
  const clickHandler = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [clickHandler]);

  return ref;
};

export default useClickOutside;
