import React, {
  FunctionComponent,
  ReactNode,
  useRef,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import cn from "classnames";

import Code from "./Code";
import { highlightCode } from "components/Markdown/utils";
import Head from "next/head";

export interface ICodeBlockProps {
  className?: string;
  language?: string;
  children: ReactNode;
  highlight?: boolean;
}

type WithDefaultProps = ICodeBlockProps & { language: string };

const CodeBlock: FunctionComponent<ICodeBlockProps> = props => {
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
