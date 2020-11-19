import React, { FC } from "react";

import Heading from "components/Heading";

import { toTitle } from "utils/toTitle";

import DemoContainer from "./DemoContainer";
import DemoDescription from "./DemoDescription";

interface DemoPageHeaderProps {
  children?: string;
  packageName: string;
}

const DemoPageHeader: FC<DemoPageHeaderProps> = ({ children, packageName }) => {
  if (!children) {
    return null;
  }

  return (
    <DemoContainer as="header">
      <Heading level={2} id="demo-page-title">
        {toTitle(packageName)}
      </Heading>
      <DemoDescription>{children}</DemoDescription>
    </DemoContainer>
  );
};

export default DemoPageHeader;
