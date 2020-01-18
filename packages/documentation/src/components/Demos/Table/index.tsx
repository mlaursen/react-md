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

import StickyColumnsPart1 from "./StickyColumnsPart1";
import stickyColumnsPart1 from "./StickyColumnsPart1.md";

import StickyColumnsPart2 from "./StickyColumnsPart2";
import stickyColumnsPart2 from "./StickyColumnsPart2.md";

import StickyColumnsPart3 from "./StickyColumnsPart3";
import stickyColumnsPart3 from "./StickyColumnsPart3.md";

const demos = [
  {
    name: "Default Styles",
    description: defaultStyles,
    children: <DefaultStyles />,
  },
  {
    name: "Default Styles Configurable",
    description: defaultStylesConfigurable,
    children: <DefaultStylesConfigurable />,
  },
  {
    name: "Selectable Rows",
    description: selectableRows,
    children: <SelectableRows />,
  },
  {
    name: "Sortable Columns",
    description: sortableColumns,
    children: <SortableColumns />,
  },
  {
    name: "Sticky Columns - Part 1",
    description: stickyColumnsPart1,
    children: <StickyColumnsPart1 />,
  },
  {
    name: "Sticky Columns - Part 2",
    description: stickyColumnsPart2,
    children: <StickyColumnsPart2 />,
  },
  {
    name: "Sticky Columns - Part 3",
    description: stickyColumnsPart3,
    children: <StickyColumnsPart3 />,
  },
].map(demo => ({ disableCard: true, ...demo }));

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="table" description={README} />
);
