import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import SimpleExample from "./SimpleExample";
import simpleExample from "./SimpleExample.md";

import ConfiguringUsePanelsBehavior from "./ConfiguringUsePanelsBehavior";
import configuringUsePanelsBehavior from "./ConfiguringUsePanelsBehavior.md";

import SinglePanel from "./SinglePanel";
import singlePanel from "./SinglePanel.md";

const demos = [
  {
    name: "Simple Example",
    description: simpleExample,
    children: <SimpleExample />,
  },
  {
    name: "Configuring Use Panels Behavior",
    description: configuringUsePanelsBehavior,
    children: <ConfiguringUsePanelsBehavior />,
  },
  {
    name: "Single Panel",
    description: singlePanel,
    children: <SinglePanel />,
  },
];

export default function ExpansionPanel(): ReactElement {
  return <DemoPage demos={demos} packageName="expansion-panel" />;
}
