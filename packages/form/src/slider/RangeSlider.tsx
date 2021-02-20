import React, {
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  useCallback,
} from "react";
import { PropsWithRef } from "@react-md/utils";

import {
  DEFAULT_SLIDER_ANIMATION_TIME,
  DEFAULT_SLIDER_GET_VALUE_TEXT,
} from "./constants";
import { SliderContainer } from "./SliderContainer";
import { SliderThumb } from "./SliderThumb";
import { SliderTrack } from "./SliderTrack";
import { BaseSliderProps } from "./types";
import { RangeSliderRequiredProps } from "./useRangeSlider";
import { useSliderControls } from "./useSliderControls";

/**
 * @remarks \@since 2.5.0
 */
export interface RangeSliderProps
  extends RangeSliderRequiredProps,
    BaseSliderProps {
  /**
   * Any additional props you'd like to pass to the track element as well as an
   * optional `ref` if you need access to the track element for some reason.
   */
  trackProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

  /**
   * Any additional props you'd like to pass to the first thumb element as well
   * as an optional `ref` if you need access to the track element for some
   * reason.
   */
  thumb1Props?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

  /**
   * A convenience prop for adding an `aria-label` to the first thumb element. An
   * accessible label **must** be provided by this prop, the `thumb1LabelledBy`
   * prop, or adding an `aria-label`/`aria-labelledby` to the `thumb1Props` for
   * a11y.
   */
  thumb1Label?: string;

  /**
   * A convenience prop for adding an `aria-labelledby` to the first thumb
   * element. An accessible label **must** be provided by this prop, the
   * `thumb1Label` prop, or adding an `aria-label`/`aria-labelledby` to the
   * `thumb1Props` for a11y.
   */
  thumb1LabelledBy?: string;

  /**
   * Any additional props you'd like to pass to the second thumb element as well
   * as an optional `ref` if you need access to the track element for some
   * reason.
   */
  thumb2Props?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

  /**
   * A convenience prop for adding an `aria-label` to the second thumb element.
   * An accessible label **must** be provided by this prop, the
   * `thumb2LabelledBy` prop, or adding an `aria-label`/`aria-labelledby` to the
   * `thumb2Props` for a11y.
   */
  thumb2Label?: string;

  /**
   * A convenience prop for adding an `aria-labelledby` to the second thumb
   * element. An accessible label **must** be provided by this prop, the
   * `thumb2Label` prop, or adding an `aria-label`/`aria-labelledby` to the
   * `thumb2Props` for a11y.
   */
  thumb2LabelledBy?: string;
}

/**
 * The `RangeSlider` component allows the user to select a min and max value from
 * a predefined range of numbers. The functionality for controlling the value of
 * this component is provided by the `useRangeSlider` hook.
 *
 * @remarks \@since 2.5.0
 */
export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  function RangeSlider(
    {
      baseId,
      min,
      max,
      step,
      discrete = false,
      disabled = false,
      vertical = false,
      label,
      labelProps,
      trackProps: propTrackProps,
      onBlur,
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
      persist,
      setValue,
      thumb1Props,
      thumb1Label = "Min",
      thumb1LabelledBy,
      thumb2Props,
      thumb2Label = "Max",
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
      onKeyDown,
      ...trackProps
    } = useSliderControls({
      ref: propTrackProps?.ref,
      thumb1Ref: thumb1Props?.ref,
      thumb2Ref: thumb2Props?.ref,
      min,
      max,
      step,
      value,
      disabled,
      vertical,
      onBlur,
      onMouseDown,
      onTouchStart,
      animationDuration,
      minimum,
      maximum,
      increment,
      incrementJump,
      decrement,
      decrementJump,
      persist,
      setValue,
    });

    const thumb1KeyDown = useCallback(
      (event: KeyboardEvent<HTMLSpanElement>) => {
        if (thumb1Props?.onKeyDown) {
          thumb1Props.onKeyDown(event);
        }

        onKeyDown(event);
      },
      [thumb1Props, onKeyDown]
    );
    const thumb2KeyDown = useCallback(
      (event: KeyboardEvent<HTMLSpanElement>) => {
        if (thumb2Props?.onKeyDown) {
          thumb2Props.onKeyDown(event);
        }

        onKeyDown(event);
      },
      [thumb2Props, onKeyDown]
    );

    const thumbProps = {
      baseId,
      min,
      max,
      discrete,
      disabled,
      vertical,
      animate: !dragging,
      animationDuration,
      getValueText,
    };

    let labelId = "";
    if (label) {
      labelId = labelProps?.id || `${baseId}-label`;
    }

    return (
      <SliderContainer
        {...props}
        ref={ref}
        label={label}
        labelId={labelId}
        labelProps={labelProps}
        disabled={disabled}
        vertical={vertical}
      >
        <SliderTrack
          id={baseId}
          {...propTrackProps}
          {...trackProps}
          animate={!dragging}
          disabled={disabled}
          vertical={vertical}
        >
          <SliderThumb
            aria-label={thumb1Label}
            aria-labelledby={thumb1LabelledBy}
            {...thumb1Props}
            {...thumbProps}
            ref={thumb1Ref}
            value={thumb1Value}
            index={0}
            active={draggingIndex === 0}
            onKeyDown={thumb1KeyDown}
          />
          <SliderThumb
            aria-label={thumb2Label}
            aria-labelledby={thumb2LabelledBy}
            {...thumb2Props}
            {...thumbProps}
            ref={thumb2Ref}
            value={thumb2Value as number}
            index={1}
            active={draggingIndex === 1}
            onKeyDown={thumb2KeyDown}
          />
        </SliderTrack>
      </SliderContainer>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    RangeSlider.propTypes = {
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      step: PropTypes.number.isRequired,
      value: PropTypes.arrayOf(PropTypes.number).isRequired,
      increment: PropTypes.func.isRequired,
      decrement: PropTypes.func.isRequired,
      minimum: PropTypes.func.isRequired,
      maximum: PropTypes.func.isRequired,
      setValue: PropTypes.func.isRequired,
      getValueText: PropTypes.func,

      baseId: PropTypes.string.isRequired,
      label: PropTypes.node,
      labelProps: PropTypes.object,
      thumb1Label: PropTypes.string,
      thumb1LabelledBy: PropTypes.string,
      thumb2Label: PropTypes.string,
      thumb2LabelledBy: PropTypes.string,
      trackProps: PropTypes.object,
      thumb1Props: PropTypes.object,
      thumb2Props: PropTypes.object,
      style: PropTypes.object,
      className: PropTypes.string,
      animationDuration: PropTypes.number,
      vertical: PropTypes.bool,
      disabled: PropTypes.bool,
      discrete: PropTypes.bool,
      beforeAddon: PropTypes.node,
      afterAddon: PropTypes.node,
    };
  } catch (e) {}
}
