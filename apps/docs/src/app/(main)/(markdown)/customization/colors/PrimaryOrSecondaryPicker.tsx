import { Box } from "@react-md/core/box/Box";
import { type ReactElement, useState } from "react";

import { ColorPickerTextField } from "@/components/ColorPickerTextField.jsx";
import { MaterialColorRadioGroup } from "@/components/MaterialColorRadioGroup/MaterialColorRadioGroup.jsx";
import { MaterialColorShadeSlider } from "@/components/MaterialColorShadeSlider.jsx";
import {
  MATERIAL_COLOR_SHADES,
  type MaterialColorShade,
  type MaterialColorWithShade,
} from "@/constants/theme.js";
import { upperFirst } from "@/utils/strings.js";
import { getMaterialColorName, getMaterialColorValue } from "@/utils/theme.js";

import { type SimpleThemeColor } from "./usePlaygroundColors.js";

export interface PrimaryOrSecondaryPickerProps {
  name: SimpleThemeColor;
  value: string;
  onValueChange: (name: SimpleThemeColor, value: string) => void;
}

export function PrimaryOrSecondaryPicker({
  name,
  value,
  onValueChange,
}: Readonly<PrimaryOrSecondaryPickerProps>): ReactElement {
  const [shade, setShade] = useState<MaterialColorShade>(() => {
    const shade = getMaterialColorName(value)?.replace(
      /.*?(Accent)?(\d+)/,
      (_, accent, number) => `${accent ? "A" : ""}${number}`
    ) as MaterialColorShade;
    if (shade && MATERIAL_COLOR_SHADES.includes(shade)) {
      return shade;
    }

    return name === "primaryColor" ? "500" : "A200";
  });
  const [materialColor, setMaterialColor] = useState<MaterialColorWithShade>(
    () => {
      const fullColor =
        getMaterialColorName(value) ??
        (name === "primaryColor" ? "teal500" : "pinkAccent200");

      return fullColor.replace(/(Accent)?\d+$/, "") as MaterialColorWithShade;
    }
  );

  return (
    <Box align="stretch" stacked disablePadding>
      <ColorPickerTextField
        name={name}
        label={upperFirst(name.replace("Color", ""))}
        color={value}
        onColorChange={(color) => {
          onValueChange(name, color);
        }}
      />
      <MaterialColorShadeSlider
        name={`${name}Shade`}
        shade={shade}
        onShadeChange={(shade) => {
          setShade(shade);
          onValueChange(name, getMaterialColorValue(materialColor, shade));
        }}
      />
      <MaterialColorRadioGroup
        name={`${name}Colors`}
        color={value}
        shade={shade}
        onColorChange={({ color, materialColor }) => {
          onValueChange(name, color);
          setMaterialColor(materialColor);
        }}
      />
    </Box>
  );
}
