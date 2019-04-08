import React, {
  Fragment,
  FunctionComponent,
  ReactNode,
  useMemo,
  forwardRef,
} from "react";
import Head from "next/head";
import { WithForwardedRef } from "@react-md/utils";

import { highlightCode } from "components/Markdown/utils";

import CodeBlock, { CodeBlockProps } from "./CodeBlock";

type WithRef = WithForwardedRef<HTMLPreElement>;

const InternalCodeBlock: FunctionComponent<CodeBlockProps & WithRef> = ({
  forwardedRef,
  ...props
}) => {
  return (
    <Fragment>
      <Head>
        <link
          key="source-code-pro"
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro"
          rel="stylesheet"
        />
      </Head>
      <CodeBlock ref={forwardedRef} {...props} />
    </Fragment>
  );
};

export default forwardRef<HTMLPreElement, CodeBlockProps>((props, ref) => (
  <InternalCodeBlock {...props} forwardedRef={ref} />
));
