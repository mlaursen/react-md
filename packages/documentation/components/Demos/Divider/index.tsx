import React from "react";

import DemoPage from "../DemoPage";

import HorizontalDividers from "./HorizontalDividers";
import horizontalDividers from "./HorizontalDividers.md";

import WithinLists from "./WithinLists";
import withinLists from "./WithinLists.md";

import VerticalDividers from "./VerticalDividers";
import verticalDividers from "./VerticalDividers.md";

const demos = [
  {
    name: "Horizontal Dividers",
    description: horizontalDividers,
    children: <HorizontalDividers />,
  },
  {
    name: "Within Lists",
    description: withinLists,
    children: <WithinLists />,
  },
  {
    name: "Vertical Dividers",
    description: verticalDividers,
    children: <VerticalDividers />,
  },
];

export default () => <DemoPage demos={demos} packageName="divider" />;
