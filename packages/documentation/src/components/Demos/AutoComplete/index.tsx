import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import README from "./README.md";

import SimpleExample from "./SimpleExample";
import simpleExample from "./SimpleExample.md";

import UsingObjectDataSets from "./UsingObjectDataSets";
import usingObjectDataSets from "./UsingObjectDataSets.md";

import HighlightMatches from "./HighlightMatches";
import highlightMatches from "./HighlightMatches.md";

const demos = [
  {
    name: "Simple Example",
    description: simpleExample,
    children: <SimpleExample />,
  },
  {
    name: "Using Object Data Sets",
    description: usingObjectDataSets,
    children: <UsingObjectDataSets />,
  },
  {
    name: "Highlight Matches",
    description: highlightMatches,
    children: <HighlightMatches />,
  },
];

export default function AutoComplete(): ReactElement {
  return (
    <DemoPage demos={demos} packageName="autocomplete" description={README} />
  );
}
