import React, { Fragment, FunctionComponent, ReactNode, useMemo } from "react";
import cn from "classnames";
import Head from "next/head";

import { highlightCode } from "components/Markdown/utils";
import Code from "./Code";

export interface CodeBlockProps {
  className?: string;
  language?: string;
  children: ReactNode;
  highlight?: boolean;
}

type WithDefaultProps = CodeBlockProps & { language: string };

const CodeBlock: FunctionComponent<CodeBlockProps> = props => {
  const {
    className,
    language,
    children: propChildren,
    highlight,
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
      <pre
        className={cn("code code--block", {
          [`language-${language}`]: language,
        })}
      >
        {children}
      </pre>
    </Fragment>
  );
};

CodeBlock.defaultProps = {
  highlight: true,
  language: "markup",
};

export default CodeBlock;
