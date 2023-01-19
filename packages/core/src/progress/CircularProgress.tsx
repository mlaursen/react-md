import { cnb } from "cnbuilder";
import type { CSSProperties, HTMLAttributes } from "react";
import { forwardRef, useMemo } from "react";
import { useEnsuredId } from "../useEnsuredId";
import { bem, getPercentage } from "../utils";
import type { ProgressProps } from "./types";

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
   * An optional className to apply to the circle within the circular progress.
   */
  circleClassName?: string;

  /**
   * The radius for the circle. It is generally recommended to have the radius
   * be 1/2 of the viewbox and minus a few more pixels so that there is some
   * surrounding padding. You probably shouldn't really be changing this prop
   * though.
   *
   * @defaultValue `30`
   */
  radius?: number;

  /**
   * The center point for the circle. This should be half of the `viewBox` prop
   * 99% of the time and probably won't be changed.
   *
   * @defaultValue `33`
   */
  center?: number;

  /**
   * The viewbox for the child svg. I wouldn't recommend changing this value as
   * you will also need to update the `dashoffset` in both Sass and this prop to
   * get the animation to look nice again.
   *
   * @defaultValue `0 0 66 66`
   */
  viewBox?: string;

  /**
   * The `stroke-dashoffset` for the circle within the SVG. You probably won't
   * be changing this value that much as it should match the
   * `$rmd-progress-circle-dashoffset` Sass variable. This is really just used
   * to help to create the determinate progress animation.
   *
   * @defaultValue `187`
   */
  dashoffset?: number;

  /**
   * The number of degrees a determinate circular progress should rotate while
   * the {@link value} changes between the {@link min} and {@link max} values.
   *
   * If this prop is set to a number less than or equal to 0, there will be no
   * rotation.
   *
   * Note: The default value is just 1 3/4 rotations which looked okay.
   *
   * @defaultValue `630`
   * @remarks \@since 6.0.0 Renamed from `maxRotation` to
   * `determinateRotateDegrees`
   */
  determinateRotateDegrees?: number;

  /**
   * Boolean if the circular progress should be centered using left and right
   * margins.
   *
   * @defaultValue `false`
   */
  disableCentered?: boolean;

  /**
   * Boolean if the smaller size should be used instead.
   *
   * @defaultValue `false`
   * @remarks \@since 2.3.0
   */
  small?: boolean;
}

const styles = bem("rmd-circular-progress");

/**
 * @example
 * Simple Example
 *
 */
export const CircularProgress = forwardRef<
  HTMLSpanElement,
  CircularProgressProps
>(function CircularProgress(props, ref) {
  const {
    id: propId,
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
    disableTransition = false,
    disableCentered = false,
    determinateRotateDegrees = 630,
    small = false,
    ...remaining
  } = props;

  const id = useEnsuredId(propId, "circular-progress");
  let progress: number | undefined;
  if (typeof value === "number") {
    progress = getPercentage({ min, max, value, validate: true });
  }

  const svgStyle = useMemo<CSSProperties | undefined>(() => {
    if (typeof progress !== "number") {
      return propSvgStyle;
    }

    let transform = propSvgStyle?.transform;
    if (determinateRotateDegrees > 0) {
      const rotate = `rotate(${determinateRotateDegrees * progress}deg)`;
      transform = `${rotate}${transform ? ` ${transform}` : ""}`;
    }

    return {
      ...propSvgStyle,
      WebkitTransform: transform,
      transform,
    };
  }, [progress, determinateRotateDegrees, propSvgStyle]);

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
      {...remaining}
      id={id}
      ref={ref}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cnb(styles({ centered: !disableCentered, small }), className)}
    >
      <svg
        style={svgStyle}
        className={cnb(
          styles("svg", {
            animate: !disableTransition && determinate,
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
            styles("circle", {
              animate: !disableTransition && determinate,
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
});
