import { highlightCode } from "@/utils/highlightCode.js";
import { cssUtils, type TextAreaProps } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";
import { CodeBlock, type CodeBlockProps } from "../CodeBlock.jsx";
import styles from "./CodeEditor.module.scss";
import { type CodeEditorTextAreaProps } from "./useCodeEditor.js";

export interface CodeEditorProps
  extends Omit<CodeBlockProps, "className" | "children"> {
  lang: string;
  code: string;
  textAreaProps: TextAreaProps & CodeEditorTextAreaProps;
  children?: ReactNode;
}

export function CodeEditor(props: CodeEditorProps): ReactElement {
  const { code, textAreaProps, lang, children, ...remaining } = props;

  const className = `language-${lang}`;
  return (
    <>
      {children}
      <CodeBlock
        {...remaining}
        className={className}
        containerProps={{ className: styles.container }}
        afterPreElement={
          <textarea
            {...textAreaProps}
            aria-label="Code Editor"
            className={cssUtils({
              className: styles.textArea,
              fullWidth: true,
            })}
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
