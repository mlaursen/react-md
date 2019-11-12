import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import SimpleExamples from "./SimpleExamples";
import simpleExamples from "./SimpleExamples.md";

import ThemedBadges from "./ThemedBadges";
import themedBadges from "./ThemedBadges.md";

import WithTooltips from "./WithTooltips";
import withTooltips from "./WithTooltips.md";

import CustomizingBadges from "./CustomizingBadges";
import customizingBadges from "./CustomizingBadges.md";

const demos = [
  {
    name: "Simple Examples",
    description: simpleExamples,
    children: <SimpleExamples />,
  },
  {
    name: "Themed Badges",
    description: themedBadges,
    children: <ThemedBadges />,
  },
  {
    name: "With Tooltips",
    description: withTooltips,
    children: <WithTooltips />,
  },
  {
    name: "Customizing Badges",
    description: customizingBadges,
    children: <CustomizingBadges />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="badge" fonts={["Material Icons"]} />
);
