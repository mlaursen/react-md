import getFocusableElements from "./getFocusableElements";
import scrollIntoView from "../scrollIntoView";

export type Focus = "first" | "last" | string;

/**
 * A function that is used to focus an element within the provided node.  This
 * can either focus the first, last, or a querySelector found element.
 *
 * @param container Either an HTMLElement or the document to focus an element
 * within.
 * @param focus Either the "first" or "last" string to focus the first or last
 * focusable element within the container or a query selector string to find a
 * focusable element within the container.
 * @param preventScroll Boolean if the focus event should not scroll the element
 * into view. This should normally remain `false`, but can be useful if the
 * element gets focused while offscreen during a transition.
 * @param progamatic Boolean if programatically focusable elements should be
 * included as well.
 */
export default function focusElementWithin(
  container: HTMLElement | Document,
  focus: Focus,
  programatic: boolean = false,
  preventScroll: boolean = false,
  elements?: HTMLElement[]
): void {
  if (!elements || !elements.length) {
    elements = getFocusableElements(container, programatic);
  }

  let el: HTMLElement | null;
  switch (focus) {
    case "first":
      [el] = elements;
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

  el.focus({ preventScroll });
  if (!preventScroll && container !== document) {
    scrollIntoView(container as HTMLElement, el);
  }
}
