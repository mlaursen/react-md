import React from "react";

import DemoPage from "../DemoPage";

import CheckboxAndRadioExamples from "./CheckboxAndRadioExamples";
import checkboxAndRadioExamples from "./CheckboxAndRadioExamples.md";

// import CheckboxExamples from "./CheckboxExamples";
// import checkboxExamples from "./CheckboxExamples.md";

// import RadioExamples from "./RadioExamples";
// import radioExamples from "./RadioExamples.md";

import TextFieldExamples from "./TextFieldExamples";
import textFieldExamples from "./TextFieldExamples.md";

const demos = [
  {
    name: "Checkbox and Radio Examples",
    description: checkboxAndRadioExamples,
    children: <CheckboxAndRadioExamples />,
  },
  // {
  //   name: "Checkbox Examples",
  //   description: checkboxExamples,
  //   children: <CheckboxExamples />,
  // },
  // {
  //   name: "Radio Examples",
  //   description: radioExamples,
  //   children: <RadioExamples />,
  // },
  {
    name: "Text Field Examples",
    description: textFieldExamples,
    children: <TextFieldExamples />,
  },
];

export default () => (
  <DemoPage demos={demos} packageName="form" fonts={["Material Icons"]} />
);
