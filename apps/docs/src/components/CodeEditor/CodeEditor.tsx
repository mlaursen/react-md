"use client";
import { highlightCode } from "@/utils/highlightCode.js";
import { MenuConfigurationProvider } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import { CodeBlock, type CodeBlockProps } from "../CodeBlock.jsx";
import { RunnableCodePreview } from "../DangerouslyRunCode/RunnableCodePreview.jsx";
import { type RunnableCodePreviewOptions } from "../DangerouslyRunCode/RunnableCodePreviewContainer.jsx";
import { type RunnableCodeScope } from "../DangerouslyRunCode/utils.jsx";
import styles from "./CodeEditor.module.scss";
import { useCodeEditor } from "./useCodeEditor.js";

export interface CodeEditorProps extends Omit<CodeBlockProps, "className"> {
  lang: string;
  scope?: RunnableCodeScope;
  defaultCode: string;
  preview: RunnableCodePreviewOptions;
}

export function CodeEditor(props: CodeEditorProps): ReactElement {
  const { defaultCode, lang, scope, children, preview, ...remaining } = props;
  const className = `language-${lang}`;
  const { code, textAreaProps } = useCodeEditor(defaultCode);
  return (
    <>
      <MenuConfigurationProvider renderAsSheet={false}>
        <RunnableCodePreview code={code} scope={scope} {...preview} />
      </MenuConfigurationProvider>
      {children}
      <CodeBlock
        {...remaining}
        className={className}
        containerProps={{ className: styles.container }}
        afterPreElement={
          <textarea
            {...textAreaProps}
            aria-label="Code Editor"
            className={styles.textArea}
            autoCapitalize="none"
            autoComplete="none"
            autoCorrect="none"
            spellCheck={false}
          />
        }
      >
        <code
          className={cnb(className, styles.code)}
          dangerouslySetInnerHTML={{
            __html: highlightCode(code, lang) + "<br />",
          }}
        />
      </CodeBlock>
    </>
  );
}
