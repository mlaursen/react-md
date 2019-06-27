import React from "react";

import DemoPage from "../DemoPage";

import CrossFadeExamples from "./CrossFadeExamples";
import crossFadeExamples from "./CrossFadeExamples.md";

import CollapseExamples from "./CollapseExamples";
import collapseExamples from "./CollapseExamples.md";

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
];

export default () => <DemoPage demos={demos} packageName="transition" />;
