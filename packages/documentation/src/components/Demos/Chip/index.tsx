import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import SimpleChips from "./SimpleChips";
import simpleChips from "./SimpleChips.md";

import FilterChips from "./FilterChips";
import filterChips from "./FilterChips.md";

import InputChips from "./InputChips";
import inputChips from "./InputChips.md";

const demos = [
  {
    name: "Simple Chips",
    description: simpleChips,
    children: <SimpleChips />,
  },
  {
    name: "Filter Chips",
    description: filterChips,
    children: <FilterChips />,
  },
  {
    name: "Input Chips",
    description: inputChips,
    children: <InputChips />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="chip" fonts={["Material Icons"]} />
);
