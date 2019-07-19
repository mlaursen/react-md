import { useEffect, useState } from "react";

export interface Heading {
  id: string;
  title: string;
}

/**
 * This hook is used to dynamically find all the heading components within the page when
 * the route changes client side only. There might be a better way to handle this for
 * SSR, but it feels like it would be something I need to figure out pre-build time.
 */
export default function usePageHeadings(
  pathname: string,
  disabled: boolean
): Heading[] {
  const [headings, setHeadings] = useState<Heading[]>([]);
  useEffect(() => {
    if (disabled) {
      return;
    }

    let cancelled = false;
    const frame = window.requestAnimationFrame(() => {
      if (cancelled) {
        return;
      }

      const nextHeadings = Array.from(
        document.querySelectorAll<HTMLElement>(".heading")
      );
      if (!nextHeadings.length) {
        setHeadings([]);
        return;
      }

      if (pathname.includes("/installation")) {
        // remove the first title from the list
        nextHeadings.splice(0, 1);
      } else if (nextHeadings[0].id === "demo-page-title") {
        // don't want to include the root level demo page title since the TOC
        // is more for demos
        nextHeadings.splice(0, 1);
      }

      setHeadings(
        nextHeadings.map(({ id, textContent }) => ({
          id,
          title: (textContent || "")
            .replace("#", "")
            .trim()
            .replace(/:$/, ""),
        }))
      );
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return headings;
}
