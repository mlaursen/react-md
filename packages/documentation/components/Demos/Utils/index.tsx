import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import AppSizeListenerExample from "./AppSizeListenerExample";
import appSizeListenerExample from "./AppSizeListenerExample.md";

import MediaQueryComponents from "./MediaQueryComponents";
import mediaQueryComponents from "./MediaQueryComponents.md";

import ResizeListenerExample from "./ResizeListenerExample";
import resizeListenerExample from "./ResizeListenerExample.md";

import ResizeObserverExample from "./ResizeObserverExample";
import resizeObserverExample from "./ResizeObserverExample.md";

import MaterialGridExample from "./MaterialGridExample";
import materialGridExample from "./MaterialGridExample.md";

import SimpleGridList from "./SimpleGridList";
import simpleGridList from "./SimpleGridList.md";

const demos = [
  {
    name: "App Size Listener Example",
    description: appSizeListenerExample,
    children: <AppSizeListenerExample />,
  },
  {
    name: "Media Query Components",
    description: mediaQueryComponents,
    children: <MediaQueryComponents />,
  },
  {
    name: "Resize Listener Example",
    description: resizeListenerExample,
    children: <ResizeListenerExample />,
  },
  {
    name: "Resize Observer Example",
    description: resizeObserverExample,
    children: <ResizeObserverExample />,
  },
  {
    name: "Material Grid Example",
    description: materialGridExample,
    children: <MaterialGridExample />,
  },
  {
    name: "Simple Grid List",
    description: simpleGridList,
    children: <SimpleGridList />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="utils" />
);
