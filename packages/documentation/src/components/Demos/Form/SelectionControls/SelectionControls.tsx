import type { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

import DemoPage from "components/Demos/DemoPage";
import type { DemoConfig } from "components/Demos/types";

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
];

export default function SelectionControls(): ReactElement | null {
  return (
    <IconProvider>
      <DemoPage demos={demos} packageName="form" fonts={["Material Icons"]} />
    </IconProvider>
  );
}
