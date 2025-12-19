let cache: number | undefined;

/**
 * @internal
 */
export function getScrollbarWidth(force = false): number {
  /* istanbul ignore if */
  if (globalThis.window === undefined) {
    return 0;
  }

  let value = cache;
  if (!force && typeof value === "number") {
    return value;
  }

  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.append(outer);

  const inner = document.createElement("div");
  outer.append(inner);

  // the scrollbar width can be determined by comparing the width of the parent
  // element that has scrollbars to the child element that does not.
  value = outer.offsetWidth - inner.offsetWidth;
  cache = value;
  outer.remove();

  return value;
}
