interface CollapseSizing {
  maxHeight?: number;
  paddingTop?: number;
  paddingBottom?: number;
}

/**
 * A small util that will find the max-height, padding-top, and padding-bottom
 * for the provided element. This is really used to be able to transition the
 * max-height value since `max-height: auto` does not transition. The only way
 * to get transition is to change max-height values manually.
 *
 * @internal
 */
export function getElementSizing(element: HTMLElement | null): CollapseSizing {
  let maxHeight;
  let paddingTop;
  let paddingBottom;
  if (element) {
    maxHeight = element.scrollHeight;

    // clone the element (not deep) just to figure out it's padding without the
    // inline styles applied
    const cloned = element.cloneNode(false) as HTMLElement;
    cloned.style.maxHeight = "";
    cloned.style.padding = "";
    cloned.style.paddingLeft = element.style.paddingLeft;
    cloned.style.paddingRight = element.style.paddingRight;
    cloned.style.visibility = "hidden";

    const container = element.parentElement || document.body;
    container.appendChild(cloned);
    const style = window.getComputedStyle(cloned);
    if (style.paddingTop) {
      paddingTop = parseFloat(style.paddingTop);
    }

    if (style.paddingBottom) {
      paddingBottom = parseFloat(style.paddingBottom);
    }
    container.removeChild(cloned);
  }

  return { maxHeight, paddingTop, paddingBottom };
}
