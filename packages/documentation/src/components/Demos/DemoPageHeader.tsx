import React, { FC } from "react";

import Heading from "components/Heading";
import { Markdown } from "components/Markdown";

import { toTitle } from "utils/toTitle";

import styles from "./Demo.module.scss";

interface DemoPageHeaderProps {
  children?: string;
  packageName: string;
}

const DemoPageHeader: FC<DemoPageHeaderProps> = ({ children, packageName }) => {
  if (!children) {
    return null;
  }

  return (
    <header className={styles.container}>
      <Heading level={2} id="demo-page-title">
        {toTitle(packageName)}
      </Heading>
      <Markdown className={styles.description}>{children}</Markdown>
    </header>
  );
};

export default DemoPageHeader;
