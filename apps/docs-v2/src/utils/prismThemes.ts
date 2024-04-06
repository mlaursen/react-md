import { PRISM_CSS_MAP, type PrismTheme } from "@/constants/prismThemes.js";

export const PRISM_THEMES_ID = "prism-themes";

export function getPrismThemeHref(prismTheme: PrismTheme): string {
  return `/prism-themes/${PRISM_CSS_MAP.get(prismTheme)}.min.css`;
}
