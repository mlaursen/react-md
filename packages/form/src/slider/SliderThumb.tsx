import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem, LabelRequiredForA11y } from "@react-md/utils";

import {
  DEFAULT_SLIDER_GET_VALUE_TEXT,
  DEFAULT_SLIDER_MAX,
  DEFAULT_SLIDER_MIN,
} from "./constants";
import { SliderThumbOptions } from "./types";

const styles = bem("rmd-slider-thumb");

export interface BaseThumbProps
  extends HTMLAttributes<HTMLSpanElement>,
    SliderThumbOptions {
  index: number;
  value: number;
  name?: string;
  sliderId?: string;
  active?: boolean;
  animate?: boolean;
}

export type ThumbProps = LabelRequiredForA11y<BaseThumbProps>;

export const SliderThumb = forwardRef<HTMLSpanElement, ThumbProps>(
  function SliderThumb(
    {
      id: propId,
      sliderId,
      className,
      min = DEFAULT_SLIDER_MIN,
      max = DEFAULT_SLIDER_MAX,
      getValueText = DEFAULT_SLIDER_GET_VALUE_TEXT,
      name,
      value,
      index,
      dense = false,
      active = false,
      animate = false,
      disabled = false,
      vertical = false,
      tabIndex = disabled ? -1 : 0,
      ...props
    },
    ref
  ) {
    const id = propId || `${sliderId}-thumb-${index + 1}`;
    const isFirst = index === 0;

    return (
      <>
        <span
          {...props}
          id={id}
          ref={ref}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={getValueText(value) || undefined}
          aria-disabled={disabled || undefined}
          aria-orientation={(vertical && "vertical") || undefined}
          tabIndex={tabIndex}
          className={cn(
            styles({
              dense,
              h: !vertical,
              h1: !vertical && isFirst,
              h2: !vertical && !isFirst,
              active,
              animate,
              disabled,
            }),
            className
          )}
        />
        <input id={`${id}-value`} type="hidden" name={name} value={value} />
      </>
    );
  }
);
