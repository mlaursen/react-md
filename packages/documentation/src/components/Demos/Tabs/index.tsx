import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import README from "./README.md";

import BasicUsage from "./BasicUsage";
import basicUsage from "./BasicUsage.md";

import SimpleTwoPageTab from "./SimpleTwoPageTab";
import simpleTwoPageTab from "./SimpleTwoPageTab.md";

import { ConfigurableTabs, configurableTabs } from "./ConfigurableTabs";
import { PersistentTabs, persistentTabs } from "./PersistentTabs";
import { swipeableTabs, SwipeableTabs } from "./SwipeableTabs";

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
    name: "Persistent Tabs",
    description: persistentTabs,
    children: <PersistentTabs />,
    emulated: { appBar: null, contentStacked: true },
    fullPageFAB: true,
  },
  {
    name: "Configurable Tabs",
    description: configurableTabs,
    children: <ConfigurableTabs />,
    phoneFullPage: true,
  },
  {
    name: "Swipeable Tabs",
    description: swipeableTabs,
    children: <SwipeableTabs />,
    emulated: { appBar: null, contentStacked: true },
    fullPageFAB: true,
  },
];

export default function Tabs(): ReactElement {
  return <DemoPage demos={demos} description={README} packageName="tabs" />;
}
