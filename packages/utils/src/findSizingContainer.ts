/**
 * Attempts to find a sizing container based on the provided HTMLElement. By default, the sizing
 * element will just be the provided element unless:
 * - the item has a known role within react-md that can target known classes
 * - the item has a `data-sizing-selector` attribute that is a valid query selector for the nested item.
 * NOTE: The `data-sizing-selector` will be run from the current element instead of the `document`.
 */
export default function findSizingContainer(el: HTMLElement | null) {
  if (!el) {
    return null;
  } else if (/(tree|list)item/.test(el.getAttribute("role") || "")) {
    const content = el.querySelector(".rmd-tree-item__content, .rmd-item-text") as HTMLElement;
    if (content) {
      return content;
    }
  }

  const data = el.getAttribute("data-sizing-selector");
  if (data) {
    const content = el.querySelector(data) as HTMLElement;
    if (content) {
      return content;
    } else if (process.env.NODE_ENV === "development") {
      // tslint:disable-next-line no-console
      console.error(
        "Unable to find a nested element for sizing with the provided query selector: `%s` " +
          "and target element: `%s`",
        data,
        el
      );
    }
  }

  return el;
}
