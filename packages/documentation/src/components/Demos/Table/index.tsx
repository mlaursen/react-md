import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import README from "./README.md";

import DefaultStyles from "./DefaultStyles";
import defaultStyles from "./DefaultStyles.md";

import DefaultStylesConfigurable from "./DefaultStylesConfigurable";
import defaultStylesConfigurable from "./DefaultStylesConfigurable.md";

import SelectableRows from "./SelectableRows";
import selectableRows from "./SelectableRows.md";

const demos = [
  {
    name: "Default Styles",
    description: defaultStyles,
    children: <DefaultStyles />,
    disableCard: true,
  },
  {
    name: "Default Styles Configurable",
    description: defaultStylesConfigurable,
    children: <DefaultStylesConfigurable />,
    disableCard: true,
  },
  {
    name: "Selectable Rows",
    description: selectableRows,
    children: <SelectableRows />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="table" description={README} />
);
