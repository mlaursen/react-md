"use client";
import { cnb } from "cnbuilder";
import {
  forwardRef,
  useEffect,
  useState,
  type ChangeEventHandler,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { useUserInteractionMode } from "../interaction/UserInteractionModeProvider.js";
import { type TooltipProps } from "../tooltip/Tooltip.js";
import { type LabelRequiredForA11y } from "../types.js";
import { bem } from "../utils/bem.js";
import { SliderValueTooltip } from "./SliderValueTooltip.js";
import { type SliderValueOptions } from "./useSlider.js";

const styles = bem("rmd-slider-thumb");

const noop = (): void => {
  // do nothing
};

/**
 * @internal
 * @since 6.0.0
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
 * @since 6.0.0
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
 * @since 6.0.0
 */
export type SliderTooltipVisibility = "auto" | "hover" | "always";

/**
 * @since 2.5.0
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

  /**
   * Set this to `true` if the slider's thumb position should only update when
   * the user has dragged to the next value instead of with the mouse.
   *
   * @see {@link marks}
   * @defaultValue `!!marks`
   */
  disableSmoothDragging?: boolean;

  /**
   * The discrete slider's value tooltip will only become visible when:
   *
   * - `"auto"` - the user is dragging with touch/mouse or focused with a keyboard
   * - `"hover"` - the behavior of `"auto"` plus while hovering the thumb with a mouse
   * - `"always"` - ... always
   *
   * This only applies when the {@link discrete} prop is `true`.
   *
   * @defaultValue `"auto"`
   */
  tooltipVisibility?: SliderTooltipVisibility;
}

/**
 * @internal
 * @since 2.5.0
 * @since 6.0.0 Internal only component.
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
  getTooltipProps(
    value: number,
    isFirstThumb: boolean
  ): Partial<TooltipProps> | void;
  getTooltipChildren(value: number, isFirstThumb: boolean): ReactNode;
}

/**
 * **Client Component**
 *
 * @internal
 * @since 2.5.0
 * @since 6.0.0 Internal only component.
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
    onMouseEnter = noop,
    onMouseLeave = noop,
    tooltipProps,
    getTooltipProps,
    getTooltipChildren,
    disableSmoothDragging,
    tooltipVisibility = "auto",
    ...remaining
  } = props;
  const { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy } = props;

  const isFirstThumb = index === 1;
  const mode = useUserInteractionMode();
  const keyboard = mode === "keyboard";
  const touch = mode === "touch";
  const [mouseVisible, setMouseVisible] = useState(false);
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
    if (disabled || !discrete) {
      setMouseVisible(false);
      return;
    }

    setMouseVisible((prevVisible) => prevVisible && mode !== "touch");
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
    animate: !disableSmoothDragging && animate,
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
        onMouseEnter={(event) => {
          onMouseEnter(event);
          if (discrete && tooltipVisibility === "hover" && !touch) {
            setMouseVisible(true);
          }
        }}
        onMouseLeave={(event) => {
          onMouseLeave(event);
          if (discrete && tooltipVisibility === "hover" && !touch) {
            setMouseVisible(false);
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
          animate={!disableSmoothDragging && !active}
          visible={
            tooltipVisibility === "always" ||
            active ||
            keyboardVisible ||
            mouseVisible
          }
          {...tooltipProps}
          {...getTooltipProps(value, isFirstThumb)}
          index={index}
        >
          {getTooltipChildren(value, isFirstThumb)}
        </SliderValueTooltip>
      )}
    </>
  );
});
