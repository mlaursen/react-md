import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef, useRef } from "react";
import { useDraggable } from "../draggable";
import type { TooltipProps } from "../tooltip";
import type {
  LabelRequiredForA11y,
  PropsWithRef,
  UseStateSetter,
} from "../types";
import { useEnsuredId } from "../useEnsuredId";
import { identity, withinRange } from "../utils";
import type { SliderAddonProps } from "./SliderContainer";
import { SliderContainer } from "./SliderContainer";
import type { SliderThumbPresentation } from "./SliderThumb";
import { SliderThumb } from "./SliderThumb";
import { SliderTrack } from "./SliderTrack";
import { getJumpValue } from "./sliderUtils";
import type { RangeSliderState } from "./useRangeSlider";
import type { SliderState, SliderValueOptions } from "./useSlider";

declare module "react" {
  interface CSSProperties {
    "--rmd-slider-color"?: string;
    "--rmd-slider-active-color"?: string;
    "--rmd-slider-inactive-color"?: string;
    "--rmd-slider-size"?: string | number;
    "--rmd-slider-active-size"?: string | number;
    "--rmd-slider-inactive-size"?: string | number;
    "--rmd-slider-vertical-size"?: string | number;
    "--rmd-slider-offset-1"?: string;
    "--rmd-slider-offset-2"?: string;
    "--rmd-slider-tooltip-scale"?: string | number;
    "--rmd-slider-tooltip-translate"?: string | number;
  }
}

const emptyString = (): string => "";
const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 2.5.0
 */
export interface BaseSliderProps
  extends HTMLAttributes<HTMLDivElement>,
    SliderThumbPresentation,
    SliderValueOptions,
    SliderAddonProps {
  /**
   * The amount to jump the slider's value when the `PageUp` or `PageDown`
   * key is pressed.
   *
   * The default value is 1/10th of the range.
   *
   * @defaultValue `(numberOfSteps / 10) * step`
   */
  jump?: number;

  /** @defaultValue `false` */
  disabled?: boolean;

  /** @defaultValue `false` */
  vertical?: boolean;

  /**
   * This can be used to apply custom styles or a `ref` to the track element if
   * needed.
   */
  trackProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

  /**
   * This can be used to configure any additional tooltip props like the
   * CSS transition `classNames`, styles, etc.
   *
   * This will only be used when {@link discrete} is `true`.
   *
   * Note: The `position` will always be `"above"` for horizontal sliders and
   * `"left"` for vertical sliders.
   */
  tooltipProps?: Omit<Partial<TooltipProps>, "position">;
}

/**
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Only requires `value` and `setValue` props instead of all the
 * slider controls.
 * \@since 6.0.0 The `thumbLabel` and `thumbLabelledBy` props were removed. Use
 * the `aria-label` or `aria-labelledby` props instead.
 */
export interface SliderProps extends BaseSliderProps, SliderState {
  /**
   * Any additional props that should be provided to the thumb element. This can
   * be useful for applying additional styling.
   */
  thumbProps?: HTMLAttributes<HTMLSpanElement>;

  /**
   * This can be used to update the discrete slider's value tooltip.
   *
   * @example
   * More Value Information
   * ```tsx
   * <Slider
   *   {...slider}
   *   discrete
   *   getTooltipChildren={(value) => (
   *     <TextIconSpacing icon={<FavoriteIcon />}>
   *       {value}
   *     </TextIconSpacing>
   *   )}
   * />
   * ```
   *
   * This will only be used when {@link discrete} is `true`.
   *
   * @defaultValue `(value) => value`
   */
  getTooltipChildren?(value: number): ReactNode;
}

/**
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Only requires `rangeValue` and `setRangeValue` props instead of
 * all the slider controls.
 * \@since 6.0.0 The `thumb1Label`, `thumb1LabelledBy`, `thumb1Props`,
 * `thumb2Label`, `thumb2LabelledBy` and `thumb2Props` were renamed to
 * `minThumbLabel`, `minThumbLabelledBy`, `minThumbProps`, `maxThumbLabel`,
 * `maxThumbLabelledBy`, and `maxThumbProps` respectively.
 */
