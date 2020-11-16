import React, { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

import description from "./README.md";
import DemoPage from "../DemoPage";

import TextFieldExample from "./TextFieldExample";
import textFieldExample from "./TextFieldExample.md";

import TextFieldTypes from "./TextFieldTypes";
import textFieldTypes from "./TextFieldTypes.md";

import TextAreaExample from "./TextAreaExample";
import textAreaExample from "./TextAreaExample.md";

import FileInputExample from "./FileInputExample";
import fileInputExample from "./FileInputExample.md";

import NativeSelectExample from "./NativeSelectExample";
import nativeSelectExample from "./NativeSelectExample.md";

import SelectExample from "./SelectExample";
import selectExample from "./SelectExample.md";

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

import {
  CustomizingSelectOptions,
  customizingSelectOptions,
} from "./CustomizingSelectOptions";

import SimpleHelpAndErrorMessages from "./SimpleHelpAndErrorMessages";
import simpleHelpAndErrorMessages from "./SimpleHelpAndErrorMessages.md";

import TextFieldHookExamples from "./TextFieldHookExamples";
import textFieldHookExamples from "./TextFieldHookExamples.md";

import NumberHookExamples from "./NumberHookExamples";
import numberHookExamples from "./NumberHookExamples.md";

import SimpleSliders from "./SimpleSliders";
import simpleSliders from "./SimpleSliders.md";

import ColorDialogSlider from "./ColorDialogSlider";
import colorDialogSlider from "./ColorDialogSlider.md";

import ExampleForm from "./ExampleForm";
import exampleForm from "./ExampleForm.md";

import WithReactHookForm from "./WithReactHookForm";
import withReactHookForm from "./WithReactHookForm.md";

const demos = [
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
    name: "Text Area Example",
    description: textAreaExample,
    children: <TextAreaExample />,
  },
  {
    name: "File Input Example",
    description: fileInputExample,
    children: <FileInputExample />,
  },
  {
    name: "Native Select Example",
    description: nativeSelectExample,
    children: <NativeSelectExample />,
  },
  {
    name: "Select Example",
    description: selectExample,
    children: <SelectExample />,
  },
  {
    name: "Customizing Select Options",
    description: customizingSelectOptions,
    children: <CustomizingSelectOptions />,
  },
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
    name: "Simple Help and Error Messages",
    description: simpleHelpAndErrorMessages,
    children: <SimpleHelpAndErrorMessages />,
  },
  {
    name: "Text Field Hook Examples",
    description: textFieldHookExamples,
    children: <TextFieldHookExamples />,
  },
  {
    name: "Number Hook Examples",
    description: numberHookExamples,
    children: <NumberHookExamples />,
  },
  {
    name: "Simple Sliders",
    description: simpleSliders,
    children: <SimpleSliders />,
  },
  {
    name: "Color Dialog Slider",
    description: colorDialogSlider,
    children: <ColorDialogSlider />,
  },
  {
    name: "Example Form",
    description: exampleForm,
    children: <ExampleForm />,
  },
  {
    name: "With React Hook Form",
    description: withReactHookForm,
    children: <WithReactHookForm />,
  },
];

// demos will be wrapped with the IconProvider just in-case people inspect the DOM
// to view the generated HTML. I want the demos to reflect the default behavior
// instead of the documentation overrides for SVG icons
export default function Form(): ReactElement {
  return (
    <IconProvider>
      <DemoPage
        demos={demos}
        packageName="form"
        description={description}
        fonts={["Material Icons"]}
      />
    </IconProvider>
  );
}
