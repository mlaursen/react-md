import React, { FunctionComponent, Fragment } from "react";
import Head from "next/head";

import DemoPage from "../DemoPage";

import SimpleExamples from "./SimpleExamples";
import simpleExamples from "./SimpleExamples.md";

import IconSpacing from "./IconSpacing";
import iconSpacing from "./IconSpacing.md";

const demos = [
  {
    name: "Simple Examples",
    description: simpleExamples,
    children: <SimpleExamples />,
  },
  {
    name: "Icon Spacing",
    description: iconSpacing,
    children: <IconSpacing />,
  },
];

export default () => (
  <Fragment>
    <Head>
      <link
        key="font-awesome"
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css"
      />
    </Head>
    <DemoPage demos={demos} packageName="icon" />
  </Fragment>
);