export interface RangeSliderProps extends BaseSliderProps, RangeSliderState {
  /**
   * Any additional props that should be provided to the min value thumb
   * element. This can be useful for applying additional styling.
   */
  minThumbProps?: HTMLAttributes<HTMLSpanElement>;

  /**
   * Any additional props that should be provided to the max value thumb
   * element. This can be useful for applying additional styling.
   */
  maxThumbProps?: HTMLAttributes<HTMLSpanElement>;

  /**
   * The `aria-label` to apply to the min value.
   *
   * Note: Either this prop or the {@link minThumbLabelledBy} are required for
   * accessibility.
   *
   * @defaultValue `"Min"`
   */
  minThumbLabel?: string;

  /**
   * Set this to an element's id that labels the min value.
   *
   * Note: Either this prop or the {@link minThumbLabel} are required for
   * accessibility.
   */
  minThumbLabelledBy?: string;

  /**
   * The `aria-label` to apply to the max value.
   *
   * Note: Either this prop or the {@link maxThumbLabelledBy} are required for
   * accessibility.
   *
   * @defaultValue `"Max"`
   */
  maxThumbLabel?: string;

  /**
   * Set this to an element's id that labels the max value.
   *
   * Note: Either this prop or the {@link maxThumbLabel} are required for
   * accessibility.
   */
  maxThumbLabelledBy?: string;

