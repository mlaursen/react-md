import type { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

import DemoPage from "components/Demos/DemoPage";
import type { DemoConfig } from "components/Demos/types";

import SimpleSliders from "./SimpleSliders";
import simpleSliders from "./SimpleSliders.md";

import RangeSliders from "./RangeSliders";
import rangeSliders from "./RangeSliders.md";

import ColorDialogSlider from "./ColorDialogSlider";
import colorDialogSlider from "./ColorDialogSlider.md";

import DiscreteSliders from "./DiscreteSliders";
import discreteSliders from "./DiscreteSliders.md";

import ConfigurableSlider from "./ConfigurableSlider";
import configurableSlider from "./ConfigurableSlider.md";

const demos: DemoConfig[] = [
  {
    name: "Simple Sliders",
    description: simpleSliders,
    children: <SimpleSliders />,
  },
  {
    name: "Range Sliders",
    description: rangeSliders,
    children: <RangeSliders />,
  },
  {
    name: "Color Dialog Slider",
    description: colorDialogSlider,
    children: <ColorDialogSlider />,
  },
  {
    name: "Discrete Sliders",
    description: discreteSliders,
    children: <DiscreteSliders />,
  },
  {
    name: "Configurable Slider",
    description: configurableSlider,
    children: <ConfigurableSlider />,
  },
];

export default function Sliders(): ReactElement | null {
  return (
    <IconProvider>
      <DemoPage demos={demos} packageName="form" fonts={["Material Icons"]} />
    </IconProvider>
  );
}
