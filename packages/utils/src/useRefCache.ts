import { MutableRefObject, useEffect, useRef } from "react";

/**
 * This hook allows you to provide anything that should be "cached" and puts it
 * into a ref that'll be updated each render. This is pretty overkill for most
 * places, but it's really nice when you want to create event handlers that
 * shouldn't update if the developer used arrow functions to define callbacks.
 * (A great example is for ref callbacks that *shouldn't* be triggered each
 * render. But that might just be a programming error instead).
 *
 * @param cacheable - The cacheable thing that gets updated after each render.
 * @returns a mutable ref object containing the current cache.
 */
export function useRefCache<T>(cacheable: T): MutableRefObject<T> {
  const ref = useRef(cacheable);
  useEffect(() => {
    ref.current = cacheable;
  });

  return ref;
}
