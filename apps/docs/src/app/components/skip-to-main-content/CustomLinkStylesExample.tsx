import { SkipToMainContent } from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./CustomLinkStylesExample.module.scss";

export default function CustomLinkStylesExample(): ReactElement {
  return <SkipToMainContent unstyled className={styles.link} />;
}