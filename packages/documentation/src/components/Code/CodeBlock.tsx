/* eslint-disable react/no-danger */
import React, { forwardRef, ReactNode, useMemo } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

import { highlightCode } from "components/Markdown/utils";

import Code from "./Code";
import LineNumbers from "./LineNumbers";

export interface CodeBlockProps {
  className?: string;
  language?: string;
  children: ReactNode;
  highlight?: boolean;
  lineNumbers?: boolean;
}

const block = bem("code");

export default forwardRef<HTMLPreElement, CodeBlockProps>(function CodeBlock(
  {
    className,
    language = "markdown",
    children: propChildren,
    highlight = true,
    lineNumbers = false,
  },
  ref
) {
  const children = useMemo(() => {
    if (!highlight || typeof propChildren !== "string") {
      return <Code inline={false}>{propChildren}</Code>;
    }

    return (
      <code
        className={block()}
        dangerouslySetInnerHTML={{
          __html: highlightCode(propChildren, language),
        }}
      />
    );
  }, [propChildren, highlight, language]);
  return (
    <pre
      ref={ref}
      className={cnb(
        block({ block: true, counted: lineNumbers }),
        `language-${language}`,
        className
      )}
    >
      {typeof propChildren === "string" && (
        <LineNumbers enabled={lineNumbers} code={propChildren} />
      )}
      {children}
    </pre>
  );
});
