import { useScrollLock } from "./useScrollLock";

/**
 * This is a convenience component that can be used within transitionable
 * components to ensure the scroll lock is active only while the element is
 * rendered.
 *
 * @remarks \@since 6.0.0
 */
export function ScrollLock(): null {
  useScrollLock(true);
  return null;
}
