"use client";
import { useCodeLanguageContext } from "@/providers/CodeLanguageProvider.jsx";
import { type ReactElement, type ReactNode } from "react";
import { CodeEditorWithPreview } from "./CodeEditor/CodeEditorWithPreview.jsx";
import { type RunnableCodePreviewOptions } from "./DangerouslyRunCode/RunnableCodePreviewContainer.jsx";
import { type HighlightedTypescriptCode } from "./TypescriptCode.jsx";

export interface TypescriptCodeEditorProps extends HighlightedTypescriptCode {
  preview: RunnableCodePreviewOptions;
  children: ReactNode;
}

export function TypescriptCodeEditor(
  props: TypescriptCodeEditorProps
): ReactElement {
  const { ts, js, preview, children } = props;
  const { codeLanguage } = useCodeLanguageContext();

  return (
    <CodeEditorWithPreview
      key={codeLanguage}
      lang={`${codeLanguage}x`}
      defaultCode={codeLanguage === "ts" ? ts : js}
      preview={preview}
      disableMarginTop
    >
      {children}
    </CodeEditorWithPreview>
  );
}
