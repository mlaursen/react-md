import { Box } from "@react-md/core/box/Box";
import { type ReactElement } from "react";

import {
  MATERIAL_COLORS_WITH_SHADES,
  type MaterialColorShade,
  type MaterialColorWithShade,
} from "@/constants/theme.js";
import { getMaterialColorValue } from "@/utils/theme.js";

import { MaterialColorRadio } from "./MaterialColorRadio.jsx";
import styles from "./MaterialColorRadioGroup.module.scss";

export interface MaterialColorRadioGroupProps {
  name: string;
  shade: MaterialColorShade;
  color: string;
  onColorChange: (options: {
    color: string;
    materialColor: MaterialColorWithShade;
  }) => void;
}

export function MaterialColorRadioGroup({
  name,
  shade,
  color,
  onColorChange,
}: Readonly<MaterialColorRadioGroupProps>): ReactElement {
  return (
    <Box fullWidth disablePadding className={styles.container}>
      {MATERIAL_COLORS_WITH_SHADES.map((materialColor) => {
        const value = getMaterialColorValue(materialColor, shade);
        const checked = color === value;
        return (
          <MaterialColorRadio
            key={materialColor}
            name={name}
            value={value}
            label={materialColor}
            checked={checked}
            onChange={(event) => {
              onColorChange({
                color: event.currentTarget.value,
                materialColor,
              });
            }}
          />
        );
      })}
    </Box>
  );
}
