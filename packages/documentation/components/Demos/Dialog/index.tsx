import React from "react";

import DemoPage from "../DemoPage";

import SimpleExample from "./SimpleExample";
import simpleExample from "./SimpleExample.md";

import FullPageExample from "./FullPageExample";
import fullPageExample from "./FullPageExample.md";

import SimpleListExample from "./SimpleListExample";
import simpleListExample from "./SimpleListExample.md";

import AlertDialogsAndModals from "./AlertDialogsAndModals";
import alertDialogsAndModals from "./AlertDialogsAndModals.md";

import FixedDialogExample from "./FixedDialogExample";
import fixedDialogExample from "./FixedDialogExample.md";

import NestedDialogs from "./NestedDialogs";
import nestedDialogs from "./NestedDialogs.md";

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
    name: "Simple List Example",
    description: simpleListExample,
    children: <SimpleListExample />,
  },
  {
    name: "Alert Dialogs and Modals",
    description: alertDialogsAndModals,
    children: <AlertDialogsAndModals />,
  },
  {
    name: "Fixed Dialog Example",
    description: fixedDialogExample,
    children: <FixedDialogExample />,
  },
  {
    name: "Nested Dialogs",
    description: nestedDialogs,
    children: <NestedDialogs />,
  },
];

export default () => <DemoPage demos={demos} packageName="dialog" />;