  /**
   * This can be used to update the discrete slider's value tooltip.
   *
   * @example
   * More Value Information
   * ```tsx
   * <Slider
   *   {...slider}
   *   discrete
   *   getTooltipChildren={(value, isMinValue) => (
   *     <TextIconSpacing
   *       icon={isMinValue ? <FavoriteIcon /> : <CloseIcon /}
   *       iconAfter={!isMinValue}
   *     >
   *       {value}
   *     </TextIconSpacing>
   *   )}
   * />
   * ```
   *
   * This will only be used when {@link discrete} is `true`.
   *
   * @defaultValue `(value) => value`
   */
  getTooltipChildren?(value: number, isMinValue: boolean): ReactNode;
}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { Form, Slider, useSlider } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const slider = useSlider({
 *     // these are the defaults and can be changed
 *     min: 0,
 *     max: 100,
 *     step: 1,
 *     defaultValue: 50,
 *   });
 *
 *   // if you need access to the current value or manually change the value
 *   // yourself.
 *   const { value, setValue } = slider;
 *
 *   return (
 *     <Form>
 *       <Slider {...slider} aria-label="Volume" />
 *     </Form>
 *   );
 * }
 * ```
 *
 * @example
 * Range Slider Example
 * ```tsx
 * import { Fieldset, Form, Legend, Slider, useRangeSlider } from "@react-md/core";
 * import type { ReactElement } from "react";
 * import { useId } from "react";
 *
 * function Example(): ReactElement {
 *   const slider = useRangeSlider({
 *     // these are the defaults and can be changed
 *     min: 0,
 *     max: 100,
 *     step: 1,
 *     defaultValue: [0, 100],
 *   });
 *
 *   // if you need access to the current value or manually change the value
 *   // yourself.
 *   const { rangeValue, setRangeValue } = slider;
 *   const [minPrice, maxPrice] = rangeValue;
 *
 *   return (
 *     <Form>
 *       <Fieldset>
 *         <Legend>Price Range</Legend>
 *         <Slider {...slider} />
 *       </Fieldset>
 *     </Form>
 *   );
 * }
 * ```
 *
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 The `Slider` and `RangeSlider` have been combined into the
 * single `Slider` component and removed the `label` support.
 * \@since 6.0.0 Each thumb includes an invisible `<input type="range">` instead
 * of an `<input type="hidden">`.
 */
export const Slider = forwardRef<
  HTMLDivElement,
  LabelRequiredForA11y<SliderProps> | RangeSliderProps
>(function Slider(props, ref) {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    id: propId,
    min = 0,
    max = 100,
    step = 1,
    jump: propJump,
    vertical = false,
    discrete = false,
    disabled = false,
    getValueText = emptyString,
    value,
    setValue,
    rangeValue,
    setRangeValue,
    trackProps,
    thumbProps,
    minThumbProps,
    minThumbLabel,
    minThumbLabelledBy,
    maxThumbProps,
    maxThumbLabel,
    maxThumbLabelledBy,
    tooltipProps,
    getTooltipChildren = identity,
    ...remaining
  } = props as SliderProps & RangeSliderProps;

  const jump = getJumpValue({ min, max, step, jump: propJump });
  const isRangeSlider = typeof value !== "number";

  const thumb1Id = useEnsuredId(propId, "slider");
  const thumb2Id = `${thumb1Id}-2`;
  const thumb1Ref = useRef<HTMLSpanElement>(null);
  const thumb2Ref = useRef<HTMLSpanElement>(null);

  let thumb1Max = max;
  let thumb2Min = min;
  let thumb1Label: string | undefined;
  let thumb1LabelledBy: string | undefined;
  let thumb2Label: string | undefined;
  let thumb2LabelledBy: string | undefined;
  let thumb1Value: number;
  let thumb2Value: number;
  let setThumb1Value: UseStateSetter<number>;
  let setThumb2Value: UseStateSetter<number>;
  if (!isRangeSlider) {
    thumb1Value = value;
    setThumb1Value = setValue;
    thumb2Value = max;
    setThumb2Value = noop;
    thumb1Label = ariaLabel;
    thumb1LabelledBy = ariaLabelledBy;
  } else {
    thumb1LabelledBy = minThumbLabelledBy;
    thumb1Label = minThumbLabel || (minThumbLabelledBy ? undefined : "Min");
    thumb2LabelledBy = maxThumbLabelledBy;
    thumb2Label = maxThumbLabel || (maxThumbLabelledBy ? undefined : "max");

    [thumb1Value, thumb2Value] = rangeValue;

    thumb1Max = thumb2Value - step;
    thumb2Min = thumb1Value + step;

    setThumb1Value = (valueOrSetter) => {
      setRangeValue((prevRangeValue) => {
        const value =
          typeof valueOrSetter === "number"
            ? valueOrSetter
            : valueOrSetter(prevRangeValue[0]);

        return [value, prevRangeValue[1]];
      });
    };
    setThumb2Value = (valueOrSetter) => {
      setRangeValue((prevRangeValue) => {
        const value =
          typeof valueOrSetter === "number"
            ? valueOrSetter
            : valueOrSetter(prevRangeValue[1]);

        return [prevRangeValue[0], value];
      });
    };
  }

  const {
    onKeyDown: thumb1OnKeyDown,
    onMouseUp: thumb1OnMouseUp,
    onMouseDown: thumb1OnMouseDown,
    onMouseMove: thumb1OnMouseMove,
    onTouchStart: thumb1OnTouchStart,
    onTouchMove: thumb1OnTouchMove,
    dragging: thumb1Dragging,
    dragPercentage: thumb1DragPercentage,
    draggableRef: thumb1DraggableRef,
  } = useDraggable({
    ref: thumb1Ref,
    min,
    max: thumb1Max,
    rangeMax: max,
    step,
    value: thumb1Value,
    setValue: setThumb1Value,
    disabled,
    vertical,
    withinOffsetParent: true,
    disableDraggingCursorClassName: true,
    onKeyDown(event) {
      switch (event.key) {
        case "PageUp":
          event.preventDefault();
          event.stopPropagation();
          setThumb1Value((prevValue) =>
            withinRange({
              min,
              max: thumb1Max,
              value: prevValue + jump,
            })
          );
          break;
        case "PageDown":
          event.preventDefault();
          event.stopPropagation();
          setThumb1Value((prevValue) =>
            withinRange({
              min,
              max: thumb1Max,
              value: prevValue - jump,
            })
          );
          break;
      }
    },
  });

  const {
    onKeyDown: thumb2OnKeyDown,
    onMouseUp: thumb2OnMouseUp,
    onMouseDown: thumb2OnMouseDown,
    onMouseMove: thumb2OnMouseMove,
    onTouchStart: thumb2OnTouchStart,
    onTouchMove: thumb2OnTouchMove,
    dragging: thumb2Dragging,
    dragPercentage: thumb2DragPercentage,
    draggableRef: thumb2DraggableRef,
  } = useDraggable({
    ref: thumb2Ref,
    min: thumb2Min,
    max,
    rangeMin: min,
    step,
    value: thumb2Value,
    setValue: setThumb2Value,
    vertical,
    disabled,
    withinOffsetParent: true,
    disableDraggingCursorClassName: true,
    onKeyDown(event) {
      switch (event.key) {
        case "PageUp":
          event.preventDefault();
          event.stopPropagation();
          setThumb2Value((prevValue) =>
            withinRange({
              min: thumb2Min,
              max,
              value: prevValue + jump,
            })
          );
          break;
        case "PageDown":
          event.preventDefault();
          event.stopPropagation();
          setThumb2Value((prevValue) =>
            withinRange({
              min: thumb2Min,
              max,
              value: prevValue - jump,
            })
          );
          break;
      }
    },
  });

  const dragging = thumb1Dragging || thumb2Dragging;

  return (
    <SliderContainer {...remaining} ref={ref} vertical={vertical}>
      <SliderTrack
        {...trackProps}
        min={min}
        max={max}
        thumb1Ref={thumb1Ref}
        thumb1Value={thumb1Value}
        thumb1Dragging={thumb1Dragging}
        thumb1DragPercentage={thumb1DragPercentage}
        thumb1OnMouseUp={thumb1OnMouseUp}
        thumb1OnMouseDown={thumb1OnMouseDown}
        thumb1OnMouseMove={thumb1OnMouseMove}
        thumb1OnTouchStart={thumb1OnTouchStart}
        thumb1OnTouchMove={thumb1OnTouchMove}
        thumb2Ref={thumb2Ref}
        thumb2Value={thumb2Value}
        thumb2Dragging={thumb2Dragging}
        thumb2DragPercentage={thumb2DragPercentage}
        thumb2OnMouseUp={thumb2OnMouseUp}
        thumb2OnMouseDown={thumb2OnMouseDown}
        thumb2OnMouseMove={thumb2OnMouseMove}
        thumb2OnTouchStart={thumb2OnTouchStart}
        thumb2OnTouchMove={thumb2OnTouchMove}
        animate={!dragging}
        disabled={disabled}
        vertical={vertical}
        isRangeSlider={isRangeSlider}
      >
        <SliderThumb
          aria-label={thumb1Label as string}
          aria-labelledby={thumb1LabelledBy}
          id={thumb1Id}
          {...thumbProps}
          {...minThumbProps}
          ref={thumb1DraggableRef}
          min={min}
          max={thumb1Max}
          step={step}
          value={thumb1Value}
          index={1}
          active={thumb1Dragging}
          animate={!dragging}
          discrete={discrete}
          disabled={disabled}
          vertical={vertical}
          onChange={(event) =>
            setThumb1Value(event.currentTarget.valueAsNumber)
          }
          onKeyDown={thumb1OnKeyDown}
          getValueText={getValueText}
          tooltipProps={tooltipProps}
          getTooltipChildren={getTooltipChildren}
        />
        {isRangeSlider && (
          <SliderThumb
            aria-label={thumb2Label as string}
            aria-labelledby={thumb2LabelledBy}
            id={thumb2Id}
            {...maxThumbProps}
            ref={thumb2DraggableRef}
            min={thumb2Min}
            max={max}
            step={step}
            value={thumb2Value}
            index={2}
            active={thumb2Dragging}
            animate={!dragging}
            disabled={disabled}
            discrete={discrete}
            vertical={vertical}
            onChange={(event) =>
              setThumb2Value(event.currentTarget.valueAsNumber)
            }
            onKeyDown={thumb2OnKeyDown}
            getValueText={getValueText}
            tooltipProps={tooltipProps}
            getTooltipChildren={getTooltipChildren}
          />
        )}
      </SliderTrack>
    </SliderContainer>
  );
});
