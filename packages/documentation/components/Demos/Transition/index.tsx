import React from "react";

import DemoPage from "../DemoPage";

import CrossFadeExamples from "./CrossFadeExamples";
import crossFadeExamples from "./CrossFadeExamples.md";

import CollapseExamples from "./CollapseExamples";
import collapseExamples from "./CollapseExamples.md";

import FixedPositioningExample from "./FixedPositioningExample";
import fixedPositioningExample from "./FixedPositioningExample.md";

const demos = [
  {
    name: "Cross Fade Examples",
    description: crossFadeExamples,
    children: <CrossFadeExamples />,
  },
  {
    name: "Collapse Examples",
    description: collapseExamples,
    children: <CollapseExamples />,
  },
  {
    name: "Fixed Positioning Example",
    description: fixedPositioningExample,
    children: <FixedPositioningExample />,
  },
];

export default () => <DemoPage demos={demos} packageName="transition" />;
