import { useHtmlClassName } from "@react-md/core";

import styles from "./SystemTheme.module.scss";

export default function SystemTheme(): null {
  useHtmlClassName(styles.container);
  return null;
}
