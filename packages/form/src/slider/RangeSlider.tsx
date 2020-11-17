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
import { SliderProps } from "./types";
import { RangeSliderRequiredProps } from "./useRangeSlider";
import { useSliderControls } from "./useSliderControls";

export interface RangeSliderProps
  extends RangeSliderRequiredProps,
    SliderProps {
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
 */
export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  function RangeSlider(
    {
      baseId,
      min,
      max,
      step,
      disabled = false,
      vertical = false,
      inversed = false,
      trackProps: propTrackProps,
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
      thumb1Props,
      thumb1Label,
      thumb1LabelledBy,
      thumb2Props,
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
      onMouseDown,
      onTouchStart,
      animationDuration,
      minimum,
      maximum,
      increment,
      decrement,
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
      sliderId: baseId,
      min,
      max,
      disabled,
      vertical,
      animate: !dragging,
    };

    return (
      <SliderContainer {...props} ref={ref}>
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
            aria-label={thumb1Label as string}
            aria-labelledby={thumb1LabelledBy}
            {...thumb1Props}
            {...thumbProps}
            getValueText={getValueText}
            ref={thumb1Ref}
            value={thumb1Value}
            index={0}
            active={draggingIndex === 0}
            onKeyDown={thumb1KeyDown}
          />
          <SliderThumb
            aria-label={thumb2Label as string}
            aria-labelledby={thumb2LabelledBy}
            {...thumb2Props}
            {...thumbProps}
            getValueText={getValueText}
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
      style: PropTypes.object,
      className: PropTypes.string,
      baseId: PropTypes.string.isRequired,
      animationDuration: PropTypes.number,
      inversed: PropTypes.bool,
      vertical: PropTypes.bool,
      disabled: PropTypes.bool,
      beforeAddon: PropTypes.node,
      afterAddon: PropTypes.node,
      trackProps: PropTypes.object,
      thumb1Props: PropTypes.object,
      thumb2Props: PropTypes.object,

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      _a11yValidator1: (
        props: RangeSliderProps,
        _propName: keyof RangeSliderProps,
        component: string
      ) => {
        const label = props.thumb1Label;
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
      _a11yValidator2: (
        props: RangeSliderProps,
        _propName: keyof RangeSliderProps,
        component: string
      ) => {
        const label = props.thumb2Label;
        const labelledBy = props.thumb2LabelledBy;
        const propsLabel = props.thumb2Props?.["aria-label"];
        const propsLabelledBy = props.thumb2Props?.["aria-labelledby"];
        if (label || labelledBy || propsLabel || propsLabelledBy) {
          return null;
        }

        return new Error(
          `Either the \`thumb2Label\`, \`thumb2LabelledBy\`, \`thumb2Props["aria-label"]\`, or \`thumb2Props["aria-labelledby"]\` ` +
            `are required for accessibility in the \`${component}\` component, but none were provided.`
        );
      },
      _valueValidator: (
        props: RangeSliderProps,
        _propName: keyof RangeSliderProps,
        component: string
      ) => {
        const { value } = props;
        if (
          !Array.isArray(value) ||
          value.length !== 2 ||
          typeof value[0] !== "number" ||
          typeof value[1] !== "number"
        ) {
          return new Error(
            `The \`value\` prop is required to be an array of two numbers for the \`${component}\` component.`
          );
        }

        return null;
      },
    };
  } catch (e) {}
}
