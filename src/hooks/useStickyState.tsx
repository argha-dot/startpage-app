import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

type SavableData = string | number | object | boolean | undefined | null;

const useStickyState = <T extends SavableData>(
  defaultValue: T,
  key: string
): [value: T, setValue: Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    const v = localStorage.getItem(key);
    if (v === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(v);
    } catch {
      console.error("error parsing saved data");
    }
  });

  const debouncedValue = useDebounce(value, 1000);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, debouncedValue]);

  return [value, setValue];
};

export default useStickyState;
