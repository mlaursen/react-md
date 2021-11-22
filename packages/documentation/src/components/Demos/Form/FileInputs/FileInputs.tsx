import { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

import DemoPage from "components/Demos/DemoPage";
import { DemoConfig } from "components/Demos/types";

import FileInputExample from "./FileInputExample";
import fileInputExample from "./FileInputExample.md";

import SimpleFileUpload from "./SimpleFileUpload";
import simpleFileUpload from "./SimpleFileUpload.md";

import ServerUploadExample from "./ServerUploadExample";
import serverUploadExample from "./ServerUploadExample.md";

const demos: DemoConfig[] = [
  {
    name: "File Input Example",
    description: fileInputExample,
    children: <FileInputExample />,
  },
  {
    name: "Simple File Upload",
    description: simpleFileUpload,
    children: <SimpleFileUpload />,
  },
  {
    name: "Server Upload Example",
    description: serverUploadExample,
    children: <ServerUploadExample />,
    disableCard: true,
  },
];

export default function FileInputs(): ReactElement {
  return (
    <IconProvider>
      <DemoPage demos={demos} packageName="form" fonts={["Material Icons"]} />
    </IconProvider>
  );
}
