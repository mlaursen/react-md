import { cnb } from "cnbuilder";
import type { CSSProperties, HTMLAttributes } from "react";
import { forwardRef, useMemo } from "react";
import { useEnsuredId } from "../useEnsuredId";
import { bem, getPercentage } from "../utils";
import type { ProgressProps } from "./types";

export interface LinearProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id">,
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

export const LinearProgress = forwardRef<HTMLSpanElement, LinearProgressProps>(
  function LinearProgress(props, ref) {
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
              "determinate-vertical-reverse":
                determinate && reverse && vertical,
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
  }
);
