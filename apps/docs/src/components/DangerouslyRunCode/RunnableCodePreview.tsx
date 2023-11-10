"use client";
import {
  MenuConfigurationProvider,
  TooltipHoverModeProvider,
} from "@react-md/core";
import { type ReactElement } from "react";
import { CodePreviewContainer } from "../CodePreviewContainer.jsx";
import {
  RunnableCodePreviewContainer,
  type RunnableCodePreviewOptions,
} from "./RunnableCodePreviewContainer.jsx";
import { useDangerouslyRunnableCode } from "./useDangerouslyRunnableCode.jsx";
import { type RunnableCodeScope } from "./utils.jsx";

export interface RunnableCodeOptions {}

export interface RunnableCodeAndPreviewOptions
  extends RunnableCodeOptions,
    RunnableCodePreviewOptions {}

export interface RunnableCodePreviewProps
  extends RunnableCodeAndPreviewOptions {
  code: string;
  scope?: RunnableCodeScope;
}

export function RunnableCodePreview(
  props: RunnableCodePreviewProps
): ReactElement {
  const { code, scope, ...previewProps } = props;

  const { element, error } = useDangerouslyRunnableCode({
    code,
    scope,
  });
  return (
    <CodePreviewContainer error={error?.message}>
      <RunnableCodePreviewContainer {...previewProps}>
        <MenuConfigurationProvider renderAsSheet={false}>
          <TooltipHoverModeProvider disableTimeout={0}>
            {element}
          </TooltipHoverModeProvider>
        </MenuConfigurationProvider>
      </RunnableCodePreviewContainer>
    </CodePreviewContainer>
  );
}
