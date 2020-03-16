import React, { forwardRef } from "react";

import GoogleFont from "components/GoogleFont";

import CodeBlock, { CodeBlockProps } from "./CodeBlock";

export default forwardRef<HTMLPreElement, CodeBlockProps>(
  function InternalCodeBlock(props, ref) {
    return (
      <>
        <GoogleFont font="Source Code Pro" />
        <CodeBlock ref={ref} {...props} />
      </>
    );
  }
);
