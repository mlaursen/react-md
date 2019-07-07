import React from "react";

import description from "./README.md";
import DemoPage from "../DemoPage";

import CheckboxAndRadioExamples from "./CheckboxAndRadioExamples";
import checkboxAndRadioExamples from "./CheckboxAndRadioExamples.md";

import CustomCheckboxes from "./CustomCheckboxes";
import customCheckboxes from "./CustomCheckboxes.md";

import SwitchExamples from "./SwitchExamples";
import switchExamples from "./SwitchExamples.md";

import SimpleFileInputs from "./SimpleFileInputs";
import simpleFileInputs from "./SimpleFileInputs.md";

import SimpleTextFields from "./SimpleTextFields";
import simpleTextFields from "./SimpleTextFields.md";

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
  {
    name: "Simple File Inputs",
    description: simpleFileInputs,
    children: <SimpleFileInputs />,
  },
  {
    name: "Simple Text Fields",
    description: simpleTextFields,
    children: <SimpleTextFields />,
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
