let cached: number | undefined;

/**
 * This is used to reset the cached value for each test and verify the cached
 * behavior is working
 * @private
 */
export const reset = (): void => {
  cached = undefined;
};

/**
 * This will return the scrollbar width for a specific OS by creating a temporary element
 * to compare the width between it's inner element and it's own width when scrollbars are
 * enabled. This is useful when your width calculations need to exclude scrollbars since
 * they are included by default but content can't be shown underneath them for for static
 * elements.
 *
 * Note: This will return `0` on Mac OS with the default "Only show scrollbars when scrolling"
 * which is to be expected. These scrollbars overlay the content and actually don't take up
 * width real estate.
 *
 * @see https://stackoverflow.com/a/13382873
 * @param forced Boolean if the scrollbar width should be force updated. When this is false,
 * the "cached" value will be returned immediately instead
 * @return the current scrollbar width or -1 if running this on the server
 */
export default function scrollbarWidth(forced: boolean = false): number {
  /* istanbul ignore if */
  if (typeof window === "undefined") {
    return -1;
  }

  if (!forced && typeof cached === "number") {
    return cached;
  }

  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  // the scrollbar width can be determined by comparing the width of the parent element
  // that has scrollbars to the child element that does not.
  cached = outer.offsetWidth - inner.offsetWidth;
  document.body.removeChild(outer);

  return cached;
}
