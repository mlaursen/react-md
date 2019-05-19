import React, { Fragment } from "react";
import Head from "next/head";

import DemoPage from "../DemoPage";

import SimpleExamples from "./SimpleExamples";
import simpleExamples from "./SimpleExamples.md";

import IconSpacing from "./IconSpacing";
import iconSpacing from "./IconSpacing.md";
import GoogleFont from "components/GoogleFont";

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
    <GoogleFont font="Material Icons" />
    <DemoPage demos={demos} packageName="icon" />
  </Fragment>
);
