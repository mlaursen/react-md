import type { ReactElement } from "react";

import Heading from "components/Heading";

import { toTitle } from "utils/toTitle";

import DemoContainer from "./DemoContainer";
import DemoDescription from "./DemoDescription";

interface DemoPageHeaderProps {
  children?: string;
  packageName: string;
}

export default function DemoPageHeader({
  children,
  packageName,
}: DemoPageHeaderProps): ReactElement | null {
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
}
