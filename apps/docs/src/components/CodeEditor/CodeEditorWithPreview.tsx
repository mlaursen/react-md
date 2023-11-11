"use client";
import { type ReactElement } from "react";
import { type CodeBlockProps } from "../CodeBlock.js";
import { RunnableCodePreview } from "../DangerouslyRunCode/RunnableCodePreview.js";
import { type RunnableCodePreviewOptions } from "../DangerouslyRunCode/RunnableCodePreviewContainer.js";
import { type RunnableCodeScope } from "../DangerouslyRunCode/utils.js";
import { CodeEditor } from "./CodeEditor.jsx";
import { useCodeEditor } from "./useCodeEditor.js";

export interface CodeEditorWithPreviewProps
  extends Omit<CodeBlockProps, "className"> {
  lang: string;
  scope?: RunnableCodeScope;
  preview: RunnableCodePreviewOptions;
  defaultCode: string;
}

export function CodeEditorWithPreview(
  props: CodeEditorWithPreviewProps
): ReactElement {
  const { defaultCode, scope, children, preview, ...remaining } = props;
  const { code, textAreaProps } = useCodeEditor(defaultCode);

  return (
    <CodeEditor code={code} textAreaProps={textAreaProps} {...remaining}>
      <RunnableCodePreview code={code} scope={scope} {...preview} />
      {children}
    </CodeEditor>
  );
}
