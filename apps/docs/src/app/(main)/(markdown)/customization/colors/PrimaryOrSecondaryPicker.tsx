import { Box } from "@react-md/core/box/Box";
import { type ReactElement, useState } from "react";

import { ColorPickerTextField } from "@/components/ColorPickerTextField.jsx";
import { MaterialColorRadioGroup } from "@/components/MaterialColorRadioGroup/MaterialColorRadioGroup.jsx";
import { MaterialColorShadeSlider } from "@/components/MaterialColorShadeSlider.jsx";
import {
  type MaterialColorShade,
  type MaterialColorWithShade,
} from "@/constants/theme.js";
import { kebabCase, upperFirst } from "@/utils/strings.js";
import { getMaterialColorValue } from "@/utils/theme.js";

export interface PrimaryOrSecondaryPickerProps {
  name: "primaryColor" | "secondaryColor";
  value: string;
  onValueChange: (value: string) => void;
  onMaterialColorChange: (value: string) => void;
}

const toSassVar = (
  materialColor: MaterialColorWithShade,
  shade: MaterialColorShade
): string => `colors.$${kebabCase(materialColor)}-${shade.replace("A", "a-")}`;

export function PrimaryOrSecondaryPicker({
  name,
  value,
  onValueChange,
  onMaterialColorChange,
}: Readonly<PrimaryOrSecondaryPickerProps>): ReactElement {
  const [shade, setShade] = useState<MaterialColorShade>(
    name == "primaryColor" ? "500" : "A200"
  );
  const [materialColor, setMaterialColor] = useState<MaterialColorWithShade>(
    name === "primaryColor" ? "teal" : "pink"
  );

  return (
    <Box align="stretch" stacked disablePadding>
      <ColorPickerTextField
        name={name}
        label={upperFirst(name.replace("Color", ""))}
        color={value}
        onColorChange={(color) => {
          onValueChange(color);
          onMaterialColorChange(color);
        }}
      />
      <MaterialColorShadeSlider
        name={`${name}Shade`}
        shade={shade}
        onShadeChange={(shade) => {
          setShade(shade);
          onValueChange(getMaterialColorValue(materialColor, shade));
          onMaterialColorChange(toSassVar(materialColor, shade));
        }}
      />
      <MaterialColorRadioGroup
        name={`${name}Colors`}
        color={value}
        shade={shade}
        onColorChange={({ color, materialColor }) => {
          onValueChange(color);
          setMaterialColor(materialColor);
          onMaterialColorChange(toSassVar(materialColor, shade));
        }}
      />
    </Box>
  );
}
