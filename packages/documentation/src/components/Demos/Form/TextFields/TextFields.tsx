import type { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

import DemoPage from "components/Demos/DemoPage";
import type { DemoConfig } from "components/Demos/types";

import TextFieldExample from "./TextFieldExample";
import textFieldExample from "./TextFieldExample.md";

import TextFieldTypes from "./TextFieldTypes";
import textFieldTypes from "./TextFieldTypes.md";

import TextAreaExample from "./TextAreaExample";
import textAreaExample from "./TextAreaExample.md";

import NumberHookExamples from "./NumberHookExamples";
import numberHookExamples from "./NumberHookExamples.md";

const demos: DemoConfig[] = [
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
    name: "Number Hook Examples",
    description: numberHookExamples,
    children: <NumberHookExamples />,
  },
];

export default function TextFields(): ReactElement | null {
  return (
    <IconProvider>
      <DemoPage demos={demos} packageName="form" fonts={["Material Icons"]} />
    </IconProvider>
  );
}
