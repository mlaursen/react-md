"use client";
import {
  FullyFeaturedCodeEditor,
  type FullyFeaturedCodeEditorProps,
} from "@react-md/code/FullyFeaturedCodeEditor";
import { highlightCode } from "@react-md/code/prismjs/highlight";
import { Card } from "@react-md/core/card/Card";
import { type InlineDemoProps } from "@react-md/mdx-plugins/utils/createDemo";
import { cnb } from "cnbuilder";
import { useMemo, type PropsWithChildren, type ReactElement } from "react";
import styles from "./CodeEditor.module.scss";

export function CodeEditor(
  props: Omit<FullyFeaturedCodeEditorProps, "highlightCode" | "formatCode"> &
    InlineDemoProps
): ReactElement {
  const {
    card,
    phone,
    transparent,
    disableEditor,
    disablePreview,
    ...remaining
  } = props;

  const CodePreviewContainer = useMemo(
    () =>
      function PreviewWrapper({ children }: PropsWithChildren): ReactElement {
        if (!card) {
          return <>{children}</>;
        }

        return <Card className={cnb(phone && styles.phone)}>{children}</Card>;
      },
    [card, phone]
  );

  return (
    <FullyFeaturedCodeEditor
      {...remaining}
      CodePreviewContainer={CodePreviewContainer}
      highlightCode={highlightCode}
      formatCode={async ({ code, lang }) => {
        const [formatCode, getParserOrThrow] = await Promise.all([
          await import("@react-md/code/prettier/format.client").then(
            (mod) => mod.formatCode
          ),
          await import("@react-md/code/prettier/utils").then(
            (mod) => mod.getParserOrThrow
          ),
        ]);

        return formatCode(code, {
          parser: getParserOrThrow(lang),
        });
      }}
    />
  );
}
