import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import PositionExamples from "./PositionExamples";
import positionExamples from "./PositionExamples.md";

const demos = [
  {
    name: "Position Examples",
    description: positionExamples,
    children: <PositionExamples />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="sheet" />
);
