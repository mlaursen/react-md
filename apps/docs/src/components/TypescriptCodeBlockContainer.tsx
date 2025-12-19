"use client";

import { CodeBlockAppBar } from "@react-md/code/CodeBlockAppBar";
import { CodeBlockFileName } from "@react-md/code/CodeBlockFileName";
import { type HighlightedCodeBlockWithAppBarAdditionalProps } from "@react-md/code/HighlightedCodeBlockWithAppBar";
import { useTypescriptEnabledContext } from "@react-md/code/TypescriptEnabledProvider";
import { type ReactElement, type ReactNode } from "react";

import { ConfigureTypescriptEnabled } from "./MainLayout/ConfigureTypescriptEnabled.js";

export interface TypescriptCodeBlockContainerProps extends HighlightedCodeBlockWithAppBarAdditionalProps {
  tsCode: ReactNode;
  jsCode: ReactNode;
  disableAppBar?: boolean;
}

export function TypescriptCodeBlockContainer(
  props: TypescriptCodeBlockContainerProps
): ReactElement {
  const {
    jsCode,
    tsCode,
    fileName,
    appBarProps,
    appBarChildren,
    disableAppBar,
  } = props;
  const { isTypescriptEnabled } = useTypescriptEnabledContext();

  return (
    <>
      {!disableAppBar && (
        <CodeBlockAppBar {...appBarProps}>
          {fileName && <CodeBlockFileName>{fileName}</CodeBlockFileName>}
          {appBarChildren}
          <ConfigureTypescriptEnabled disableLabel />
        </CodeBlockAppBar>
      )}
      {isTypescriptEnabled ? tsCode : jsCode}
    </>
  );
}
