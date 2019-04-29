import React from "react";

import DemoPage from "../DemoPage";

import SimpleExample from "./SimpleExample";
import simpleExample from "./SimpleExample.md";

import FixingOverflowIssues from "./FixingOverflowIssues";
import fixingOverflowIssues from "./FixingOverflowIssues.md";

import CustomTheme from "./CustomTheme";
import customTheme from "./CustomTheme.md";

const demos = [
  {
    name: "Simple Example",
    description: simpleExample,
    children: <SimpleExample />,
  },
  {
    name: "Fixing Overflow Issues",
    description: fixingOverflowIssues,
    children: <FixingOverflowIssues />,
  },
  {
    name: "Custom Theme",
    description: customTheme,
    children: <CustomTheme />,
  },
];

export default () => <DemoPage demos={demos} packageName="overlay" />;
