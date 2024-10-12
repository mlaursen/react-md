import { type AnyFunction, type DebouncedFunction } from "../types.js";

/**
 * @since 6.0.0
 */
export function debounce<F extends AnyFunction>(
  fn: F,
  duration: number
): DebouncedFunction<F> {
  let timeout: NodeJS.Timeout | undefined;
  const debounced: DebouncedFunction<F> = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, duration);
  };
  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced;
}
