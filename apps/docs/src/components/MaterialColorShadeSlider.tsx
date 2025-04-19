import { Fieldset } from "@react-md/core/form/Fieldset";
import { Legend } from "@react-md/core/form/Legend";
import { Slider } from "@react-md/core/form/Slider";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, useId } from "react";

import {
  MATERIAL_COLOR_SHADES,
  type MaterialColorShade,
} from "@/constants/theme.js";

import styles from "./MaterialColorShadeSlider.module.scss";

export interface MaterialColorShadeSliderProps {
  name: string;
  shade: MaterialColorShade;
  onShadeChange: (shade: MaterialColorShade) => void;
}

export function MaterialColorShadeSlider({
  name,
  shade,
  onShadeChange,
}: Readonly<MaterialColorShadeSliderProps>): ReactElement {
  const legendId = useId();
  const shadeIndex = MATERIAL_COLOR_SHADES.indexOf(shade);

  return (
    <Fieldset>
      <Slider
        aria-labelledby={legendId}
        min={0}
        max={MATERIAL_COLOR_SHADES.length - 1}
        name={name}
        value={shadeIndex}
        setValue={(valueOrDispatcher) => {
          let nextValue: number;
          if (typeof valueOrDispatcher === "function") {
            nextValue = valueOrDispatcher(shadeIndex);
          } else {
            nextValue = valueOrDispatcher;
          }

          onShadeChange(MATERIAL_COLOR_SHADES[nextValue]);
        }}
        beforeAddon={<Legend id={legendId}>Shade:</Legend>}
        afterAddon={
          <Typography margin="none" textAlign="right" className={styles.shade}>
            {shade}
          </Typography>
        }
        getValueText={(value) => MATERIAL_COLOR_SHADES[value]}
      />
    </Fieldset>
  );
}
