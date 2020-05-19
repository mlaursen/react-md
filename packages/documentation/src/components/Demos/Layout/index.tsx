import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";
import README from "./README.md";

import ConfigurableLayout from "./ConfigurableLayout";
import configurableLayout from "./ConfigurableLayout.md";

const demos = [
  {
    name: "Configurable Layout",
    description: configurableLayout,
    children: <ConfigurableLayout />,
    fullPage: true,
    fullPageFAB: true,
    fullPageProps: {
      defaultFocus: "button",
      disableAppBar: true,
      disableContent: true,
    },
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="layout" description={README} />
);
