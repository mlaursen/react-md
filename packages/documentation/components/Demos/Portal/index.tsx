import React, { FunctionComponent } from "react";

import DemoPage from "../DemoPage";

import SimpleExample from "./SimpleExample";
import simpleExample from "./SimpleExample.md";

import CustomPortalContainer from "./CustomPortalContainer";
import customPortalContainter from "./CustomPortalContainer.md";

const demos = [
  {
    name: "Simple Example",
    description: simpleExample,
    children: <SimpleExample />,
  },
  {
    name: "Custom Portal Container",
    description: customPortalContainter,
    children: <CustomPortalContainer />,
  },
];

export default () => <DemoPage demos={demos} packageName="portal" />;
