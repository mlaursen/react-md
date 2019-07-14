import React from "react";

import description from "./README.md";
import DemoPage from "../DemoPage";

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

import FileInputExample from "./FileInputExample";
import fileInputExample from "./FileInputExample.md";

import TextFieldExample from "./TextFieldExample";
import textFieldExample from "./TextFieldExample.md";

import TextFieldTypes from "./TextFieldTypes";
import textFieldTypes from "./TextFieldTypes.md";

import NativeSelectExample from "./NativeSelectExample";
import nativeSelectExample from "./NativeSelectExample.md";

import TextAreaExample from "./TextAreaExample";
import textAreaExample from "./TextAreaExample.md";

import ExampleForm from "./ExampleForm";
import exampleForm from "./ExampleForm.md";

const demos = [
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
    name: "Text Field Types",
    description: textFieldTypes,
    children: <TextFieldTypes />,
  },
  {
    name: "Native Select Example",
    description: nativeSelectExample,
    children: <NativeSelectExample />,
  },
  {
    name: "Text Area Example",
    description: textAreaExample,
    children: <TextAreaExample />,
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
