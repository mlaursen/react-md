import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import SimpleResponsiveMedia from "./SimpleResponsiveMedia";
import simpleResponsiveMedia from "./SimpleResponsiveMedia.md";

import ForcedAspectRatio from "./ForcedAspectRatio";
import forcedAspectRatio from "./ForcedAspectRatio.md";

import WithOverlay from "./WithOverlay";
import withOverlay from "./WithOverlay.md";

const demos = [
  {
    name: "Simple Responsive Media",
    description: simpleResponsiveMedia,
    children: <SimpleResponsiveMedia />,
  },
  {
    name: "Forced Aspect Ratio",
    description: forcedAspectRatio,
    children: <ForcedAspectRatio />,
  },
  {
    name: "With Overlay",
    description: withOverlay,
    children: <WithOverlay />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="media" />
);
