"use client";
import {
  type RunnableCodePreviewContainerOptions,
  type RunnableCodePreviewOptions,
} from "@/types/code.js";
import { MenuConfigurationProvider, TooltipHoverModeProvider } from "react-md";
import { type ReactElement } from "react";
import { CodePreviewContainer } from "../CodePreviewContainer.jsx";
import { RunnableCodePreviewContainer } from "./RunnableCodePreviewContainer.jsx";
import { useDangerouslyRunnableCode } from "./useDangerouslyRunnableCode.jsx";
import { type RunnableCodeScope } from "./utils.jsx";

export interface RunnableCodePreviewProps
  extends RunnableCodePreviewOptions,
    RunnableCodePreviewContainerOptions {
  code: string;
  scope?: RunnableCodeScope;
}

export function RunnableCodePreview(
  props: RunnableCodePreviewProps
): ReactElement {
  const { code, scope, transparent, ...previewProps } = props;

  const { element, error } = useDangerouslyRunnableCode({
    code,
    scope,
  });
  return (
    <CodePreviewContainer error={error?.message} transparent={transparent}>
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
