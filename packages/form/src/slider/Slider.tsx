import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import { PropsWithRef } from "@react-md/utils";

import { labelStyles } from "../label";
import {
  DEFAULT_SLIDER_ANIMATION_TIME,
  DEFAULT_SLIDER_GET_VALUE_TEXT,
} from "./constants";
import { SliderContainer } from "./SliderContainer";
import { SliderThumb } from "./SliderThumb";
import { SliderTrack } from "./SliderTrack";
import { BaseSliderProps } from "./types";
import { SliderRequiredProps } from "./useSlider";
import { useSliderControls } from "./useSliderControls";

/**
 * @since 2.5.0
 */
export interface SliderProps extends SliderRequiredProps, BaseSliderProps {
  /**
   * An optional label to display with the slider. This should normally be a
   * short (1-4 word) description for this slider.
   *
   * @see {@link #thumbLabel}
   * @see {@link #thumbLabelledBy}
   */
  label?: ReactNode;

  /**
   * Optional props to pass to the component wrapping the `label` content.
   */
  labelProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

  /**
   * An optional label to apply to the slider's thumb. This should normally be a
   * short (1-4 word) description for this slider.
   *
   * @see {@link #label}
   * @see {@link #thumbLabelledBy}
   */
  thumbLabel?: string;

  /**
   * An optional id point to a label describing the slider's thumb. This should
   * normally be a short (1-4 word) description for this slider.
   *
   * @see {@link #label}
   * @see {@link #thumbLabel}
   */
  thumbLabelledBy?: string;

  /**
   * Any additional props you'd like to pass to the track element as well as an
   * optional `ref` if you need access to the track element for some reason.
   */
  trackProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

  /**
   * Any additional props you'd like to pass to the thumb element as well as an
   * optional `ref` if you need access to the track element for some reason.
   */
  thumbProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}

/**
 * The `Slider` component allows the user to select a single value from a range
 * of numbers. The functionality for controlling the value of this component is
 * provided by the `useSlider` hook.
 *
 * @since 2.5.0
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    baseId,
    trackProps: propTrackProps,
    label,
    labelProps,
    thumbLabel,
    thumbLabelledBy,
    thumbProps,
    min,
    max,
    step,
    disabled = false,
    vertical = false,
    onMouseDown,
    onTouchStart,
    getValueText = DEFAULT_SLIDER_GET_VALUE_TEXT,
    animationDuration = DEFAULT_SLIDER_ANIMATION_TIME,
    value,
    minimum,
    maximum,
    increment,
    incrementJump,
    decrement,
    decrementJump,
    setValue,
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
    onKeyDown,
    ...trackProps
  } = useSliderControls({
    ref: propTrackProps?.ref,
    thumb1Ref: thumbProps?.ref,
    min,
    max,
    step,
    value,
    disabled,
    vertical,
    onKeyDown: thumbProps?.onKeyDown,
    onMouseDown,
    onTouchStart,
    animationDuration,
    minimum,
    maximum,
    increment,
    incrementJump,
    decrement,
    decrementJump,
    setValue,
  });

  let labelId = "";
  if (label) {
    labelId = labelProps?.id || `${baseId}-label`;
  }

  return (
    <>
      {label && (
        <span
          {...labelProps}
          id={labelId}
          className={cn(labelStyles({ disabled }), labelProps?.className)}
        >
          {label}
        </span>
      )}
      <SliderContainer {...props} vertical={vertical} ref={ref}>
        <SliderTrack
          id={baseId}
          {...propTrackProps}
          {...trackProps}
          animate={!dragging}
          disabled={disabled}
          vertical={vertical}
        >
          <SliderThumb
            {...thumbProps}
            getValueText={getValueText}
            aria-label={thumbLabel}
            aria-labelledby={thumbLabelledBy || labelId}
            ref={thumb1Ref}
            baseId={baseId}
            min={min}
            max={max}
            disabled={disabled}
            vertical={vertical}
            animate={!dragging}
            value={thumb1Value}
            index={0}
            active={draggingIndex === 0}
            onKeyDown={onKeyDown}
          />
        </SliderTrack>
      </SliderContainer>
    </>
  );
});

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Slider.propTypes = {
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      step: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
      increment: PropTypes.func.isRequired,
      decrement: PropTypes.func.isRequired,
      minimum: PropTypes.func.isRequired,
      maximum: PropTypes.func.isRequired,
      setValue: PropTypes.func.isRequired,
      getValueText: PropTypes.func,

      baseId: PropTypes.string.isRequired,
      thumbLabel: PropTypes.string,
      thumbLabelledBy: PropTypes.string,
      trackProps: PropTypes.object,
      thumbProps: PropTypes.object,
      style: PropTypes.object,
      className: PropTypes.string,
      animationDuration: PropTypes.number,
      vertical: PropTypes.bool,
      disabled: PropTypes.bool,
      beforeAddon: PropTypes.node,
      afterAddon: PropTypes.node,

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      _a11yValidator1: (
        props: SliderProps,
        _propName: string,
        component: string
      ) => {
        const { label, thumbLabel, thumbLabelledBy } = props;
        const propsLabel = props.thumbProps?.["aria-label"];
        const propsLabelledBy = props.thumbProps?.["aria-labelledby"];
        if (
          label ||
          thumbLabel ||
          thumbLabelledBy ||
          propsLabel ||
          propsLabelledBy
        ) {
          return null;
        }

        return new Error(
          `Either the \`label\`, \`thumbLabel\`, \`thumbLabelledBy\`, \`thumb1Props["aria-label"]\`, or \`thumb1Props["aria-labelledby"]\` ` +
            `are required for accessibility in the \`${component}\` component, but none were provided.`
        );
      },
    };
  } catch (e) {}
}
