import useRefCache from "./useRefCache";

/**
 * This hook is just a simple wrapper of the `useRefCache` that just returns
 * the `.current` value.
 *
 * @param value The value that should be tracked
 * @return the previous value of the provided value
 */
export default function usePrevious<T>(value: T) {
  return useRefCache(value).current;
}
