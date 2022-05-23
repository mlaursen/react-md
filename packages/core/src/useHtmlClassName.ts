import { useEffect } from "react";

export function useHtmlClassName(className: string): void {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add(className);
    return () => {
      html.classList.remove(className);
    };
  }, [className]);
}
