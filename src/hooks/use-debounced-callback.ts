import { useRef, useEffect } from 'react';

function useDebouncedCallback<A extends any[]>(
  callback: (...args: A) => void,
  wait: number
): (...args: A) => void {
  // Store callback in a ref so it's not recreated every render
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return (...args: A) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      callbackRef.current(...args);
    }, wait);
  };
}

export default useDebouncedCallback;
