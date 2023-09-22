"use client";
import { useCodeLanguageContext } from "@/providers/CodeLanguageProvider.jsx";
import { cnb } from "cnbuilder";
import { useState, type ReactElement } from "react";
import { CodeBlock } from "./CodeBlock.jsx";
import styles from "./CodeEditor.module.scss";
import { CodePreview } from "./CodePreview.jsx";
import { highlightCode } from "./highlightCode.js";
import { type RunnableCodeScope } from "./useDangerouslyRunnableCode.jsx";
import { getLineCount } from "./utils.js";

export interface CodeEditorProps {
  scope?: RunnableCodeScope;
  defaultCode: string;
}

export function CodeEditor(props: CodeEditorProps): ReactElement {
  const { scope, defaultCode } = props;

  const [code, setCode] = useState(defaultCode);

  const { codeLanguage } = useCodeLanguageContext();
  const className = `language-${codeLanguage}x`;
  return (
    <>
      <CodePreview code={code} scope={scope} />
      <CodeBlock
        className={className}
        lines={getLineCount(code)}
        disableMarginTop
      >
        <code
          aria-hidden
          className={cnb(className, styles.code)}
          dangerouslySetInnerHTML={{
            __html: highlightCode(code, "tsx") + "<br />",
          }}
        />
        <textarea
          value={code}
          onChange={(event) => setCode(event.currentTarget.value)}
          aria-label="Code Editor"
          className={styles.textArea}
          autoCapitalize="none"
          autoComplete="none"
          autoCorrect="none"
          spellCheck={false}
          onKeyDown={(event) => {
            const { currentTarget } = event;
            const { selectionStart, selectionEnd } = currentTarget;
            switch (event.key) {
              case "Tab": {
                event.preventDefault();
                event.stopPropagation();

                const spaces = " ".repeat(2);
                const prefix = currentTarget.value.substring(0, selectionStart);
                const suffix = currentTarget.value.substring(selectionEnd);
                currentTarget.value = `${prefix}${spaces}${suffix}`;

                const position = prefix.length + spaces.length;
                currentTarget.setSelectionRange(position, position);
                break;
              }
            }
          }}
        />
      </CodeBlock>
    </>
  );
}
