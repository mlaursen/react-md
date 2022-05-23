import { useEffect, useState } from "react";

/**
 *
 * @param query - The media query to use
 * @param disabled - When `true`, the `window.matchMedia` API will not be
 * activated and the hook will always return `false`.
 * @returns `true` if the media query matches
 * @remarks \@since 6.0.0
 */
export function useMediaQuery(query: string, disabled = false): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined" || disabled) {
      return false;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (disabled) {
      return;
    }

    const result = window.matchMedia(query);
    setMatches(result.matches);

    const updater = ({ matches }: MediaQueryListEvent): void =>
      setMatches(matches);

    result.addEventListener("change", updater);
    return () => {
      result.removeEventListener("change", updater);
    };
  }, [disabled, query]);

  return matches;
}
