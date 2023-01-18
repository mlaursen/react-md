import { Button } from "@react-md/button";
import ContentCopyIcon from "@react-md/material-icons/ContentCopyIcon";
import { cnb } from "cnbuilder";
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import styles from "./CodeBlock.module.scss";
import { useCodeConfig } from "./CodeConfigProvider";
import { LineNumbers } from "./LineNumbers";
import { LIGHT_BG_THEMES } from "./themes";
import { highlightCode } from "./utils";

/**
 * All the languages that are allowed based on the installed prism plugins. If
 * another language needs to be supported, add an import in the `./utils.ts`
 * file.
 */
export type PrismLanguage =
  | "js"
  | "jsx"
  | "javascript"
  | "ts"
  | "tsx"
  | "typescript"
  | "css"
  | "scss"
  | "markup"
  | "markdown"
  | "bash"
  | "shell"
  | "git"
  | "diff"
  | "json"
  | "properties";

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  /** @defaultValue `"markdown"` */
  language?: PrismLanguage;
  children: ReactNode;

  /**
   * This should only be used when the code has been rendered by MDX. The custom
   * `mdxLineNumbers` plugin will calculate the number of lines within a code
   * block to use since the `children` will already be highlighted code.
   */
  lines?: number;

  /**
   * Set this to true if the code block should display line numbers. Defaults to
   * `true` if there are more than 3 lines.
   *
   * @defaultValue `(children.match(/\r?\n/g)?.length ?? 0) + 1 > 3`
   */
  lineNumbers?: boolean;
}

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  function CodeBlock(props, ref) {
    const {
      className,
      children,
      language = "markdown",
      lines: propLines,
      lineNumbers: propLineNumbers,
      ...remaining
    } = props;

    const code = typeof children === "string" ? children.trim() : "";
    let lines = propLines;
    let lineNumbers = propLineNumbers;
    if (typeof lines !== "undefined") {
      lineNumbers = true;
    } else {
      lines = (code.match(/\r?\n/g)?.length ?? 0) + 1;
      lineNumbers =
        propLineNumbers ??
        (!/markup|markdown|shell/.test(language) && lines > 3);
    }

    const base = `language-${language}`;
    const { theme } = useCodeConfig();
    const isLight = LIGHT_BG_THEMES.has(theme);

    return (
      <div className={styles.container}>
        <pre
          {...remaining}
          ref={ref}
          className={cnb(
            styles.pre,
            base,
            lineNumbers && styles.lineNumbers,
            lineNumbers && "line-numbers",
            className
          )}
        >
          <Button
            aria-label="Copy"
            // TODO: Add toast for success/failure. Also add tooltip
            onClick={() => navigator.clipboard.writeText(code)}
            theme="clear"
            themeType="flat"
            buttonType="icon"
            className={cnb(
              styles.copy,
              isLight && styles.bgLight,
              !isLight && styles.bgDark
            )}
          >
            <ContentCopyIcon />
          </Button>
          {lineNumbers && <LineNumbers lines={lines} />}
          {code && (
            <code
              suppressHydrationWarning={remaining.suppressHydrationWarning}
              className={base}
              dangerouslySetInnerHTML={{
                __html: highlightCode(code, language),
              }}
            />
          )}
          {!code && children}
        </pre>
      </div>
    );
  }
);
