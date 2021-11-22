import { ReactElement } from "react";

import DemoPage from "../DemoPage";

import TypographyExamples from "./TypographyExamples";
import typographyExamples from "./TypographyExamples.md";

import TextContainerExamples from "./TextContainerExamples";
import textContainerExamples from "./TextContainerExamples.md";

const demos = [
  {
    name: "Typography Examples",
    description: typographyExamples,
    phoneFullPage: true,
    children: <TypographyExamples />,
  },
  {
    name: "Text Container Examples",
    description: textContainerExamples,
    fullPage: true,
    children: <TextContainerExamples />,
  },
];

export default function Typography(): ReactElement {
  return <DemoPage demos={demos} packageName="typography" />;
}
