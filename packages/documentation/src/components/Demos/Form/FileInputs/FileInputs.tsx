import React, { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

import DemoPage from "components/Demos/DemoPage";
import { DemoConfig } from "components/Demos/types";

import FileInputExample from "./FileInputExample";
import fileInputExample from "./FileInputExample.md";

const demos: DemoConfig[] = [
  {
    name: "File Input Example",
    description: fileInputExample,
    children: <FileInputExample />,
  },
];

export default function FileInputs(): ReactElement {
  return (
    <IconProvider>
      <DemoPage demos={demos} packageName="form" fonts={["Material Icons"]} />
    </IconProvider>
  );
}
