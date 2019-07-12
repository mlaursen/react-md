import React from "react";

import description from "./README.md";
import DemoPage from "../DemoPage";

import CheckboxAndRadioExamples from "./CheckboxAndRadioExamples";
import checkboxAndRadioExamples from "./CheckboxAndRadioExamples.md";

import CustomCheckboxes from "./CustomCheckboxes";
import customCheckboxes from "./CustomCheckboxes.md";

import SwitchExamples from "./SwitchExamples";
import switchExamples from "./SwitchExamples.md";

import FileInputExample from "./FileInputExample";
import fileInputExample from "./FileInputExample.md";

import TextFieldExample from "./TextFieldExample";
import textFieldExample from "./TextFieldExample.md";

import ExampleForm from "./ExampleForm";
import exampleForm from "./ExampleForm.md";

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
    name: "File Input Example",
    description: fileInputExample,
    children: <FileInputExample />,
  },
  {
    name: "Text Field Example",
    description: textFieldExample,
    children: <TextFieldExample />,
  },
  {
    name: "Example Form",
    description: exampleForm,
    children: <ExampleForm />,
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
