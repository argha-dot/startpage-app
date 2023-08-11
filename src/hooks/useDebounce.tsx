import { useEffect, useState } from "react";

const useDebounce = <T,>(value: T, delay?: number): T => {
  const [debounceVal, setDebounceVal] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceVal(value), delay || 500);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceVal;
};

export default useDebounce;
