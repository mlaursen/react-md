"use client";
import { type ReactElement } from "react";
import { CodePreviewContainer } from "./CodePreviewContainer.jsx";
import {
  useDangerouslyRunnableCode,
  type RunnableCodeScope,
} from "./useDangerouslyRunnableCode.jsx";

export interface CodePreviewProps {
  code: string;
  scope?: RunnableCodeScope;
}

export function CodePreview(props: CodePreviewProps): ReactElement {
  const { code, scope } = props;

  const [element, error] = useDangerouslyRunnableCode({ code, scope });
  return (
    <CodePreviewContainer error={error?.message}>
      {element}
    </CodePreviewContainer>
  );
}
