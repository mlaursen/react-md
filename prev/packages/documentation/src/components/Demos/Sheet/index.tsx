import type { ReactElement } from "react";

import DemoPage from "../DemoPage";

import PositionExamples from "./PositionExamples";
import positionExamples from "./PositionExamples.md";

import SheetSizing from "./SheetSizing";
import sheetSizing from "./SheetSizing.md";

const demos = [
  {
    name: "Position Examples",
    description: positionExamples,
    children: <PositionExamples />,
  },
  {
    name: "Sheet Sizing",
    description: sheetSizing,
    children: <SheetSizing />,
  },
];

export default function Sheet(): ReactElement {
  return <DemoPage demos={demos} packageName="sheet" />;
}
