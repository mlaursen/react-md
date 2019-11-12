import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import SimpleExamples from "./SimpleExamples";
import simpleExamples from "./SimpleExamples.md";

import ThirdPartyRoutingLibraries from "./ThirdPartyRoutingLibraries";
import thirdPartyRoutingLibraries from "./ThirdPartyRoutingLibraries.md";

import MaliciousTarget from "./MaliciousTarget";
import maliciousTarget from "./MaliciousTarget.md";

import WithIcons from "./WithIcons";
import withIcons from "./WithIcons.md";

import WithButtonStyles from "./WithButtonStyles";
import withButtonStyles from "./WithButtonStyles.md";

const demos = [
  {
    name: "Simple Examples",
    description: simpleExamples,
    children: <SimpleExamples />,
  },
  {
    name: "Third Party Routing Libraries",
    description: thirdPartyRoutingLibraries,
    children: <ThirdPartyRoutingLibraries />,
  },
  {
    name: "Malicious Target",
    description: maliciousTarget,
    children: <MaliciousTarget />,
  },
  {
    name: "With Icons",
    description: withIcons,
    children: <WithIcons />,
  },
  {
    name: "With Button Styles",
    description: withButtonStyles,
    children: <WithButtonStyles />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="link" />
);
