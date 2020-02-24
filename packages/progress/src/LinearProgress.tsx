import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  Ref,
  useMemo,
} from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

import getProgress from "./getProgress";
import { ProgressProps } from "./types";

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
   * direction from `->` to `<-`. If the current language is a rtl language, the
   * direction will still be `->`.
   */
  reverse?: boolean;

  /**
   * Boolean if the progress should be vertical instead of horizontal.  When
   * this prop is set, you should also set the `verticalHeight` prop to a height
   * value you want for your progress bar.
   */
  vertical?: boolean;

  /**
   * Since there isn't really a good way to have "auto height", you'll need to
   * manually set the progress bar's height with this prop to some pixel value.
   * If you'd prefer to set the height in Sass/css, set this value to `null`
   * instead since this value would be passed down as a `height` inline style.
   */
  verticalHeight?: number | null;
}

const block = bem("rmd-linear-progress");

function LinearProgress(
  {
    style: propStyle,
    className,
    barStyle: propBarStyle,
    barClassName,
    min = 0,
    max = 100,
    value,
    reverse = false,
    animate = true,
    vertical = false,
    verticalHeight = 240,
    ...props
  }: LinearProgressProps,
  ref?: Ref<HTMLSpanElement>
): ReactElement {
  const style = useMemo(() => {
    if (!vertical || verticalHeight === null) {
      return propStyle;
    }

    return {
      ...propStyle,
      height: verticalHeight,
    };
  }, [propStyle, vertical, verticalHeight]);

  const progress = getProgress(min, max, value);
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
      {...props}
      ref={ref}
      style={style}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cnb(
        block({
          vertical,
          determinate,
          indeterminate,
        }),
        className
      )}
    >
      <span
        style={barStyle}
        className={cnb(
          block("bar", {
            vertical,
            "vertical-reverse": vertical && reverse,
            horizontal: !vertical,
            "horizontal-reverse": !vertical && reverse,
            animate: animate && determinate,
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
}

const ForwardedLinearProgress = forwardRef<
  HTMLSpanElement,
  LinearProgressProps
>(LinearProgress);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedLinearProgress.propTypes = {
      id: PropTypes.string.isRequired,
      min: PropTypes.number,
      max: PropTypes.number,
      value: PropTypes.number,
      animate: PropTypes.bool,
      barStyle: PropTypes.object,
      barClassName: PropTypes.string,
      reverse: PropTypes.bool,
      vertical: PropTypes.bool,
      verticalHeight: PropTypes.number,
    };
  } catch (e) {}
}

export default ForwardedLinearProgress;
