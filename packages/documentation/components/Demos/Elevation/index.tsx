import React from "react";

import DemoPage from "../DemoPage";

import AllElevations from "./AllElevations";
import allElevations from "./AllElevations.md";

import AnimatingElevation from "./AnimatingElevation";
import animatingElevation from "./AnimatingElevation.md";

const demos = [
  {
    name: "All Elevations",
    description: allElevations,
    children: <AllElevations />,
  },
  {
    name: "Animating Elevation",
    description: animatingElevation,
    children: <AnimatingElevation />,
  },
];

export default () => <DemoPage demos={demos} packageName="elevation" />;
