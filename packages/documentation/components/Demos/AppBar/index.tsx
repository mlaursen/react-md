import React from "react";

import DemoPage from "../DemoPage";

import SimpleUsage from "./SimpleUsage";
import simpleUsage from "./SimpleUsage.md";

import DifferentSizes from "./DifferentSizes";
import differentSizes from "./DifferentSizes.md";

import AutoDense from "./AutoDense";
import autoDense from "./AutoDense.md";

import FixedWithOffset from "./FixedWithOffset";
import fixedWithOffset from "./FixedWithOffset.md";

import AnimatingAppBar from "./AnimatingAppBar";
import animatingAppBar from "./AnimatingAppBar.md";

const demos = [
  {
    name: "Simple Usage",
    description: simpleUsage,
    phoneFullPage: true,
    children: <SimpleUsage />,
  },
  {
    name: "Different Sizes",
    description: differentSizes,
    phoneFullPage: true,
    children: <DifferentSizes />,
  },
  {
    name: "Auto Dense",
    description: autoDense,
    phoneFullPage: true,
    children: <AutoDense />,
  },
  {
    name: "Fixed with Offset",
    description: fixedWithOffset,
    phoneFullPage: true,
    children: <FixedWithOffset />,
  },
  {
    name: "Animating App Bar",
    description: animatingAppBar,
    phoneFullPage: true,
    disableFullPageAppBar: true,
    disableFullPageContent: true,
    children: <AnimatingAppBar />,
  },
];

export default () => <DemoPage demos={demos} packageName="app-bar" />;
