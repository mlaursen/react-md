import React from "react";

import DemoPage from "../DemoPage";

import SimpleExamples from "./SimpleExamples";
import simpleExamples from "./SimpleExamples.md";

const demos = [
  {
    name: "Simple Example",
    description: simpleExamples,
    children: <SimpleExamples />,
  },
];

export default () => <DemoPage demos={demos} packageName="tooltip" />;
