import React, { FunctionComponent } from "react";

import DemoPage from "../DemoPage";

import SimpleExample from "./SimpleExample";
import simpleExample from "./SimpleExample.md";

import FullPageExample from "./FullPageExample";
import fullPageExample from "./FullPageExample.md";

import AlertDialogs from "./AlertDialogs";
import alertDialogs from "./AlertDialogs.md";

import SimpleListExample from "./SimpleListExample";
import simpleListExample from "./SimpleListExample.md";

const demos = [
  {
    name: "Simple Example",
    description: simpleExample,
    children: <SimpleExample />,
  },
  {
    name: "Full Page Example",
    description: fullPageExample,
    children: <FullPageExample />,
  },
  {
    name: "Alert Dialogs",
    description: alertDialogs,
    children: <AlertDialogs />,
  },
  {
    name: "Simple List Example",
    description: simpleListExample,
    children: <SimpleListExample />,
  },
];

export default () => <DemoPage demos={demos} packageName="dialog" />;
