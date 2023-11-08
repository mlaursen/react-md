"use client";
import {
  Fieldset,
  Form,
  Legend,
  Slider,
  box,
  cssUtils,
  useRangeSlider,
  useSlider,
} from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { useId, type ReactElement } from "react";

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
