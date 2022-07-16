import { useEffect } from "react";

/**
 * @remarks \@since 6.0.0
 */
export function useHtmlClassName(className: string): void {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add(className);
    return () => {
      html.classList.remove(className);
    };
  }, [className]);
}