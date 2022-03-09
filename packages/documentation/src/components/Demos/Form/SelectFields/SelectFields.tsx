import type { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

import DemoPage from "components/Demos/DemoPage";
import type { DemoConfig } from "components/Demos/types";

import NativeSelectExample from "./NativeSelectExample";
import nativeSelectExample from "./NativeSelectExample.md";

import SelectExample from "./SelectExample";
import selectExample from "./SelectExample.md";

import {
  CustomizingSelectOptions,
  customizingSelectOptions,
} from "./CustomizingSelectOptions";

const demos: DemoConfig[] = [
  {
    name: "Native Select Example",
    description: nativeSelectExample,
    children: <NativeSelectExample />,
  },
  {
    name: "Select Example",
    description: selectExample,
    children: <SelectExample />,
  },
  {
    name: "Customizing Select Options",
    description: customizingSelectOptions,
    children: <CustomizingSelectOptions />,
  },
];

export default function Selects(): ReactElement | null {
  return (
    <IconProvider>
      <DemoPage demos={demos} packageName="form" fonts={["Material Icons"]} />
    </IconProvider>
  );
}
