import React, {
  Fragment,
  FunctionComponent,
  ReactNode,
  useMemo,
  forwardRef,
} from "react";
import Head from "next/head";

import { highlightCode } from "components/Markdown/utils";
import Code from "./Code";
import { WithForwardedRef } from "@react-md/utils";

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
    <Fragment>
      <Head>
        <link
          key="source-code-pro"
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro"
          rel="stylesheet"
        />
      </Head>
      <pre ref={forwardedRef} className="code code--block">
        {children}
      </pre>
    </Fragment>
  );
};

CodeBlock.defaultProps = {
  highlight: true,
  language: "markup",
};

export default forwardRef<HTMLPreElement, CodeBlockProps>((props, ref) => (
  <CodeBlock {...props} forwardedRef={ref} />
));
