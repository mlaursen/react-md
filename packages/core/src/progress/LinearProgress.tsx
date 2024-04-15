import { cnb } from "cnbuilder";
import {
  forwardRef,
  useMemo,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { cssUtils } from "../cssUtils.js";
import { type LabelRequiredForA11y } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { bem } from "../utils/bem.js";
import { getPercentage } from "../utils/getPercentage.js";
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

const styles = bem("rmd-linear-progress");

/**
 * **Server Component**
 *
 * @example Indeterminate Example
 * ```tsx
 * import { LinearProgress } from "@react-md/core";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return <LinearProgress aria-label="Loading" />;
 * }
 * ```
 *
 * @example Determinate Example
 * ```tsx
 * import { LinearProgress } from "@react-md/core";
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
    min = 0,
    max = 100,
    value,
    reverse = false,
    theme = "primary",
    disableTransition = false,
    vertical = false,
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

  const determinate = typeof progress === "number";
  const indeterminate = !determinate;
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
      className={cnb(
        styles({
          vertical,
          horizontal: !vertical,
          determinate,
          indeterminate,
        }),
        theme !== "current-color" && cssUtils({ textColor: theme }),
        className
      )}
    >
      <span
        style={barStyle}
        className={cnb(
          styles("bar", {
            vertical,
            "vertical-reverse": vertical && reverse,
            horizontal: !vertical,
            "horizontal-reverse": !vertical && reverse,
            animate: !disableTransition && determinate,
            determinate,
            indeterminate,
            "determinate-reverse": determinate && reverse && !vertical,
            "determinate-vertical-reverse": determinate && reverse && vertical,
            "indeterminate-reverse": indeterminate && reverse && !vertical,
            "indeterminate-vertical": indeterminate && vertical,
            "indeterminate-vertical-reverse":
              indeterminate && reverse && vertical,
          }),
          barClassName
        )}
      />
    </span>
  );
});
