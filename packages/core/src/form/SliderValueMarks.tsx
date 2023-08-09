import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { Fragment } from "react";
import { getPercentage } from "../utils/getPercentage";
import type { RangeStepsOptions } from "../utils/getRangeSteps";
import { getRangeSteps } from "../utils/getRangeSteps";
import { SliderMark } from "./SliderMark";
import type { CustomizableSliderMarkLabelProps } from "./SliderMarkLabel";
import { SliderMarkLabel } from "./SliderMarkLabel";

/**
 * @remarks \@since 6.0.0
 */
export interface SliderValueMark {
  /**
   * An optional label to display alongside the current mark. This will be
   * positioned below the mark for horizontal sliders and to the right for
   * vertical sliders.
   */
  label?: ReactNode;

  /**
   * The value of the mark that should be a valid step within the slider.
   */
  value: number;
}

/**
 * @remarks \@since 6.0.0
 */
export interface SliderValueMarkState {
  /** The {@link SliderValueMark.value} */
  value: number;

  /**
   * No idea if this is actually useful (maybe custom styles?), but it is the
   * current percentage the mark is offset and is what is set as the
   * `left`/`top` values for the mark.
   */
  offset: string;

  /**
   * This will be `true` when the mark is being covered by the slider track's
   * active state.
   */
  active: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export interface SliderMarksOptions {
  /**
   * Set this to `true` to display a mark for each step within the slider. This
   * can be used alongside the {@link getMarkProps} and
   * {@link getMarkLabelProps} to customize the styles or display a label for
   * the mark.
   *
   * @example
   * Custom Marks
   * ```tsx
   * const slider = useSlider({ step: 10 });
   *
   * <Slider
   *   {...slider}
   *   marks={[
   *     { value: 0, label: "Minimum" },
   *     { value: 10 },
   *     { value: 20 },
   *     { value: 30 },
   *     { value: 40 },
   *     { value: 50, label: "Medium" },
   *     { value: 60 },
   *     { value: 70 },
   *     { value: 80 },
   *     { value: 90 },
   *     { value: 100, label: "Maximum" },
   *   ]}
   * />
   * ```
   */
  marks?: boolean | readonly SliderValueMark[];

  /**
   * This can be used to override any styles for the specific mark.
   */
  getMarkProps?(
    options: SliderValueMarkState
  ): HTMLAttributes<HTMLSpanElement> | void;

  /**
   * This can be used to override any styles for a specific mark's label or
   * display a label dynamically.
   *
   * @example
   * Dynamic Labels
   * ```tsx
   * <Slider
   *   {...slider}
   *   marks
   *   getMarkLabelProps={({ active, value }) => {
   *     if (value % 10 !== 0) {
   *       return;
   *     }
   *
   *     return {
   *       children: `${value} degrees`,
   *       className: cnb(active && styles.somethingCustom),
   *     };
   *   }}
   * />
   * ```
   */
  getMarkLabelProps?(
    options: SliderValueMarkState
  ): Partial<CustomizableSliderMarkLabelProps> | void;
}

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export interface SliderValueMarksProps
  extends RangeStepsOptions,
    Required<SliderMarksOptions> {
  vertical: boolean;
  thumb1Value: number;
  thumb2Value: number;
  isRangeSlider: boolean;
}

/**
 * **Server Component**
 *
 * @internal
 * @remarks \@since 6.0.0
 */
export function SliderValueMarks(props: SliderValueMarksProps): ReactElement {
  const {
    min,
    max,
    step,
    marks: propMarks,
    vertical,
    thumb1Value,
    thumb2Value,
    isRangeSlider,
    getMarkProps,
    getMarkLabelProps,
  } = props;

  let marks: readonly SliderValueMark[];
  if (typeof propMarks === "boolean") {
    const steps = getRangeSteps({ min, max, step }) + 1;
    marks = Array.from({ length: steps }, (_, i) => ({ value: i * step }));
  } else {
    marks = propMarks;
  }

  return (
    <>
      {marks.map(({ value, label: markLabel }) => {
        // I can't think of a good name, but this is when the slider's track's
        // active color is covering the mark which requires different styles
        let active: boolean;
        let percentage = getPercentage({ min, max, value }) * 100;
        let markValue = value;
        if (vertical) {
          // need to reverse the percentage since it uses `top` for positioning
          // where the max value is at the top instead of bottom
          percentage = 100 - percentage;

          // need to reverse the mark's value as well for the same reason as
          // above
          markValue = max - value;
        }

        if (isRangeSlider) {
          active = markValue > thumb1Value && markValue < thumb2Value;
        } else {
          active = markValue < thumb1Value;
        }

        const offset = `${percentage}%`;
        const markProps = getMarkProps({ value, active, offset });
        const labelProps = getMarkLabelProps({ value, active, offset });
        const label = markLabel ?? labelProps?.children ?? null;

        return (
          <Fragment key={value}>
            <SliderMark
              {...markProps}
              offset={offset}
              active={active}
              vertical={vertical}
            />
            {label !== null && (
              <SliderMarkLabel
                {...labelProps}
                offset={offset}
                vertical={vertical}
              >
                {label}
              </SliderMarkLabel>
            )}
          </Fragment>
        );
      })}
    </>
  );
}
