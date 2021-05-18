import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem, LabelRequiredForA11y } from "@react-md/utils";

import {
  DEFAULT_SLIDER_ANIMATION_TIME,
  DEFAULT_SLIDER_GET_VALUE_TEXT,
  DEFAULT_SLIDER_MAX,
  DEFAULT_SLIDER_MIN,
} from "./constants";
import { SliderValue } from "./SliderValue";
import { SliderThumbOptions, ThumbIndex } from "./types";
import { useDiscreteValueVisibility } from "./useDiscreteValueVisibility";

const styles = bem("rmd-slider-thumb");

/**
 * @remarks \@since 2.5.0
 */
export interface BaseThumbProps
  extends HTMLAttributes<HTMLSpanElement>,
    SliderThumbOptions {
  /**
   * The index of the thumb which is used for some additional styling
   * behavior.
   */
  index: ThumbIndex;

  /**
   * The current value for the slider.
   */
  value: number;

  /**
   * An optional name to apply to the hidden input field representing the value
   * of the slider.
   */
  name?: string;

  /**
   * The prefix to use for the id of the thumb. When the `id` prop is omitted,
   * the `id` for this component will be created by `${baseId}-thumb-${index + 1}`.
   *
   * Either the `id` or `baseId` props are required for a11y.
   */
  baseId?: string;

  /**
   * Boolean if the thumb is currently in an active state which will add a
   * "bubble" around the thumb.
   */
  active?: boolean;

  /**
   * Boolean if the thumb should animate between positions when the `value`
   * changes. This should normally be set to `false` while dragging the thumb
   * since it'll make it look like the thumb is lagging behind the mouse cursor
   * or user's finger.
   */
  animate?: boolean;
}

/**
 * @remarks \@since 2.5.0
 */
export type SliderThumbProps = LabelRequiredForA11y<BaseThumbProps>;

/**
 * The slider thumb implements the `role="slider"` for the `Slider` and
 * `RangeSlider` components.
 *
 * @remarks \@since 2.5.0
 */
export const SliderThumb = forwardRef<HTMLSpanElement, SliderThumbProps>(
  function SliderThumb(
    {
      id: propId,
      baseId,
      className,
      min = DEFAULT_SLIDER_MIN,
      max = DEFAULT_SLIDER_MAX,
      animationDuration = DEFAULT_SLIDER_ANIMATION_TIME,
      getValueText = DEFAULT_SLIDER_GET_VALUE_TEXT,
      name,
      value,
      index,
      active = false,
      animate = false,
      discrete = false,
      disabled = false,
      vertical = false,
      tabIndex = disabled ? -1 : 0,
      onBlur: propOnBlur,
      onFocus: propOnFocus,
      ...props
    },
    ref
  ) {
    const id = propId || `${baseId}-thumb-${index + 1}`;
    const isFirst = index === 0;
    const { onBlur, onFocus, animateValue, visible } =
      useDiscreteValueVisibility({
        active,
        animate,
        discrete,
        disabled,
        onBlur: propOnBlur,
        onFocus: propOnFocus,
        animationDuration,
      });

    const styleOptions = {
      h: !vertical,
      h1: !vertical && isFirst,
      h2: !vertical && !isFirst,
      v: vertical,
      v1: vertical && isFirst,
      v2: vertical && !isFirst,
      active,
      animate,
      disabled,
    };

    return (
      <>
        {/* this mask adds the spacing on the track when disabled */}
        {disabled && (
          <span
            className={cn(
              styles({
                ...styleOptions,
                mask: true,
                "mask-h": !vertical,
                "mask-v": vertical,
              }),
              className
            )}
          />
        )}
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
          onBlur={onBlur}
          onFocus={onFocus}
          className={cn(
            styles({
              ...styleOptions,
              "disabled-h": disabled && !vertical,
              "disabled-v": disabled && vertical,
            }),
            className
          )}
        />
        <input id={`${id}-value`} type="hidden" name={name} value={value} />
        <SliderValue
          id={`${id}-value`}
          visible={visible}
          index={index}
          animate={animateValue}
          discrete={discrete}
          vertical={vertical}
        >
          {value}
        </SliderValue>
      </>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    SliderThumb.propTypes = {
      id: PropTypes.string,
      baseId: PropTypes.string,
      className: PropTypes.string,
      min: PropTypes.number,
      max: PropTypes.number,
      active: PropTypes.bool,
      animate: PropTypes.bool,
      animationDuration: PropTypes.number,
      vertical: PropTypes.bool,
      discrete: PropTypes.bool,
      disabled: PropTypes.bool,
      getValueText: PropTypes.func,
      index: PropTypes.oneOf([0, 1]).isRequired,
      value: PropTypes.number.isRequired,
      name: PropTypes.string,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      _a11yValidator: (
        props: SliderThumbProps,
        _propName: string,
        component: string
      ) => {
        const { id, baseId } = props;
        if (id || baseId) {
          return null;
        }

        return new Error(
          `The \`${component}\` component requires either the \`id\` or \`baseId\` props ` +
            `to provided for accessibility, but both were missing.`
        );
      },
    };
  } catch (e) {}
}
