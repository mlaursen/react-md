import { type PackageManager } from "@react-md/code/PackageManagerProvider";
import { type ReactElement, type ReactNode } from "react";
import { MarkdownCode } from "./MarkdownCode.jsx";
import { PackageManagerCodeBlockContainer } from "./PackageManagerCodeBlockContainer.jsx";

export interface PackageManagerCodeBlockProps {
  lineWrap?: boolean;
  managers: Record<PackageManager, string>;
}

export function PackageManagerCodeBlock(
  props: PackageManagerCodeBlockProps
): ReactElement {
  const { lineWrap, managers } = props;
  const nextManagers: Record<PackageManager, ReactNode> = { ...managers };
  Object.entries(managers).forEach(([manager, code]) => {
    nextManagers[manager] = (
      <MarkdownCode lineWrap={lineWrap} language="sh" disableMarginTop>
        {code}
      </MarkdownCode>
    );
  });

  return <PackageManagerCodeBlockContainer managers={nextManagers} />;
}
