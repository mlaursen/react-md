import { type HtmlTagDescriptor } from "vite";

export const PRECONNECT_LINKS: readonly HtmlTagDescriptor[] = [
  {
    tag: "link",
    attrs: {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    injectTo: "head-prepend",
  },
  {
    tag: "link",
    attrs: {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    injectTo: "head-prepend",
  },
];

export const MATERIAL_SYMBOL_NAME_REGEXP =
  /<MaterialSymbol\s+(?:[^>]*\s+)?name=["']([^"']+)["']/gs;
