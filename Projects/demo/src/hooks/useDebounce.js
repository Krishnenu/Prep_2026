import { useRef, useEffect } from "react";

export function useDebounce(fn, delay) {
  const timerRef = useRef();

  const debouncedFn = (...args) => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return debouncedFn;
}
