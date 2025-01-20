"use client";

import { box } from "@react-md/core/box/styles";
import { cssUtils } from "@react-md/core/cssUtils";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Form } from "@react-md/core/form/Form";
import { Legend } from "@react-md/core/form/Legend";
import { Slider } from "@react-md/core/form/Slider";
import { useRangeSlider } from "@react-md/core/form/useRangeSlider";
import { useSlider } from "@react-md/core/form/useSlider";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement, useId } from "react";

const vertical = false;

export default function CustomizingDiscreteSliderTooltip(): ReactElement {
  const legendId1 = useId();
  const legendId2 = useId();

  const slider = useSlider({ min: 0, max: 10, defaultValue: 3 });
  const rangeSlider = useRangeSlider({
    min: 0,
    max: 10,
    defaultValue: [3, 5],
  });

  return (
    <Form
      className={box({
        align: "stretch",
        stacked: true,
        fullWidth: true,
      })}
    >
      <Fieldset fullWidth>
        <Legend id={legendId1}>Slider</Legend>
        <Slider
          aria-labelledby={legendId1}
          discrete
          {...slider}
          vertical={vertical}
          tooltipVisibility="always"
          getTooltipProps={(value) => ({
            className: cssUtils({
              backgroundColor:
                value <= 3 ? "warning" : value >= 8 ? "error" : undefined,
            }),
          })}
          getTooltipChildren={(value) => `${value}°`}
        />
      </Fieldset>
      <Fieldset fullWidth>
        <Legend id={legendId2}>Range Slider</Legend>
        <Slider
          aria-labelledby={legendId2}
          discrete
          {...rangeSlider}
          vertical={vertical}
          tooltipVisibility="always"
          getTooltipChildren={(value, isFirstThumb) => (
            <span
              className={cssUtils({
                className: box({
                  disablePadding: true,
                  reversed: !isFirstThumb,
                  disableWrap: true,
                }),
                fontStyle: isFirstThumb ? "italic" : undefined,
                fontWeight: isFirstThumb ? undefined : "bold",
              })}
            >
              <FavoriteIcon />
              {value}
            </span>
          )}
        />
      </Fieldset>
    </Form>
  );
}
