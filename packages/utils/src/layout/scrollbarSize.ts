interface Cache {
  height: number | undefined;
  width: number | undefined;
}

type SizingType = "height" | "width";

const cached: Cache = {
  height: undefined,
  width: undefined,
};

/**
 * This is used to reset the cached value for each test and verify the cached
 * behavior is working
 * @internal
 */
export const reset = (): void => {
  cached.height = undefined;
  cached.width = undefined;
};

/**
 * This will return the scrollbar size for a specific OS by creating a
 * temporary element to compare the height/width between it's inner element and
 * it's own height/width when scrollbars are enabled. This is useful when your
 * height/width calculations need to exclude scrollbars since they are included
 * by default but content can't be shown underneath them for for static
 * elements.
 *
 * Note: This will return `0` on Mac OS with the default "Only show scrollbars
 * when scrolling" which is to be expected. These scrollbars overlay the content
 * and actually don't take up height/width real estate.
 *
 * @see https://stackoverflow.com/a/13382873
 * @param type - Either the string "height" or "width" to determine which size
 * to get
 * @param forced - Boolean if the scrollbar height/width should be force
 * updated. When this is false, the "cached" value will be returned immediately
 * instead
 * @returns the current scrollbar width or -1 if running this on the server
 */
export function scrollbarSize(
  type: SizingType = "width",
  forced = false
): number {
  /* istanbul ignore if */
  if (typeof window === "undefined") {
    return -1;
  }

  let value = cached[type];
  if (!forced && typeof value === "number") {
    return value;
  }

  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  const offsetType = type === "width" ? "offsetWidth" : "offsetHeight";

  // the scrollbar width can be determined by comparing the width of the parent
  // element that has scrollbars to the child element that does not.
  value = outer[offsetType] - inner[offsetType];
  cached[type] = value;
  document.body.removeChild(outer);

  return value;
}
