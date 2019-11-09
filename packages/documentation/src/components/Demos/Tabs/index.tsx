import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import README from "./README.md";

import BasicUsage from "./BasicUsage";
import basicUsage from "./BasicUsage.md";

import SimpleTwoPageTab from "./SimpleTwoPageTab";
import simpleTwoPageTab from "./SimpleTwoPageTab.md";

import { ConfigurableTabs, configurableTabs } from "./ConfigurableTabs";

const demos = [
  {
    name: "Basic Usage",
    description: basicUsage,
    children: <BasicUsage />,
    phoneFullPage: true,
  },
  {
    name: "Simple Two Page Tab",
    description: simpleTwoPageTab,
    children: <SimpleTwoPageTab />,
    emulated: { appBar: null, contentStacked: true },
    fullPageFAB: true,
  },
  {
    name: "Configurable Tabs",
    description: configurableTabs,
    children: <ConfigurableTabs />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} description={README} packageName="tabs" />
);
