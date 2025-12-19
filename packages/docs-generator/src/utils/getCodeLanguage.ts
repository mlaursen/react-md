import { type Element } from "hast";

import { assertStringArray } from "./assertions.js";

const LANG_PREFIX = "language-";

export function getCodeLanguage(node: Element): string {
  const classNames = node.properties.className || [];
  assertStringArray(classNames);

  for (const className of classNames) {
    if (className.startsWith(LANG_PREFIX)) {
      return className.slice(LANG_PREFIX.length);
    }
  }

  return "";
}
