"use client";
import { useCodeLanguageContext } from "@/providers/CodeLanguageProvider.jsx";
import { type ReactElement } from "react";
import { type RunnableCodeScope } from "../DangerouslyRunCode/utils.jsx";
import { CodeEditor } from "./CodeEditor.jsx";

export interface CodeEditorContainerProps {
  scope?: RunnableCodeScope;
  defaultTsCode: string;
  defaultJsCode: string;
  previewCard?: boolean;
  previewCardClassName?: string;
}

export function CodeEditorContainer(
  props: CodeEditorContainerProps
): ReactElement {
  const {
    scope,
    defaultTsCode,
    defaultJsCode,
    previewCard,
    previewCardClassName,
  } = props;

  const { codeLanguage } = useCodeLanguageContext();
  const className = `language-${codeLanguage}x`;
  return (
    <CodeEditor
      key={codeLanguage}
      scope={scope}
      className={className}
      defaultCode={codeLanguage === "ts" ? defaultTsCode : defaultJsCode}
      previewCard={previewCard}
      previewCardClassName={previewCardClassName}
    />
  );
}
