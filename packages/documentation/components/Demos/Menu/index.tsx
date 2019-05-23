import React from "react";

import DemoPage from "../DemoPage";

import SimpleExamples from "./SimpleExamples";
import simpleExamples from "./SimpleExamples.md";

import AddingEventHandlers from "./AddingEventHandlers";
import addingEventHandlers from "./AddingEventHandlers.md";

import AccessibilityExample from "./AccessibilityExample";
import accessibilityExample from "./AccessibilityExample.md";

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
    name: "Accessibility Example",
    description: accessibilityExample,
    children: <AccessibilityExample />,
  },
];

export default () => (
  <DemoPage demos={demos} packageName="menu" fonts={["Material Icons"]} />
);
