import type { LabelRequiredForA11y, TooltipProps } from "@react-md/core";
import { bem, useUserInteractionMode } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ChangeEventHandler, HTMLAttributes, ReactNode } from "react";
import { forwardRef, useEffect, useState } from "react";
import { SliderValueTooltip } from "./SliderValueTooltip";
import type { SliderValueOptions } from "./useSlider";

const styles = bem("rmd-slider-thumb");

const noop = (): void => {
  // do nothing
};

/**
 * @internal
 * @remarks \@since 6.0.0
 */
interface SliderThumbClassNameOptions {
  className?: string;

  mask?: boolean;
  index: 1 | 2;
  active: boolean;
  animate: boolean;
  vertical: boolean;
  disabled: boolean;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
function sliderThumb(options: SliderThumbClassNameOptions): string {
  const { className, mask, index, active, animate, disabled, vertical } =
    options;

  const isSecondThumb = index === 2;
  return cnb(
    styles({
      h: !vertical,
      h1: !vertical && !isSecondThumb,
      h2: !vertical && isSecondThumb,
      v: vertical,
      v1: vertical && !isSecondThumb,
      v2: vertical && isSecondThumb,
      mask,
      "mask-h": mask && !vertical,
      "mask-v": mask && vertical,
      active,
      animate,
      disabled,
      "disabled-h": disabled && !vertical && !mask,
      "disabled-v": disabled && vertical && !mask,
    }),
    className
  );
}

/**
 * @remarks \@since 2.5.0
 */
export interface SliderThumbPresentation {
  /**
   * Boolean if the slider should act as a discrete slider which will render a
   * tooltip above the thumb while dragging to visualize the current value for
   * the slider.
   *
   * @defaultValue `false`
   */
  discrete?: boolean;

  /**
   * A function that is used to help with accessibility by creating a better
   * value string if just a number isn't representative enough of your range.
   *
   * Example:
   *
   * ```tsx
   * const [value, controls] = useSlider(0, {
   *   // format to be `$100`, etc
   *   getValueText: value => `$${value}`,
   * });
   *
   * return <Slider baseId="price-slider" label="Price" {...controls} />;
   * ```
   *
   * @defaultValue `() => ""`
   */
  getValueText?(value: number): string;
}

/**
 * @internal
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Internal only component.
 */
export interface SliderThumbProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "onChange">,
    Required<SliderValueOptions>,
    Required<SliderThumbPresentation> {
  id: string;
  name?: string;
  value: number;
  index: 1 | 2;
  active: boolean;
  animate: boolean;
  disabled: boolean;
  vertical: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  tooltipProps?: Partial<TooltipProps>;
  getTooltipChildren(value: number, isMinValue: boolean): ReactNode;
}

/**
 * @internal
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Internal only component.
 */
export const SliderThumb = forwardRef<
  HTMLSpanElement,
  LabelRequiredForA11y<SliderThumbProps>
>(function SliderThumb(props, ref) {
  const {
    id,
    min,
    max,
    name,
    value,
    onChange,
    index,
    getValueText,
    step,
    active,
    animate,
    disabled,
    vertical,
    discrete,
    tabIndex = disabled ? -1 : 0,
    className,
    onFocus = noop,
    onKeyDown = noop,
    tooltipProps,
    getTooltipChildren,
    ...remaining
  } = props;
  const { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy } = props;

  const mode = useUserInteractionMode();
  const keyboard = mode === "keyboard";
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    if (disabled || !discrete) {
      setKeyboardVisible(false);
      return;
    }

    // if the mode changes away from keyboard, need to disable the keyboard
    // state
    setKeyboardVisible((prevVisible) => prevVisible && mode === "keyboard");
  }, [disabled, discrete, mode]);
  useEffect(() => {
    if (!keyboardVisible) {
      return;
    }

    const callback = (): void => {
      setKeyboardVisible(false);
    };

    window.addEventListener("blur", callback, true);
    return () => {
      window.removeEventListener("blur", callback);
    };
  }, [keyboardVisible]);

  const classNameOptions = {
    index,
    active,
    animate,
    disabled,
    vertical,
    className,
  } as const;

  return (
    <>
      {disabled && (
        <span
          className={sliderThumb({
            ...classNameOptions,
            mask: true,
          })}
        />
      )}
      <span
        {...remaining}
        id={id}
        ref={ref}
        role="slider"
        aria-disabled={disabled || undefined}
        aria-orientation={vertical ? "vertical" : undefined}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-valuetext={getValueText(value) || undefined}
        tabIndex={tabIndex}
        className={sliderThumb(classNameOptions)}
        onFocus={(event) => {
          onFocus(event);

          if (discrete && keyboard) {
            setKeyboardVisible(true);
          }
        }}
        onKeyDown={(event) => {
          onKeyDown(event);

          // this allows the tooltip to be visible when switching from mouse to
          // keyboard
          if (discrete && event.key !== "Tab") {
            setKeyboardVisible(true);
          }
        }}
      />
      <input
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-hidden
        id={`${id}-value`}
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        tabIndex={-1}
        onChange={onChange}
        className={styles("input")}
      />
      {discrete && (
        <SliderValueTooltip
          position={vertical ? "left" : "above"}
          vertical={vertical}
          animate={!active}
          visible={active || keyboardVisible}
          {...tooltipProps}
          index={index}
        >
          {getTooltipChildren(value, index === 1)}
        </SliderValueTooltip>
      )}
    </>
  );
});
