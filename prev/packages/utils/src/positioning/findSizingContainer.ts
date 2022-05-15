/**
 * Attempts to find a sizing container based on the provided HTMLElement. By
 * default, the sizing element will just be the provided element unless:
 * - the item has a known role within react-md that can target known classes
 * - the item has a `data-sizing-selector` attribute that is a valid query
 *   selector for the nested item.
 *
 * NOTE: The `data-sizing-selector` will be run from the current element instead
 * of the `document`.
 *
 * @param el - The element to find a sizing container for.
 * @returns the sizing container relative to the provided element, or `null` if
 * none could be found.
 * @throws This error will be thrown if using the `data-query-selector` and the
 * query selector does not return an element on the page.
 */
export function findSizingContainer(
  el: HTMLElement | null
): HTMLElement | null {
  if (!el) {
    return null;
  }

  if (/(tree|list)item/.test(el.getAttribute("role") || "")) {
    const content = el.querySelector(
      ".rmd-tree-item__content, .rmd-item-text"
    ) as HTMLElement;
    if (content) {
      return content;
    }
  } else if (el.getAttribute("type") === "file") {
    const label = document.querySelector<HTMLLabelElement>(`[for="${el.id}"]`);
    if (label) {
      return label;
    }
  }

  const data = el.getAttribute("data-sizing-selector");
  if (data) {
    const content = el.querySelector(data) as HTMLElement;
    if (content) {
      return content;
    }

    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "Unable to find a child element using the `data-sizing-selector`"
      );
    }
  }

  return el;
}
