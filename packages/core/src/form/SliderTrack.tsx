import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { bem } from "../utils";
import type {
  ClosestThumbEventHandlersOptions,
  ThumbOffsetsOptions,
} from "./sliderUtils";
import { getClosestThumbEventHandlers, getThumbOffsets } from "./sliderUtils";

declare module "react" {
  interface CSSProperties {
    "--rmd-slider-offset-1"?: string;
    "--rmd-slider-offset-2"?: string;
  }
}

const styles = bem("rmd-slider-track");

/**
 * @internal
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Updated to be internal only.
 */
export interface SliderTrackProps
  extends HTMLAttributes<HTMLSpanElement>,
    ClosestThumbEventHandlersOptions,
    ThumbOffsetsOptions {
  animate: boolean;
  disabled: boolean;
}

/**
 * @internal
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0 Updated to be internal only.
 */
export const SliderTrack = forwardRef<HTMLSpanElement, SliderTrackProps>(
  function SliderTrack(props, ref) {
    const {
      style,
      className,
      animate,
      vertical,
      disabled,
      min,
      max,
      thumb1Ref,
      thumb1Value,
      thumb1Dragging,
      thumb1DragPercentage,
      thumb1OnMouseUp,
      thumb1OnMouseDown,
      thumb1OnMouseMove,
      thumb1OnTouchStart,
      thumb1OnTouchMove,
      thumb2Ref,
      thumb2Value,
      thumb2Dragging,
      thumb2DragPercentage,
      thumb2OnMouseUp,
      thumb2OnMouseDown,
      thumb2OnMouseMove,
      thumb2OnTouchStart,
      thumb2OnTouchMove,
      isRangeSlider,
      children,
      ...remaining
    } = props;

    return (
      <span
        {...remaining}
        ref={ref}
        style={{
          ...style,
          ...getThumbOffsets({
            min,
            max,
            thumb1Value,
            thumb1Dragging,
            thumb1DragPercentage,
            thumb2Value,
            thumb2Dragging,
            thumb2DragPercentage,
            isRangeSlider,
          }),
        }}
        className={cnb(
          styles({
            animate,
            disabled,
            hoverable: !disabled,
            h: !vertical,
            h1: !vertical && !isRangeSlider,
            h2: !vertical && isRangeSlider,
            v: vertical,
            v1: vertical && !isRangeSlider,
            v2: vertical && isRangeSlider,
          }),
          className
        )}
        {...getClosestThumbEventHandlers({
          vertical,
          isRangeSlider,
          thumb1Ref,
          thumb1Dragging,
          thumb1OnMouseUp,
          thumb1OnMouseDown,
          thumb1OnMouseMove,
          thumb1OnTouchStart,
          thumb1OnTouchMove,
          thumb2Ref,
          thumb2Dragging,
          thumb2OnMouseUp,
          thumb2OnMouseDown,
          thumb2OnMouseMove,
          thumb2OnTouchStart,
          thumb2OnTouchMove,
        })}
      >
        {children}
      </span>
    );
  }
);
