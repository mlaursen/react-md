import { useHtmlClassName } from "@react-md/core";

import styles from "./DarkTheme.module.scss";

export default function DarkTheme(): null {
  useHtmlClassName(styles.container);
  return null;
}
