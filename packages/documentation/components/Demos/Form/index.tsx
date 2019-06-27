import React from "react";

import description from "./README.md";
import DemoPage from "../DemoPage";

import CheckboxAndRadioExamples from "./CheckboxAndRadioExamples";
import checkboxAndRadioExamples from "./CheckboxAndRadioExamples.md";

import CustomCheckboxes from "./CustomCheckboxes";
import customCheckboxes from "./CustomCheckboxes.md";

import SwitchExamples from "./SwitchExamples";
import switchExamples from "./SwitchExamples.md";

import TextFieldExamples from "./TextFieldExamples";
import textFieldExamples from "./TextFieldExamples.md";

import TextAreaExamples from "./TextAreaExamples";
import textAreaExamples from "./TextAreaExamples.md";

import SimpleValidation from "./SimpleValidation";
import simpleValidation from "./SimpleValidation.md";

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
    name: "Text Field Examples",
    description: textFieldExamples,
    children: <TextFieldExamples />,
  },
  {
    name: "Text Area Examples",
    description: textAreaExamples,
    children: <TextAreaExamples />,
  },
  {
    name: "Simple Validation",
    description: simpleValidation,
    children: <SimpleValidation />,
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
