import React from "react";

import DemoPage from "../DemoPage";

import SimpleUsage from "./SimpleUsage";
import simpleUsage from "./SimpleUsage.md";

import ColorExamples from "./ColorExamples";
import colorExamples from "./ColorExamples.md";

const demos = [
  {
    name: "Simple Usage",
    description: simpleUsage,
    children: <SimpleUsage />,
  },
  {
    name: "Color Examples",
    description: colorExamples,
    children: <ColorExamples />,
  },
];

export default () => <DemoPage demos={demos} packageName="avatar" />;
