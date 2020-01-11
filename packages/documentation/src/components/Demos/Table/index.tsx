import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import LowLevelComponents from "./LowLevelComponents";
import lowLevelComponents from "./LowLevelComponents.md";

// import BaseStyles from "./BaseStyles";
// import baseStyles from "./BaseStyles.md";

// import ResponsiveTables from "./ResponsiveTables";
// import responsiveTables from "./ResponsiveTables.md";

// import SimpleExamples from "./SimpleExamples";
// import simpleExamples from "./SimpleExamples.md";

const demos = [
  {
    name: "Low Level Components",
    description: lowLevelComponents,
    children: <LowLevelComponents />,
  },
  // {
  //   name: "Base Styles",
  //   description: baseStyles,
  //   children: <BaseStyles />,
  //   mobileFullPage: true,
  // },
  // {
  //   name: "Responsive Tables",
  //   description: responsiveTables,
  //   children: <ResponsiveTables />,
  //   // mobileFullPage: true,
  // },
  // {
  //   name: "Simple Examples",
  //   description: simpleExamples,
  //   children: <SimpleExamples />,
  // },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="table" />
);
