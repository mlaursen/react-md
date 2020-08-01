import React, { ReactElement } from "react";
import { TooltipHoverModeConfig } from "@react-md/tooltip";

import DemoPage from "../DemoPage";

import SimpleExamples from "./SimpleExamples";
import simpleExamples from "./SimpleExamples.md";

import AutoPositioningTooltips from "./AutoPositioningTooltips";
import autoPositioningTooltips from "./AutoPositioningTooltips.md";

import DenseTooltips from "./DenseTooltips";
import denseTooltips from "./DenseTooltips.md";
import DenseTooltipsWrapper from "./DenseTooltipsWrapper"; // SANDBOX_IGNORE

import LargeTooltips from "./LargeTooltips";
import largeTooltips from "./LargeTooltips.md";

import HoverMode from "./HoverMode";
import hoverMode from "./HoverMode.md";

import CommonPatterns from "./CommonPatterns";
import commonPatterns from "./CommonPatterns.md";

import AdvancedAPIAndGotchas from "./AdvancedAPIAndGotchas";
import advancedAPIAndGotchas from "./AdvancedAPIAndGotchas.md";

const demos = [
  {
    name: "Simple Examples",
    description: simpleExamples,
    children: <SimpleExamples />,
  },
  {
    name: "Auto Positioning Tooltips",
    description: autoPositioningTooltips,
    children: <AutoPositioningTooltips />,
  },
  {
    name: "Dense Tooltips",
    description: denseTooltips,
    children: (
      <DenseTooltipsWrapper>
        <DenseTooltips />
      </DenseTooltipsWrapper>
    ),
  },
  {
    name: "Large Tooltips",
    description: largeTooltips,
    children: <LargeTooltips />,
  },
  {
    name: "Hover Mode",
    description: hoverMode,
    children: <HoverMode />,
  },
  {
    name: "Common Patterns",
    description: commonPatterns,
    children: <CommonPatterns />,
  },
  {
    name: "Advanced API and Gotchas",
    description: advancedAPIAndGotchas,
    children: <AdvancedAPIAndGotchas />,
  },
].map(({ children, ...demo }) => ({
  ...demo,
  // remove the global tooltip hover mode config from all demos since it'll
  // manually be applied in a specific demo instead
  children: (
    <TooltipHoverModeConfig enabled={false}>{children}</TooltipHoverModeConfig>
  ),
}));

export default function Tooltip(): ReactElement {
  return <DemoPage demos={demos} packageName="tooltip" />;
}
