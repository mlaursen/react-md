import React, { FunctionComponent } from "react";

import DemoPage from "../DemoPage";

import SimpleAppSizeListenerExample from "./SimpleAppSizeListenerExample";
import simpleAppSizeListenerExample from "./SimpleAppSizeListenerExample.md";

import MediaQueryComponents from "./MediaQueryComponents";
import mediaQueryComponents from "./MediaQueryComponents.md";

import SimpleResizeObserverExample from "./SimpleResizeObserverExample";
import simpleResizeObserverExample from "./SimpleResizeObserverExample.md";

const demos = [
  {
    name: "Simple App Size Listener Example",
    description: simpleAppSizeListenerExample,
    children: <SimpleAppSizeListenerExample />,
  },
  {
    name: "Media Query Components",
    description: mediaQueryComponents,
    children: <MediaQueryComponents />,
  },
  {
    name: "Simple Resize Observer Example",
    description: simpleResizeObserverExample,
    children: <SimpleResizeObserverExample />,
  },
];

export default () => <DemoPage demos={demos} packageName="sizing" />;
