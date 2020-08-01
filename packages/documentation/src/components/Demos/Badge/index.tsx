import React, { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

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

// demos will be wrapped with the IconProvider just in-case people inspect the DOM
// to view the generated HTML. I want the demos to reflect the default behavior
// instead of the documentation overrides for SVG icons
export default function Badge(): ReactElement {
  return (
    <IconProvider>
      <DemoPage demos={demos} packageName="badge" fonts={["Material Icons"]} />
    </IconProvider>
  );
}
