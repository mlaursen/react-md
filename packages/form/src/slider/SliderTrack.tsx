import React, { HTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { THUMB_1_VAR, THUMB_2_VAR } from "./constants";
import { SliderPresentation } from "./types";

const styles = bem("rmd-slider-track");

type CSSProperties = React.CSSProperties & {
  [THUMB_1_VAR]?: string;
  [THUMB_2_VAR]?: string;
};

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
   * Boolean if the track should inverse the active and inactive states so that
   * the thicker bar would appear on the right instead of the left when
   * horizontal. The thicker bar would appear above instead of below for vertical
   * sliders.
   *
   * Note: This does not do anything for sliders that have two thumbs (range
   * slider).
   */
  inversed?: boolean;

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

export const SliderTrack = forwardRef<HTMLSpanElement, SliderTrackProps>(
  function SliderTrack(
    {
      style: propStyle,
      className,
      children,
      animate = false,
      vertical = false,
      disabled = false,
      inversed = false,
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
            h: !vertical,
            h1: !vertical && !thumb2Percentage && !inversed,
            "h1-inv": !vertical && !thumb2Percentage && inversed,
            h2: !vertical && thumb2Percentage,
          }),
          className
        )}
      >
        {children}
      </span>
    );
  }
);
