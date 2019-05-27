import React from "react";

import DemoPage from "../DemoPage";

import SimpleExamples from "./SimpleExamples";
import simpleExamples from "./SimpleExamples.md";

import AddingEventHandlers from "./AddingEventHandlers";
import addingEventHandlers from "./AddingEventHandlers.md";

import MenuPositioning from "./MenuPositioning";
import menuPositioning from "./MenuPositioning.md";

import FixingOverflowIssues from "./FixingOverflowIssues";
import fixingOverflowIssues from "./FixingOverflowIssues.md";

import AccessibilityExample from "./AccessibilityExample";
import accessibilityExample from "./AccessibilityExample.md";

import HorizontalMenu from "./HorizontalMenu";
import horizontalMenu from "./HorizontalMenu.md";

import CustomRenderers from "./CustomRenderers";
import customRenderers from "./CustomRenderers.md";

const demos = [
  {
    name: "Simple Examples",
    description: simpleExamples,
    children: <SimpleExamples />,
  },
  {
    name: "Adding Event Handlers",
    description: addingEventHandlers,
    children: <AddingEventHandlers />,
  },
  {
    name: "Menu Positioning",
    description: menuPositioning,
    children: <MenuPositioning />,
  },
  {
    name: "Fixing Overflow Issues",
    description: fixingOverflowIssues,
    children: <FixingOverflowIssues />,
  },
  {
    name: "Accessibility Example",
    description: accessibilityExample,
    children: <AccessibilityExample />,
  },
  {
    name: "Horizontal Menu",
    description: horizontalMenu,
    children: <HorizontalMenu />,
  },
  {
    name: "Custom Renderers",
    description: customRenderers,
    children: <CustomRenderers />,
  },
];

export default () => (
  <DemoPage demos={demos} packageName="menu" fonts={["Material Icons"]} />
);
