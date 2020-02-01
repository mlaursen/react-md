import { MutableRefObject } from "react";

export type RefOrInstance =
  | HTMLElement
  | null
  | MutableRefObject<HTMLElement | null>;

/**
 * Simple private util to get the DOM "instance" from either a ref object or an
 * HTMLElement.
 *
 * @param refOrInstance The ref or instance to get an HTMLElement from
 * @return The HTMLElement or null.
 */
export default function getInstance(
  refOrInstance: RefOrInstance
): HTMLElement | null {
  let instance = null;
  if (refOrInstance) {
    if (refOrInstance instanceof HTMLElement) {
      instance = refOrInstance;
    } else {
      instance = refOrInstance.current;
    }
  }

  return instance;
}
