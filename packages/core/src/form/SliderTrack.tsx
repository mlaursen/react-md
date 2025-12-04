import { type HTMLAttributes, forwardRef } from "react";

import { sliderTrack } from "./sliderStyles.js";
import {
  type ClosestThumbEventHandlersOptions,
  type ThumbOffsetsOptions,
  getClosestThumbEventHandlers,
  getThumbOffsets,
} from "./sliderUtils.js";

/**
 * @internal
 * @since 2.5.0
 * @since 6.0.0 Updated to be internal only.
 */
export interface SliderTrackProps
  extends
    HTMLAttributes<HTMLSpanElement>,
    ClosestThumbEventHandlersOptions,
    ThumbOffsetsOptions {
  animate: boolean;
  disabled: boolean;
}

/**
 * @internal
 * @since 2.5.0
 * @since 6.0.0 Updated to be internal only.
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
        className={sliderTrack({
          className,
          animate,
          disabled,
          vertical,
          isRangeSlider,
        })}
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
