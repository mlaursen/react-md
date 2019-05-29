import React from "react";

import README from "./README.md";
import DemoPage from "../DemoPage";

import BaseStyles from "./BaseStyles";
import baseStyles from "./BaseStyles.md";

import ResponsiveTables from "./ResponsiveTables";
import responsiveTables from "./ResponsiveTables.md";

import SimpleExamples from "./SimpleExamples";
import simpleExamples from "./SimpleExamples.md";

const demos = [
  {
    name: "Base Styles",
    description: baseStyles,
    children: <BaseStyles />,
    mobileFullPage: true,
  },
  {
    name: "Responsive Tables",
    description: responsiveTables,
    children: <ResponsiveTables />,
    // mobileFullPage: true,
  },
  {
    name: "Simple Examples",
    description: simpleExamples,
    children: <SimpleExamples />,
  },
];

export default () => (
  <DemoPage demos={demos} description={README} packageName="table" />
);
