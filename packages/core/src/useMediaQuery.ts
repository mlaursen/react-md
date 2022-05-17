import { useEffect, useState } from "react";

/**
 *
 * @param query - The media query to use
 * @returns `true` if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const result = window.matchMedia(query);
    setMatches(result.matches);

    const updater = ({ matches }: MediaQueryListEvent): void =>
      setMatches(matches);

    result.addEventListener("change", updater);
    return () => {
      result.removeEventListener("change", updater);
    };
  }, [query]);

  return matches;
}
