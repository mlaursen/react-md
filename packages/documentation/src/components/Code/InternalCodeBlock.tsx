import React, { forwardRef, Fragment } from "react";

import GoogleFont from "components/GoogleFont";

import CodeBlock, { CodeBlockProps } from "./CodeBlock";

export default forwardRef<HTMLPreElement, CodeBlockProps>(
  function InternalCodeBlock(props, ref) {
    return (
      <Fragment>
        <GoogleFont font="Source Code Pro" />
        <CodeBlock ref={ref} {...props} />
      </Fragment>
    );
  }
);
