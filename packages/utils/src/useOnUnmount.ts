import { useEffect, useRef } from "react";

/**
 * A simple hook that only triggers the callback when a component is unmounted.
 * This will make sure that the callback function does not have a stale closure
 * by the time the component unmounts as well.
 *
 * @example
 * Simple Example
 * ```ts
 * useOnUnmount(() => {
 *   console.log('Component is unmounted.');
 * });
 *
 * const [data, setData] = useState(initialData);
 * useOnUnmount(() => {
 *   API.saveCurrentData(data);
 * });
 *
 * // update data
 * ```
 *
 * @remarks \@since 2.7.1
 * @param callback - the function to call when the component unmounts.
 */
export function useOnUnmount(callback: () => void): void {
  const ref = useRef(callback);
  useEffect(() => {
    ref.current = callback;
  });

  return useEffect(() => () => ref.current(), []);
}
