/**
 * A small function that will find the top-most or closest overflow container for the provided element.
 *
 * This is mostly used for determining if the provided element can be visible within an overflow container
 *
 * @param {HTMLElement | null} el - The element to check against
 * @param {boolean=false} firstMatch - Boolean if the first match of an overflow container should be used. If
 *    this is `false`, it will return the top-most level within the DOM that has overflow set.
 * @return {HTMLElement | null} the overflow container, null, or the provided element if there is no overflow
 *    container.
 */
export default function findOverflowContainer(el: HTMLElement | null, firstMatch: boolean = false) {
  let closest = el;
  let node = el;
  while (node && node.offsetParent) {
    const { overflow, position } = window.getComputedStyle(node);
    if (overflow !== "visible" && position !== "static") {
      closest = node;

      if (firstMatch) {
        return closest;
      }
    }

    node = node.offsetParent as HTMLElement;
  }

  return closest;
}
