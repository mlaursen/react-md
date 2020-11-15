import React, { forwardRef, Ref } from "react";
import { LabelRequiredForA11y } from "@react-md/utils";

import { DEFAULT_SLIDER_ANIMATION_TIME } from "./constants";
import { SliderThumb } from "./SliderThumb";
import { SliderTrack } from "./SliderTrack";
import { SliderProps } from "./types";
import { SimpleSliderRequiredProps } from "./useSimpleSlider";
import { useSliderControls } from "./useSliderControls";

export interface BaseSimpleSliderProps
  extends SimpleSliderRequiredProps,
    SliderProps {
  /**
   * An optional ref to pass to the `SliderThumb` component.
   */
  thumbRef?: Ref<HTMLSpanElement | null>;
}

export type SimpleSliderProps = LabelRequiredForA11y<BaseSimpleSliderProps>;

/**
 * The `SimpleSlider` component is used to allow the user to select a single
 * value from a range of numbers.
 */
export const SimpleSlider = forwardRef<HTMLSpanElement, SimpleSliderProps>(
  function SimpleSlider(
    {
      id,
      min,
      max,
      step,
      disabled,
      vertical,
      onKeyDown,
      onMouseDown,
      onTouchStart,
      animationDuration = DEFAULT_SLIDER_ANIMATION_TIME,
      value,
      minimum,
      maximum,
      increment,
      decrement,
      setValue,
      thumbRef,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref
  ) {
    const {
      thumb1Ref,
      thumb1Value,
      thumb2Ref: _thumb2Ref,
      thumb2Value: _thumb2Value,
      dragging,
      draggingIndex,
      ...trackProps
    } = useSliderControls({
      ref,
      thumb1Ref: thumbRef,
      min,
      max,
      step,
      value,
      disabled,
      vertical,
      onKeyDown,
      onMouseDown,
      onTouchStart,
      animationDuration,
      minimum,
      maximum,
      increment,
      decrement,
      setValue,
    });

    return (
      <SliderTrack
        id={id}
        {...props}
        {...trackProps}
        animate={!dragging}
        disabled={disabled}
        vertical={vertical}
      >
        <SliderThumb
          aria-label={ariaLabel as string}
          aria-labelledby={ariaLabelledBy}
          ref={thumb1Ref}
          sliderId={id}
          min={min}
          max={max}
          disabled={disabled}
          vertical={vertical}
          animate={!dragging}
          value={thumb1Value}
          index={0}
          active={draggingIndex === 0}
        />
      </SliderTrack>
    );
  }
);
