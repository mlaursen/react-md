import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import SimpleExample from "./SimpleExample";
import simpleExample from "./SimpleExample.md";

import WithMedia from "./WithMedia";
import withMedia from "./WithMedia.md";

import WithActions from "./WithActions";
import withActions from "./WithActions.md";

import ExpandableCards from "./ExpandableCards";
import expandableCards from "./ExpandableCards.md";

const demos = [
  {
    name: "Simple Example",
    description: simpleExample,
    children: <SimpleExample />,
  },
  {
    name: "With Media",
    description: withMedia,
    children: <WithMedia />,
  },
  {
    name: "With Actions",
    description: withActions,
    children: <WithActions />,
  },
  {
    name: "Expandable Cards",
    description: expandableCards,
    children: <ExpandableCards />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="card" disableCard phoneFullPage />
);
