import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import SimpleExample from "./SimpleExample";
import simpleExample from "./SimpleExample.md";

const demos = [
  {
    name: "Simple Example",
    description: simpleExample,
    children: <SimpleExample />,
  },
];

export default function Theme(): ReactElement {
  return <DemoPage demos={demos} packageName="theme" />;
}
