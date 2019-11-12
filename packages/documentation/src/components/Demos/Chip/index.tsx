import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import SimpleChips from "./SimpleChips";
import simpleChips from "./SimpleChips.md";

import ExpandableChips from "./ExpandableChips";
import expandableChips from "./ExpandableChips.md";

const demos = [
  {
    name: "Simple Chips",
    description: simpleChips,
    children: <SimpleChips />,
  },
  {
    name: "Expandable Chips",
    description: expandableChips,
    children: <ExpandableChips />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="chip" fonts={["Material Icons"]} />
);
