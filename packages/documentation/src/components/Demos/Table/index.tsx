import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import README from "./README.md";

import DefaultStyles from "./DefaultStyles";
import defaultStyles from "./DefaultStyles.md";

import {
  DefaultStylesConfigurable,
  defaultStylesConfigurable,
} from "./DefaultStylesConfigurable";

import SelectableRows from "./SelectableRows";
import selectableRows from "./SelectableRows.md";

import SortableColumns from "./SortableColumns";
import sortableColumns from "./SortableColumns.md";

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
    disableCard: true,
  },
  {
    name: "Sortable Columns",
    description: sortableColumns,
    children: <SortableColumns />,
    disableCard: true,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="table" description={README} />
);
