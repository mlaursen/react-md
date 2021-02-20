import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { THUMB_1_VAR, THUMB_2_VAR } from "./constants";
import { SliderPresentation } from "./types";

const styles = bem("rmd-slider-track");

type CSSProperties = React.CSSProperties & {
  [THUMB_1_VAR]?: string;
  [THUMB_2_VAR]?: string;
};

/**
 * @remarks \@since 2.5.0
 */
export interface SliderTrackProps
  extends HTMLAttributes<HTMLSpanElement>,
    SliderPresentation {
  /**
   * Boolean if the track should animate the value position whenever the
   * value changes. This should normally be set to `true` only when the track
   * is "idle" and not being dragged.
   */
  animate?: boolean;

  /**
   * This should be the current value as a percentage for the first thumb that
   * appears within the slider.
   */
  thumb1Percentage: string;

  /**
   * This should be the current value as a percentage for the second thumb that
   * appears within the slider, but only when behaving as a range slider.
   */
  thumb2Percentage?: string;
}

/**
 * The `SliderTrack` component is used to show the distance that the slider can
 * be dragged as well as a visual indication of the value. The main usage is to
 * update the custom css properties for the thumb's values.
 *
 * @remarks \@since 2.5.0
 */
export const SliderTrack = forwardRef<HTMLSpanElement, SliderTrackProps>(
  function SliderTrack(
    {
      style: propStyle,
      className,
      children,
      animate = false,
      vertical = false,
      disabled = false,
      thumb1Percentage,
      thumb2Percentage,
      ...props
    },
    ref
  ) {
    const style: CSSProperties = {
      ...propStyle,
      [THUMB_1_VAR]: thumb1Percentage,
      [THUMB_2_VAR]: thumb2Percentage,
    };

    return (
      <span
        {...props}
        ref={ref}
        style={style}
        className={cn(
          styles({
            animate,
            hoverable: !disabled,
            disabled,
            h: !vertical,
            h1: !vertical && !thumb2Percentage,
            h2: !vertical && thumb2Percentage,
            v: vertical,
            v1: vertical && !thumb2Percentage,
            v2: vertical && thumb2Percentage,
          }),
          className
        )}
      >
        {children}
      </span>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    SliderTrack.propTypes = {
      className: PropTypes.string,
      animate: PropTypes.bool,
      vertical: PropTypes.bool,
      disabled: PropTypes.bool,
      thumb1Percentage: PropTypes.string,
      thumb2Percentage: PropTypes.string,
    };
  } catch (e) {}
}
