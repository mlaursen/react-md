import React from "react";

import DemoPage from "../DemoPage";

import SetupExample from "./SetupExample";
import setupExample from "./SetupExample.md";

import DisablingRippleEffect from "./DisablingRippleEffect";
import disablingRippleEffect from "./DisablingRippleEffect.md";

import CustomInteractions from "./CustomInteractions";
import customInteractions from "./CustomInteractions.md";

import CustomComponent from "./CustomComponent";
import customComponent from "./CustomComponent.md";

const demos = [
  {
    name: "Setup Example",
    description: setupExample,
    children: <SetupExample />,
  },
  {
    name: "Disabling Ripple Effect",
    description: disablingRippleEffect,
    children: <DisablingRippleEffect />,
  },
  {
    name: "Custom Interactions",
    description: customInteractions,
    children: <CustomInteractions />,
  },
  {
    name: "Custom Component",
    description: customComponent,
    children: <CustomComponent />,
  },
];

export default () => <DemoPage demos={demos} packageName="states" />;
