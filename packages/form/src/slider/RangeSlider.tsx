import React, { forwardRef, Ref } from "react";
import { DEFAULT_SLIDER_ANIMATION_TIME } from "./constants";
import { SliderThumb } from "./SliderThumb";
import { SliderTrack } from "./SliderTrack";
import { SliderProps } from "./types";
import { RangeSliderRequiredProps } from "./useRangeSlider";
import { useSliderControls } from "./useSliderControls";

export interface RangeSliderProps
  extends RangeSliderRequiredProps,
    SliderProps {
  thumb1Ref?: Ref<HTMLSpanElement | null>;
  thumb1Label?: string;
  thumb1LabelledBy?: string;
  thumb2Ref?: Ref<HTMLSpanElement | null>;
  thumb2Label?: string;
  thumb2LabelledBy?: string;
}

export const RangeSlider = forwardRef<HTMLSpanElement, RangeSliderProps>(
  function RangeSlider(
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
      thumb1Ref: propThumb1Ref,
      thumb1Label,
      thumb1LabelledBy,
      thumb2Ref: propThumb2Ref,
      thumb2Label,
      thumb2LabelledBy,
      ...props
    },
    ref
  ) {
    const {
      thumb1Ref,
      thumb1Value,
      thumb2Ref,
      thumb2Value,
      dragging,
      draggingIndex,
      ...trackProps
    } = useSliderControls({
      ref,
      thumb1Ref: propThumb1Ref,
      thumb2Ref: propThumb2Ref,
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

    const thumbProps = {
      sliderId: id,
      min,
      max,
      disabled,
      vertical,
      animate: !dragging,
    };

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
          {...thumbProps}
          aria-label={thumb1Label as string}
          aria-labelledby={thumb1LabelledBy}
          ref={thumb1Ref}
          value={thumb1Value}
          index={0}
          active={draggingIndex === 0}
        />
        <SliderThumb
          {...thumbProps}
          aria-label={thumb2Label as string}
          aria-labelledby={thumb2LabelledBy}
          ref={thumb2Ref}
          value={thumb2Value as number}
          index={1}
          active={draggingIndex === 1}
        />
      </SliderTrack>
    );
  }
);
