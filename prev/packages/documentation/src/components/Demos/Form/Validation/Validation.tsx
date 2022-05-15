import type { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

import DemoPage from "components/Demos/DemoPage";
import type { DemoConfig } from "components/Demos/types";

import ExampleForm from "./ExampleForm";
import exampleForm from "./ExampleForm.md";

import SimpleHelpAndErrorMessages from "./SimpleHelpAndErrorMessages";
import simpleHelpAndErrorMessages from "./SimpleHelpAndErrorMessages.md";

import TextFieldHookExamples from "./TextFieldHookExamples";
import textFieldHookExamples from "./TextFieldHookExamples.md";

import WithReactHookForm from "./WithReactHookForm";
import withReactHookForm from "./WithReactHookForm.md";

const demos: DemoConfig[] = [
  {
    name: "Example Form",
    description: exampleForm,
    children: <ExampleForm />,
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
    name: "With React Hook Form",
    description: withReactHookForm,
    children: <WithReactHookForm />,
  },
];

export default function Validation(): ReactElement | null {
  return (
    <IconProvider>
      <DemoPage demos={demos} packageName="form" fonts={["Material Icons"]} />
    </IconProvider>
  );
}
