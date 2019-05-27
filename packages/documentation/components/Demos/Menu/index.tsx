import React from "react";

import DemoPage from "../DemoPage";

import AddingEventHandlers from "./AddingEventHandlers";
import addingEventHandlers from "./AddingEventHandlers.md";

const demos = [
  {
    name: "Adding Event Handlers",
    description: addingEventHandlers,
    children: <AddingEventHandlers />,
  },
];

export default () => (
  <DemoPage demos={demos} packageName="menu" fonts={["Material Icons"]} />
);
