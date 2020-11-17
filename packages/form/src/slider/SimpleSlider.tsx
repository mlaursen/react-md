import React, { forwardRef, HTMLAttributes } from "react";
import { LabelRequiredForA11y, PropsWithRef } from "@react-md/utils";

import {
  DEFAULT_SLIDER_ANIMATION_TIME,
  DEFAULT_SLIDER_GET_VALUE_TEXT,
} from "./constants";
import { SliderThumb } from "./SliderThumb";
import { SliderTrack } from "./SliderTrack";
import { SliderProps } from "./types";
import { SimpleSliderRequiredProps } from "./useSimpleSlider";
import { useSliderControls } from "./useSliderControls";
import { SliderContainer } from "./SliderContainer";

export interface BaseSimpleSliderProps
  extends SimpleSliderRequiredProps,
    SliderProps {
  /**
   * An optional label to apply to the slider's thumb. Either this or the
   * `aria-labelledby` prop are required for a11y.
   */
  "aria-label"?: string;

  /**
   * An optional id point to a label describing the slider's thumb. Either this
   * or the `aria-label` prop are required for a11y.
   */
  "aria-labelledby"?: string;

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

export type SimpleSliderProps = LabelRequiredForA11y<BaseSimpleSliderProps>;

/**
 * The `SimpleSlider` component allows the user to select a single value from a
 * range of numbers. The functionality for controlling the value of this
 * component is provided by the `useSimpleSlider` hook.
 */
export const SimpleSlider = forwardRef<HTMLDivElement, SimpleSliderProps>(
  function SimpleSlider(
    {
      baseId,
      trackProps: propTrackProps,
      thumbProps,
      min,
      max,
      step,
      disabled = false,
      vertical = false,
      inversed = false,
      onMouseDown,
      onTouchStart,
      getValueText = DEFAULT_SLIDER_GET_VALUE_TEXT,
      animationDuration = DEFAULT_SLIDER_ANIMATION_TIME,
      value,
      minimum,
      maximum,
      increment,
      decrement,
      setValue,
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
      decrement,
      setValue,
    });

    return (
      <SliderContainer {...props} vertical={vertical} ref={ref}>
        <SliderTrack
          id={baseId}
          {...propTrackProps}
          {...trackProps}
          animate={!dragging}
          disabled={disabled}
          vertical={vertical}
          inversed={inversed}
        >
          <SliderThumb
            {...thumbProps}
            getValueText={getValueText}
            aria-label={ariaLabel as string}
            aria-labelledby={ariaLabelledBy}
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
    );
  }
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    SimpleSlider.propTypes = {
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
      "aria-label": PropTypes.string,
      "aria-labelledby": PropTypes.string,
      trackProps: PropTypes.object,
      thumbProps: PropTypes.object,
      style: PropTypes.object,
      className: PropTypes.string,
      animationDuration: PropTypes.number,
      inversed: PropTypes.bool,
      vertical: PropTypes.bool,
      disabled: PropTypes.bool,
      beforeAddon: PropTypes.node,
      afterAddon: PropTypes.node,

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      _a11yValidator1: (props, propName: string, component: string) => {
        const label = props[propName];
        const labelledBy = props.thumb1LabelledBy;
        const propsLabel = props.thumb1Props?.["aria-label"];
        const propsLabelledBy = props.thumb1Props?.["aria-labelledby"];
        if (label || labelledBy || propsLabel || propsLabelledBy) {
          return null;
        }

        return new Error(
          `Either the \`thumb1Label\`, \`thumb1LabelledBy\`, \`thumb1Props["aria-label"]\`, or \`thumb1Props["aria-labelledby"]\` ` +
            `are required for accessibility in the \`${component}\` component, but none were provided.`
        );
      },
    };
  } catch (e) {}
}
