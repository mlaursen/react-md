import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";
import README from "./README.md";

import ConfigurableLayout from "./ConfigurableLayout";
import configurableLayout from "./ConfigurableLayout.md";

import ControllingTheLayout from "./ControllingTheLayout";
import controllingTheLayout from "./ControllingTheLayout.md";

import NonFixedAppBarLayouts from "./NonFixedAppBarLayouts";
import nonFixedAppBarLayouts from "./NonFixedAppBarLayouts.md";

const modalProps = {
  fullPage: true,
  fullPageFAB: true,
  fullPageProps: {
    defaultFocus: "button",
    disableAppBar: true,
    disableContent: true,
  },
};

const demos = [
  {
    ...modalProps,
    name: "Configurable Layout",
    description: configurableLayout,
    children: <ConfigurableLayout />,
  },
  {
    ...modalProps,
    name: "Controlling the Layout",
    description: controllingTheLayout,
    children: <ControllingTheLayout />,
  },
  {
    ...modalProps,
    name: "Non-Fixed App Bar Layouts",
    description: nonFixedAppBarLayouts,
    children: <NonFixedAppBarLayouts />,
  },
];

export default function Layout(): ReactElement {
  return <DemoPage demos={demos} packageName="layout" description={README} />;
}
