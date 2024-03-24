"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEventHandler,
  type Ref,
  type RefCallback,
} from "react";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useResizeObserver } from "../useResizeObserver.js";

// this is the default of 1.5rem line-height in the styles
const DEFAULT_LINE_HEIGHT = 24;

const noop = (): void => {
  // do nothing
};

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
  resize: TextAreaResize;
  maxRows: number;
  onChange: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  containerRef?: Ref<HTMLDivElement>;
  disableTransition: boolean | undefined;
}

/** @internal */
export interface ResizingTextAreaReturnValue {
  height: string | undefined;
  maskRef: RefCallback<HTMLTextAreaElement>;
  containerRef: RefCallback<HTMLDivElement>;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  scrollable: boolean;
  disableTransition: boolean;
}

/** @internal */
export function useResizingTextArea(
  options: ResizingTextAreaOptions
): ResizingTextAreaReturnValue {
  const {
    maxRows,
    resize,
    onChange = noop,
    containerRef: propContainerRef,
    disableTransition,
  } = options;

  const maskRef = useRef<HTMLTextAreaElement>(null);
  const [containerRef, containerRefCallback] = useEnsuredRef(propContainerRef);
  const [height, setHeight] = useState<number>();
  useEffect(() => {
    if (resize !== "auto") {
      setHeight(undefined);
    }
  }, [resize]);

  // Since access to the DOM is required to calculate the current height of the
  // textarea, do not enable the height transition until it has been calculated
  // once.
  const isHeightSet = useRef(true);
  useEffect(() => {
    isHeightSet.current = !height;
  }, [height]);

  // Do not enable the scrollbar until the max height has been reached since
  // it'll flash as the user types on OS that display scrollbars.
  //
  // Note: This does cause an infinite loop issue on browsers that display OS
  // when rendered in a flex/grid container and a "fluid" width since:
  // - the width changes when the overflow changes to `auto`
  // - the resize observer triggers since there was a width change
  // - the number of rows imght change because of this width change
  // - it might no longer be at the max height, so remove the scrollbar
  // - restart
  const [isMaxHeightReached, setMaxHeightReached] = useState(false);
  const updateHeight = useCallback(() => {
    const mask = maskRef.current;
    const container = containerRef.current;
    /* c8 ignore start */
    if (!mask || !container) {
      return;
    }
    /* c8 ignore stop */

    const containerStyles = window.getComputedStyle(container);
    const isBorderBox = containerStyles.boxSizing === "border-box";
    let borderHeight = 0;
    if (isBorderBox) {
      borderHeight =
        parseFloat(containerStyles.borderTopWidth) +
        parseFloat(containerStyles.borderBottomWidth);
    }

    let nextHeight = mask.scrollHeight + borderHeight;
    if (maxRows > 0) {
      nextHeight -= borderHeight;
      const maskStyles = window.getComputedStyle(mask);
      // in tests, this is `"normal"` by default instead of a number
      let lineHeight = parseFloat(maskStyles.lineHeight);
      if (Number.isNaN(lineHeight)) {
        lineHeight = DEFAULT_LINE_HEIGHT;
      }

      const maxHeight = maxRows * lineHeight;
      nextHeight = Math.min(maxHeight, nextHeight);
      setMaxHeightReached(nextHeight === maxHeight);
      nextHeight += borderHeight;
    }

    // This just makes snapshots look nicer since `nextHeight` will be 0 in
    // tests unless the user mocks out all the DOM properties
    if (nextHeight) {
      setHeight(nextHeight);
    }
  }, [containerRef, maxRows]);

  const maskRefCallback = useResizeObserver({
    ref: maskRef,
    onUpdate: updateHeight,
    disableHeight: true,
  });

  return {
    height: typeof height === "number" ? `${height}px` : undefined,
    maskRef: maskRefCallback,
    containerRef: containerRefCallback,
    scrollable: maxRows > 0 && isMaxHeightReached,
    disableTransition: disableTransition || isHeightSet.current,
    onChange(event) {
      onChange(event);

      const mask = maskRef.current;
      if (!mask || resize !== "auto") {
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
