import { type Element } from "hast";

import { assertStringArray } from "./assertions.js";

const LANG_PREFIX = "language-";

export function getCodeLanguage(node: Element): string {
  const classNames = node.properties.className || [];
  assertStringArray(classNames);

  for (let i = 0; i < classNames.length; i += 1) {
    const className = classNames[i];
    if (className.startsWith(LANG_PREFIX)) {
      return className.slice(LANG_PREFIX.length);
    }
  }

  return "";
}
