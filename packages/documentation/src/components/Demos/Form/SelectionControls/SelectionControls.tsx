import React, { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

import DemoPage from "components/Demos/DemoPage";
import { DemoConfig } from "components/Demos/types";

import CheckboxAndRadioExamples from "./CheckboxAndRadioExamples";
import checkboxAndRadioExamples from "./CheckboxAndRadioExamples.md";

import CustomCheckboxes from "./CustomCheckboxes";
import customCheckboxes from "./CustomCheckboxes.md";

import IndeterminateCheckboxes from "./IndeterminateCheckboxes";
import indeterminateCheckboxes from "./IndeterminateCheckboxes.md";

import SwitchExamples from "./SwitchExamples";
import switchExamples from "./SwitchExamples.md";

import AsyncSwitchExample from "./AsyncSwitchExample";
import asyncSwitchExample from "./AsyncSwitchExample.md";

import MenusWithFormControls from "./MenusWithFormControls";
import menusWithFormControls from "./MenusWithFormControls.md";

const demos: DemoConfig[] = [
  {
    name: "Checkbox and Radio Examples",
    description: checkboxAndRadioExamples,
    children: <CheckboxAndRadioExamples />,
  },
  {
    name: "Indeterminate Checkboxes",
    description: indeterminateCheckboxes,
    children: <IndeterminateCheckboxes />,
  },
  {
    name: "Custom Checkboxes",
    description: customCheckboxes,
    children: <CustomCheckboxes />,
  },
  {
    name: "Switch Examples",
    description: switchExamples,
    children: <SwitchExamples />,
  },
  {
    name: "Async Switch Example",
    description: asyncSwitchExample,
    children: <AsyncSwitchExample />,
  },
  {
    name: "Menus with Form Controls",
    description: menusWithFormControls,
    children: <MenusWithFormControls />,
  },
];

export default function SelectionControls(): ReactElement | null {
  return (
    <IconProvider>
      <DemoPage demos={demos} packageName="form" fonts={["Material Icons"]} />
    </IconProvider>
  );
}
