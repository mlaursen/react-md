import getFocusableElements from "./getFocusableElements";

export type Focus = "first" | "last" | string;

/**
 * A function that is used to focus an element within the provided node.
 * This can either focus the first, last, or a querySelector found element.
 *
 * @param container Either an HTMLElement or the document to focus an element
 * within.
 * @param focus Either the "first" or "last" string to focus the first or last
 * focusable element within the container or a query selector string to find a
 * focusable element within the container.
 */
export default function focusElementWithin(
  container: HTMLElement | Document,
  focus: Focus,
  elements?: HTMLElement[]
) {
  if (!elements || !elements.length) {
    elements = getFocusableElements(container);
  }

  let el: HTMLElement | null;
  switch (focus) {
    case "first":
      el = elements[0];
      break;
    case "last":
      el = elements[elements.length - 1];
      break;
    default:
      el = container.querySelector<HTMLElement>(focus);
  }

  if (!el) {
    throw new Error("Unable to find a focusable element");
  }

  el.focus();
}
