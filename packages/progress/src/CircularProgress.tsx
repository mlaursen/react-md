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

export interface CircularProgressProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "id">,
    ProgressProps {
  /**
   * An optional style to apply to the svg within the circular progress. The
   * values of this style object will be merged with the current determinate
   * style (if it exists).
   */
  svgStyle?: CSSProperties;

  /**
   * An optional className to apply to the svg within the circular progress.
   */
  svgClassName?: string;

  /**
   * An optional style to apply to the circle within the circular progress. The
   * values of this style object will be merged with the current determinate
   * style (if it exists).
   */
  circleStyle?: CSSProperties;

  /**
   * An optional className to apply to the circle within the cicular progress.
   */
  circleClassName?: string;

  /**
   * The radius for the circle. It is generally recommended to have the radius
   * be 1/2 of the viewbox and minus a few more pixels so that there is some
   * surrounding padding. You probably shouldn't really be changing this prop
   * though.
   */
  radius?: number;

  /**
   * The center point for the circle. This should be half of the `viewBox` prop
   * 99% of the time and probably won't be changed.
   */
  center?: number;

  /**
   * The viewbox for the child svg. I wouldn't recommend changing this value as
   * you will also need to update the `dashoffset` in both Sass and this prop to
   * get the animation to look nice again.
   */
  viewBox?: string;

  /**
   * The `stroke-dashoffset` for the circle within the SVG. You probably won't
   * be changing this value that much as it should match the
   * `$rmd-progress-circle-dashoffset` Sass variable. This is really just used
   * to help to create the determinite progress animation.
   */
  dashoffset?: number;

  /**
   * The max rotation value for the circular progress. If you set this value to
   * a number less than or equal to 0, the circular progress will no longer
   * rotate with the determinate progress type.
   */
  maxRotation?: number;

  /**
   * Boolean if the circular progress should be centered using left and right
   * margins.
   */
  centered?: boolean;
}

const block = bem("rmd-circular-progress");

function CircularProgress(
  {
    className,
    svgStyle: propSvgStyle,
    svgClassName,
    circleStyle: propCircleStyle,
    circleClassName,
    value,
    min = 0,
    max = 100,
    radius = 30,
    center = 33,
    viewBox = "0 0 66 66",
    dashoffset = 187,
    animate = true,
    centered = true,
    maxRotation = 360 * 1.75,
    ...props
  }: CircularProgressProps,
  ref?: Ref<HTMLSpanElement>
): ReactElement {
  const progress = getProgress(min, max, value);
  const svgStyle = useMemo(() => {
    if (typeof progress !== "number") {
      return propSvgStyle;
    }

    let transform = propSvgStyle && propSvgStyle.transform;
    if (maxRotation > 0) {
      const rotate = `rotate(${maxRotation * progress}deg)`;
      transform = `${rotate}${transform ? ` ${transform}` : ""}`;
    }

    return {
      ...propSvgStyle,
      WebkitTransform: transform,
      MozTransform: transform,
      transform,
    };
  }, [progress, maxRotation, propSvgStyle]);

  const circleStyle = useMemo(() => {
    if (typeof progress !== "number") {
      return propCircleStyle;
    }

    return {
      ...propCircleStyle,
      strokeDashoffset: dashoffset - dashoffset * progress,
    };
  }, [progress, propCircleStyle, dashoffset]);

  const determinate = typeof progress === "number";
  const indeterminate = !determinate;
  return (
    <span
      {...props}
      ref={ref}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cnb(block({ centered }), className)}
    >
      <svg
        style={svgStyle}
        className={cnb(
          block("svg", {
            animate: animate && determinate,
            determinate,
            indeterminate,
          }),
          svgClassName
        )}
        viewBox={viewBox}
      >
        <circle
          style={circleStyle}
          className={cnb(
            block("circle", {
              animate: animate && determinate,
              determinate,
              indeterminate,
            }),
            circleClassName
          )}
          r={radius}
          cx={center}
          cy={center}
        />
      </svg>
    </span>
  );
}

const ForwardedCircularProgress = forwardRef<
  HTMLSpanElement,
  CircularProgressProps
>(CircularProgress);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedCircularProgress.propTypes = {
      id: PropTypes.string.isRequired,
      min: PropTypes.number,
      max: PropTypes.number,
      value: PropTypes.number,
      animate: PropTypes.bool,
      svgStyle: PropTypes.object,
      svgClassName: PropTypes.string,
      circleStyle: PropTypes.object,
      circleClassName: PropTypes.string,
      radius: PropTypes.number,
      center: PropTypes.number,
      centered: PropTypes.bool,
      maxRotation: PropTypes.number,
      dashoffset: PropTypes.number,
      viewBox: PropTypes.string,
    };
  } catch (e) {}
}

export default ForwardedCircularProgress;
