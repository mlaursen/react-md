import { MutableRefObject } from "react";

/**
 * This is used during the transition effect to validate that the `ref` has been
 * correctly applied to a DOM node for the transition to work. It will also
 * verify that the ref was actually forwarded to a DOM node and not to a
 * component instance.
 *
 * @private
 */
export default function getNode<E extends HTMLElement>(
  ref: MutableRefObject<E | null>
): E {
  const node = ref.current;
  // the node **needs** to be non-null by this point and this normally
  // happens if the ref was not passed to an element
  if (!node) {
    throw new Error("Node not provided. Ref not passed correctly to child");
  } else if (
    process.env.NODE_ENV !== "production" &&
    !(node instanceof HTMLElement)
  ) {
    throw new Error("Node is not an HTMLElement");
  }
  return node;
}
