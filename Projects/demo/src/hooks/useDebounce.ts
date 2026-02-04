import { useRef, useEffect } from "react";

export function useDebounce(fn: (...args: any[]) => void, delay: number) {
  const timerRef = useRef<number | null>(null);

  const debouncedFn = (...args: any[]) => {
    clearTimeout(timerRef.current as any);

    timerRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current as any);
  }, []);

  return debouncedFn;
}
