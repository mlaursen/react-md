import {
  type CSSProperties,
  type HTMLAttributes,
  forwardRef,
  useMemo,
} from "react";

import { type LabelRequiredForA11y, type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { getPercentage } from "../utils/getPercentage.js";
import { linearProgress, linearProgressBar } from "./linearProgressStyles.js";
import { type ProgressProps } from "./types.js";

/**
 * @since 6.0.0 Added the `theme` prop
 */
export interface LinearProgressProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "id" | "children">,
    ProgressProps {
  /**
   * An optional style to apply to the progress bar. This will be merged with
   * the current width or height tracking the progress when a `value` is also
   * provided.
   */
  barStyle?: CSSProperties;

  /**
   * An optional className to apply to the progress bar.
   */
  barClassName?: string;

  /**
   * @since 6.1.0
   */
  barProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>>;

  /**
   * Boolean if the progress should be reversed. This will change the progress
   * direction from `left-to-right` to be `right-to-left`. If the current
   * language is a rtl language and this prop is enabled, the direction will
   * still be `left-to-right`.
   *
   * @defaultValue `false`
   */
  reverse?: boolean;

  /**
   * Boolean if the progress should be vertical instead of horizontal.  When
   * this prop is set, you should also set the `verticalHeight` prop to a height
   * value you want for your progress bar.
   *
   * @defaultValue `false`
   */
  vertical?: boolean;

  /**
   * Since there isn't really a good way to have "auto height", you'll need to
   * manually set the progress bar's height with this prop to some pixel value.
   * If you'd prefer to set the height in Sass/css, set this value to `null`
   * instead since this value would be passed down as a `height` inline style.
   *
   * @defaultValue `240`
   */
  verticalHeight?: number | null;
}

/**
 * @example Indeterminate Example
 * ```tsx
 * import { LinearProgress } from "@react-md/core/progress/LinearProgress";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return <LinearProgress aria-label="Loading" />;
 * }
 * ```
 *
 * @example Determinate Example
 * ```tsx
 * import { LinearProgress } from "@react-md/core/progress/LinearProgress";
 * import { useState, type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   // a number from 0 - 100
 *   const [progress, setProgress] = useState(0);
 *
 *   return <LinearProgress aria-label="File upload" value={progress} />;
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/progress#linear-progress | Progress Demos}
 * @since 6.0.0 Supports rendering as any of the theme colors and
 * requires a label for accessibility.
 */
export const LinearProgress = forwardRef<
  HTMLSpanElement,
  LabelRequiredForA11y<LinearProgressProps>
>(function LinearProgress(props, ref) {
  const {
    id: propId,
    style: propStyle,
    className,
    barStyle: propBarStyle,
    barClassName,
    barProps,
    min = 0,
    max = 100,
    value,
    reverse,
    theme,
    disableTransition,
    vertical,
    verticalHeight = 240,
    ...remaining
  } = props;

  const id = useEnsuredId(propId, "linear-progress");
  const style = useMemo(() => {
    if (!vertical || verticalHeight === null) {
      return propStyle;
    }

    return {
      ...propStyle,
      height: verticalHeight,
    };
  }, [propStyle, vertical, verticalHeight]);

  let progress: number | undefined;
  if (typeof value === "number") {
    progress = getPercentage({ min, max, value, validate: true });
  }
  const barStyle = useMemo(() => {
    if (typeof progress !== "number") {
      return propBarStyle;
    }

    const key = vertical ? "height" : "width";
    return {
      ...propBarStyle,
      [key]: `${progress * 100}%`,
    };
  }, [progress, propBarStyle, vertical]);

  const indeterminate = typeof progress !== "number";
  return (
    <span
      {...remaining}
      id={id}
      ref={ref}
      style={style}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className={linearProgress({
        className,
        theme,
        vertical,
        indeterminate,
      })}
    >
      <span
        {...barProps}
        style={barStyle}
        className={linearProgressBar({
          className: barClassName,
          reverse,
          vertical,
          indeterminate,
          disableTransition,
        })}
      />
    </span>
  );
});
