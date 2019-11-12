import React, { ReactElement } from "react";

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

export default (): ReactElement => (
  <DemoPage
    demos={demos}
    packageName="icon"
    fonts={["Material Icons", "Font Awesome"]}
  />
);
