import { SkipToMainContent } from "react-md";
import { type ReactElement } from "react";
import styles from "./CustomLinkStylesExample.module.scss";

export default function CustomLinkStylesExample(): ReactElement {
  return <SkipToMainContent unstyled className={styles.link} />;
}
