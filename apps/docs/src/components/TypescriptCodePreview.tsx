"use client";
import { useCodeLanguageContext } from "@/providers/CodeLanguageProvider.jsx";
import { type ReactElement } from "react";
import { RunnableCodePreview } from "./DangerouslyRunCode/RunnableCodePreview.jsx";
import { type RunnableCodeScope } from "./DangerouslyRunCode/utils.jsx";
import { type HighlightedTypescriptCode } from "./TypescriptCode.jsx";

export interface TypescriptCodePreviewProps extends HighlightedTypescriptCode {
  scope: RunnableCodeScope;
}

export function TypescriptCodePreview(
  props: TypescriptCodePreviewProps
): ReactElement {
  const { ts, js, scope } = props;
  const { codeLanguage } = useCodeLanguageContext();
  const isTs = codeLanguage === "ts";
  return <RunnableCodePreview code={isTs ? ts : js} scope={scope} />;
}
