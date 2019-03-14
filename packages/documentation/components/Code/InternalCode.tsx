import React, { FunctionComponent, Fragment } from "react";
import Head from "next/head";
import Code, { CodeProps } from "./Code";

const InternalCode: FunctionComponent<CodeProps> = props => (
  <Fragment>
    <Head>
      <link
        key="source-code-pro"
        href="https://fonts.googleapis.com/css?family=Source+Code+Pro"
        rel="stylesheet"
      />
    </Head>
    <Code {...props} />
  </Fragment>
);

export default InternalCode;
