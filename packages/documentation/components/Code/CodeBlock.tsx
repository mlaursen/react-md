import React, {
  forwardRef,
  FunctionComponent,
  ReactNode,
  useMemo,
} from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

import { highlightCode } from "components/Markdown/utils";

import Code from "./Code";
import LineNumbers from "./LineNumbers";
import { bem } from "@react-md/theme";

export interface CodeBlockProps {
  className?: string;
  language?: string;
  children: ReactNode;
  highlight?: boolean;
  lineNumbers?: boolean;
}

type WithRef = WithForwardedRef<HTMLPreElement>;
type DefaultProps = Required<
  Pick<CodeBlockProps, "language" | "highlight" | "lineNumbers">
>;
type WithDefaultProps = CodeBlockProps & DefaultProps & WithRef;

const block = bem("code");

const CodeBlock: FunctionComponent<CodeBlockProps & WithRef> = props => {
  const {
    className,
    language,
    children: propChildren,
    highlight,
    forwardedRef,
    lineNumbers,
  } = props as WithDefaultProps;

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
      ref={forwardedRef}
      className={cn(
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
};

const defaultProps: DefaultProps = {
  highlight: true,
  lineNumbers: false,
  language: "markdown",
};

CodeBlock.defaultProps = defaultProps;

export default forwardRef<HTMLPreElement, CodeBlockProps>((props, ref) => (
  <CodeBlock {...props} forwardedRef={ref} />
));
