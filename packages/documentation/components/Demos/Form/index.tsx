import React from "react";

import DemoPage from "../DemoPage";

import CheckboxAndRadioExamples from "./CheckboxAndRadioExamples";
import checkboxAndRadioExamples from "./CheckboxAndRadioExamples.md";

import TextFieldExamples from "./TextFieldExamples";
import textFieldExamples from "./TextFieldExamples.md";

import TextAreaExamples from "./TextAreaExamples";
import textAreaExamples from "./TextAreaExamples.md";

const demos = [
  {
    name: "Checkbox and Radio Examples",
    description: checkboxAndRadioExamples,
    children: <CheckboxAndRadioExamples />,
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
];

export default () => (
  <DemoPage demos={demos} packageName="form" fonts={["Material Icons"]} />
);
