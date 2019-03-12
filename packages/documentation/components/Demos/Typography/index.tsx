import React, { FunctionComponent } from "react";

import DemoPage from "../DemoPage";

import TextExamples from "./TextExamples";
import textDescription from "./TextExamples.md";
import TextContainerExamples from "./TextContainerExamples";

const demos = [
  {
    name: "Text Examples",
    description: `\`react-md\` provides 13 different typography styles by
default.`,
    children: <TextExamples />,
  },
  {
    name: "Text Container Examples",
    description: "",
    fullPage: true,
    children: <TextContainerExamples />,
  },
];

export default () => <DemoPage demos={demos} packageName="typography" />;
