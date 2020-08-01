import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import SimpleIndeterminateExamples from "./SimpleIndeterminateExamples";
import simpleIndeterminateExamples from "./SimpleIndeterminateExamples.md";

import SimpleDeterminateExamples from "./SimpleDeterminateExamples";
import simpleDeterminateExamples from "./SimpleDeterminateExamples.md";

import { WithSuspense, withSuspense } from "./WithSuspense";

import WithinButtons from "./WithinButtons";
import withinButtons from "./WithinButtons.md";

const demos = [
  {
    name: "Simple Indeterminate Examples",
    description: simpleIndeterminateExamples,
    children: <SimpleIndeterminateExamples />,
  },
  {
    name: "Simple Determinate Examples",
    description: simpleDeterminateExamples,
    children: <SimpleDeterminateExamples />,
  },
  {
    name: "With Suspense",
    description: withSuspense,
    children: <WithSuspense />,
  },
  {
    name: "Within Buttons",
    description: withinButtons,
    children: <WithinButtons />,
  },
];

export default function Progress(): ReactElement {
  return <DemoPage demos={demos} packageName="progress" />;
}
