import React, { FC } from "react";
import { bem } from "@react-md/theme";

import Heading from "components/Heading";
import { Markdown } from "components/Markdown";

import { toTitle } from "utils/toTitle";

interface DemoPageHeaderProps {
  children?: string;
  packageName: string;
}

const block = bem("demo");

const DemoPageHeader: FC<DemoPageHeaderProps> = ({ children, packageName }) => {
  if (!children) {
    return null;
  }

  return (
    <header className={block()}>
      <Heading level={2} id="demo-page-title">
        {toTitle(packageName)}
      </Heading>
      <Markdown className={block("description")}>{children}</Markdown>
    </header>
  );
};

export default DemoPageHeader;
