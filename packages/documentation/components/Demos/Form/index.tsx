import React from "react";

import description from "./README.md";
import DemoPage from "../DemoPage";

import CheckboxAndRadioExamples from "./CheckboxAndRadioExamples";
import checkboxAndRadioExamples from "./CheckboxAndRadioExamples.md";

import CustomCheckboxes from "./CustomCheckboxes";
import customCheckboxes from "./CustomCheckboxes.md";

import SwitchExamples from "./SwitchExamples";
import switchExamples from "./SwitchExamples.md";

const demos = [
  {
    name: "Checkbox and Radio Examples",
    description: checkboxAndRadioExamples,
    children: <CheckboxAndRadioExamples />,
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
];

export default () => (
  <DemoPage
    demos={demos}
    packageName="form"
    description={description}
    fonts={["Material Icons"]}
  />
);
