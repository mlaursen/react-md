import type { ReactElement } from "react";
import { IconProvider } from "@react-md/icon";

import DemoPage from "components/Demos/DemoPage";
import type { DemoConfig } from "components/Demos/types";

import SimpleNativeSelect from "./SimpleNativeSelect";
import simpleNativeSelect from "./SimpleNativeSelect.md";

import NativeSelectExample from "./NativeSelectExample";
import nativeSelectExample from "./NativeSelectExample.md";

import SimpleSelectExample from "./SimpleSelectExample";
import simpleSelectExample from "./SimpleSelectExample.md";

import SelectExample from "./SelectExample";
import selectExample from "./SelectExample.md";

import {
  CustomizingSelectOptions,
  customizingSelectOptions,
} from "./CustomizingSelectOptions";

const demos: DemoConfig[] = [
  {
    name: "Simple Native Select",
    description: simpleNativeSelect,
    children: <SimpleNativeSelect />,
  },
  {
    name: "Native Select Example",
    description: nativeSelectExample,
    children: <NativeSelectExample />,
  },
  {
    name: "Simple Select Example",
    description: simpleSelectExample,
    children: <SimpleSelectExample />,
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
