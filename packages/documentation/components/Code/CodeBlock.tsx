import React, {
  forwardRef,
  FunctionComponent,
  ReactNode,
  useMemo,
} from "react";
import { WithForwardedRef } from "@react-md/utils";

import { highlightCode } from "components/Markdown/utils";

import Code from "./Code";

export interface CodeBlockProps {
  className?: string;
  language?: string;
  children: ReactNode;
  highlight?: boolean;
}

type WithRef = WithForwardedRef<HTMLPreElement>;
type WithDefaultProps = CodeBlockProps & { language: string } & WithRef;

const CodeBlock: FunctionComponent<CodeBlockProps & WithRef> = props => {
  const {
    className,
    language,
    children: propChildren,
    highlight,
    forwardedRef,
  } = props as WithDefaultProps;

  const children = useMemo(() => {
    if (!highlight || typeof propChildren !== "string") {
      return <Code inline={false}>{propChildren}</Code>;
    }

    return (
      <code
        className="code"
        dangerouslySetInnerHTML={{
          __html: highlightCode(propChildren, language),
        }}
      />
    );
  }, [propChildren, highlight, language]);

  return (
    <pre ref={forwardedRef} className={`code code--block language-${language}`}>
      {children}
    </pre>
  );
};

CodeBlock.defaultProps = {
  highlight: true,
  language: "markdown",
};

export default forwardRef<HTMLPreElement, CodeBlockProps>((props, ref) => (
  <CodeBlock {...props} forwardedRef={ref} />
));
