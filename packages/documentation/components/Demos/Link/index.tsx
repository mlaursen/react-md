import React from "react";

import DemoPage from "../DemoPage";

import SimpleExamples from "./SimpleExamples";
import simpleExamples from "./SimpleExamples.md";

import ThirdPartyRoutingLibraries from "./ThirdPartyRoutingLibraries";
import thirdPartyRoutingLibraries from "./ThirdPartyRoutingLibraries.md";

import MaliciousTarget from "./MaliciousTarget";
import maliciousTarget from "./MaliciousTarget.md";

import WithIcons from "./WithIcons";
import withIcons from "./WithIcons.md";

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
];

export default () => <DemoPage demos={demos} packageName="link" />;
