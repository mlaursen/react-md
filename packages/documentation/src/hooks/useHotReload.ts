/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

type Refresh<T> = (key: string) => Promise<T>;

/**
 * This is a hacky way to hot-reload page props since `getInitialProps` isn't
 * run while hot-reloading.
 *
 * @param key Normally a route parameter that is used to re-trigger the effect
 * and try to get the latest value. This is also passed to the refresh function.
 * @param initial The initial value that is retrieved from `getInitialProps`
 * @param refresh A function that refreshes the state
 * @return the latest state or just the initial props in production
 */
export function useHotReload<T>(
  key: string,
  initial: T,
  refresh: Refresh<T>
): T {
  if (process.env.NODE_ENV === "production") {
    return initial;
  }

  const [state, setState] = useState(initial);
  useEffect(() => {
    let cancelled = false;

    (async function load(): Promise<void> {
      const props = await refresh(key);
      if (cancelled) {
        return;
      }

      setState(props);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
