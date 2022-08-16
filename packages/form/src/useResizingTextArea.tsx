import { useResizeObserver } from "@react-md/core";
import type { ChangeEventHandler, RefCallback } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

// this is the default of 1.5rem line-height in the styles
const DEFAULT_LINE_HEIGHT = "24";

/**
 * A textarea is normally resizable in browsers by default by dragging the
 * bottom right corner to the desired size which will set inline styles for
 * `height` and `width`. Since this makes creating layouts a bit more difficult,
 * this is disabled by default but can be configured using one of these values:
 *
 * - `"auto"` - The textarea will automatically grow in in height as the user
 *   types until a max number of rows have been added. If there is additional
 *   text, a scrollbar will appear in the textarea. The browser's native resize
 *   behavior is disabled.
 * - `"none"` - The textarea's height and width will remain static
 * - `"horizontal"` - The textarea's width can be resized by the browser's
 *   native resize behavior.
 * - `"vertical"` - The textarea's height can be resized by the browser's native
 *   resize behavior.
 * - `"both"` - The browser's native resize behavior will be allowed.
 */
export type TextAreaResize =
  | "none"
  | "auto"
  | "horizontal"
  | "vertical"
  | "both";

/** @internal */
export interface ResizingTextAreaOptions {
  id?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;

  /**
   * @see {@link TextAreaResize}
   * @defaultValue `"auto"`
   */
  resize?: TextAreaResize;

  /**
   * The maximum number of rows a textarea can expand to before showing a
   * scrollbar. When this is set to `-1`, there will be no limit.
   *
   * @defaultValue `-1`
   */
  maxRows?: number;
}

/** @internal */
export interface ResizingTextAreaReturnValue {
  height: string | undefined;
  maskRef: RefCallback<HTMLTextAreaElement>;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  scrollable: boolean;
}

/** @internal */
export function useResizingTextArea(
  options: ResizingTextAreaOptions
): ResizingTextAreaReturnValue {
  const { maxRows = -1, resize = "auto", onChange } = options;

  const maskRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState<number>();
  const [scrollable, setScrollable] = useState(false);
  useEffect(() => {
    if (resize !== "auto") {
      setHeight(undefined);
    }
  }, [resize]);

  const updateHeight = useCallback(() => {
    const mask = maskRef.current;
    if (!mask) {
      return;
    }

    let nextHeight = mask.scrollHeight;
    /* istanbul ignore if */
    if (maxRows > 0) {
      const lineHeight = parseFloat(
        window.getComputedStyle(mask).lineHeight || DEFAULT_LINE_HEIGHT
      );
      const maxHeight = maxRows * lineHeight;
      nextHeight = Math.min(maxHeight, nextHeight);

      // only want the textarea to be scrollable if there's a limit on the rows
      // since it'll flash the scrollbar on most OS during the height transition
      if (nextHeight === maxHeight && !scrollable) {
        setScrollable(true);
      } else if (nextHeight !== maxHeight && scrollable) {
        setScrollable(false);
      }
    }

    if (height !== nextHeight) {
      setHeight(nextHeight);
    }
  }, [height, maxRows, scrollable]);

  const [, maskRefCallback] = useResizeObserver(updateHeight, {
    ref: maskRef,
    disableHeight: true,
  });

  return {
    height: typeof height === "number" ? `${height}px` : undefined,
    maskRef: maskRefCallback,
    scrollable,
    onChange(event) {
      const mask = maskRef.current;
      onChange?.(event);
      if (event.isPropagationStopped() || !mask || resize !== "auto") {
        return;
      }

      // to get the height transition to work, you have to set the height on:
      // - the main container element (including padding) that has the height
      //    transition enabled
      // - a child div wrapper (without padding) that has the height transition
      //    enabled
      // - the textarea element (without padding) and without a height transition
      //
      // if it isn't done this way, the height transition will look weird since
      // the text will be fixed to the bottom of the area and more text at the top
      // will become visible as the height transition completes. applying the
      // transition on the two parent elements work because:
      // - the height is set immediately on the text field so it expands to show all
      //    the text
      // - the height is correctly applied to both parent elements, but their height
      //    haven't fully been adjusted due to the animation
      // - the parent divs have overflow visible by default, so the textarea's text
      //    will expand past the boundaries of the divs and not cause the upwards
      //    animation weirdness.
      mask.value = event.currentTarget.value;
      updateHeight();
    },
  };
}
