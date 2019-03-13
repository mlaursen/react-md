import React from "react";

import DemoPage from "../DemoPage";

import SimpleExamples from "./SimpleExamples";
import simpleExamples from "./SimpleExamples.md";

import AllIcons from "./AllIcons";
import allIcons from "./AllIcons.md";

const demos = [
  {
    name: "Simple Examples",
    description: simpleExamples,
    children: <SimpleExamples />,
  },
  {
    name: "All Icons",
    description: allIcons,
    children: <AllIcons />,
  },
];

export default () => <DemoPage demos={demos} packageName="material-icons" />;
