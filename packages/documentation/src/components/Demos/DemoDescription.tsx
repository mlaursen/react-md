import React, { ReactElement } from "react";
import Markdown, { MarkdownProps } from "components/Markdown/Markdown";

import styles from "./DemoDescription.module.scss";

export default function DemoDescription(props: MarkdownProps): ReactElement {
  return <Markdown {...props} className={styles.container} />;
}
