"use client";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import { type RunnableCodeScope } from "../DangerouslyRunCode/utils.jsx";
import { CodeBlock } from "./CodeBlock.jsx";
import styles from "./CodeEditor.module.scss";
import { CodeLanguageToggle } from "./CodeLanguageToggle.jsx";
import { CodePreview } from "./CodePreview.jsx";
import { highlightCode } from "./highlightCode.js";
import { useCodeEditor } from "./useCodeEditor.js";

export interface CodeEditorProps {
  className: string;
  scope?: RunnableCodeScope;
  defaultCode: string;
  previewCard?: boolean;
  previewCardClassName?: string;
}

export function CodeEditor(props: CodeEditorProps): ReactElement {
  const { className, scope, defaultCode, previewCard, previewCardClassName } =
    props;
  const { code, textAreaProps } = useCodeEditor(defaultCode);

  return (
    <>
      <CodePreview
        code={code}
        scope={scope}
        card={previewCard}
        cardClassName={previewCardClassName}
      />
      <CodeBlock
        className={className}
        disableMarginTop
        preProps={{
          "aria-hidden": true,
        }}
        header={
          <>
            <CodeLanguageToggle />
          </>
        }
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
            __html: highlightCode(code, "tsx") + "<br />",
          }}
        />
      </CodeBlock>
    </>
  );
}
