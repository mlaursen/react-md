import React from "react";

import DemoPage from "../DemoPage";

import TextExamples from "./TextExamples";
import textExamples from "./TextExamples.md";

import TextContainerExamples from "./TextContainerExamples";
import textContainerExamples from "./TextContainerExamples.md";

const demos = [
  {
    name: "Text Examples",
    description: textExamples,
    phoneFullPage: true,
    children: <TextExamples />,
  },
  {
    name: "Text Container Examples",
    description: textContainerExamples,
    fullPage: true,
    children: <TextContainerExamples />,
  },
];

export default () => <DemoPage demos={demos} packageName="typography" />;
