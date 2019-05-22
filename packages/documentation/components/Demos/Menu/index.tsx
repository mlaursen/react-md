import React, { Fragment } from "react";

import DemoPage from "../DemoPage";

import SimpleExamples from "./SimpleExamples";
import simpleExamples from "./SimpleExamples.md";

import AccessibilityExample from "./AccessibilityExample";
import accessibilityExample from "./AccessibilityExample.md";
import GoogleFont from "components/GoogleFont";

const demos = [
  {
    name: "Simple Examples",
    description: simpleExamples,
    children: <SimpleExamples />,
  },
  {
    name: "Accessibility Example",
    description: accessibilityExample,
    children: <AccessibilityExample />,
  },
];

export default () => (
  <Fragment>
    <GoogleFont font="Material Icons" />
    <DemoPage demos={demos} packageName="menu" />
  </Fragment>
);
