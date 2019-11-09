import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import SimpleTwoPageTab from "./SimpleTwoPageTab";
import simpleTwoPageTab from "./SimpleTwoPageTab.md";

// import SimpleThreeTabs from "./SimpleThreeTabs";
// import simpleThreeTabs from "./SimpleThreeTabs.md";

const demos = [
  {
    name: "Simple Two Page Tab",
    description: simpleTwoPageTab,
    children: <SimpleTwoPageTab />,
    emulated: { appBar: null, contentStacked: true },
    fullPageFAB: true,
  },
  // {
  //   name: "Simple Three Tabs",
  //   description: simpleThreeTabs,
  //   phoneFullPage: true,
  //   children: <SimpleThreeTabs />,
  // },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="typography" />
);
