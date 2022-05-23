import { useHtmlClassName } from "@react-md/core";

import styles from "./LightTheme.module.scss";

export default function LightTheme(): null {
  useHtmlClassName(styles.container);
  return null;
}
