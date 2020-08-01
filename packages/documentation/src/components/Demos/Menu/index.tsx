import React, { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

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

import { SimpleContextMenu, simpleContextMenu } from "./SimpleContextMenu";

import HorizontalMenu from "./HorizontalMenu";
import horizontalMenu from "./HorizontalMenu.md";

import NestedDropdownMenus from "./NestedDropdownMenus";
import nestedDropdownMenus from "./NestedDropdownMenus.md";

import { CustomRenderers, customRenderers } from "./CustomRenderers";

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
    name: "Simple Context Menu",
    description: simpleContextMenu,
    children: <SimpleContextMenu />,
  },
  {
    name: "Horizontal Menu",
    description: horizontalMenu,
    children: <HorizontalMenu />,
  },
  {
    name: "Nested Dropdown Menus",
    description: nestedDropdownMenus,
    children: <NestedDropdownMenus />,
  },
  {
    name: "Custom Renderers",
    description: customRenderers,
    children: <CustomRenderers />,
  },
];

// demos will be wrapped with the IconProvider just in-case people inspect the DOM
// to view the generated HTML. I want the demos to reflect the default behavior
// instead of the documentation overrides for SVG icons
export default function Menu(): ReactElement {
  return (
    <IconProvider>
      <DemoPage demos={demos} packageName="menu" fonts={["Material Icons"]} />
    </IconProvider>
  );
}
