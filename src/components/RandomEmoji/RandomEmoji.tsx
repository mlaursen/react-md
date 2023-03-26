import { randomInt } from "@react-md/core";
import type { ReactElement } from "react";
import { useRef } from "react";

import styles from "./RandomEmoji.module.scss";

// some that I found while viewing google fonts and https://en.wikipedia.org/wiki/List_of_emoticons
const LIST = [
  "(^_^;)",
  "(>_<)",
  "(^_^)b",
  "(;-;)",
  "(≥o≤)",
  "(·.·)",
  "(˚Δ˚)b",
  "(o^^)o",
  "(・・?",
  "\\(^o^)/",
];

export function RandomEmoji(): ReactElement {
  const emoji = useRef("");
  if (emoji.current === "") {
    emoji.current = LIST[randomInt({ max: LIST.length - 1 })];
  }

  return <div className={styles.container}>{emoji.current}</div>;
}
