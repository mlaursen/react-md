import type { Ref, RefCallback } from "react";
import { useActiveDescendantContext } from "./activeDescendantContext";
import { useKeyboardFocusableElement } from "./useKeyboardFocusableElement";

/**
 * @remarks \@since 5.0.0
 */
export interface ActiveDescendantHookOptions<E extends HTMLElement> {
  /**
   * The DOM id for the element. This is required so that the
   * {@link ActiveDescendantContext.activeId} can be updated to the current
   * element as needed.
   */
  id: string;

  /**
   * An optional ref to merge with the ref returned by this hook.
   */
  ref?: Ref<E>;
}

/**
 * @remarks \@since 5.0.0
 */
export interface ActiveDescendantHookReturnValue<E extends HTMLElement> {
  /**
   * A ref handler that **must** be provided to the DOM element for the active
   * descendant movement to work correctly.
   */
  ref: RefCallback<E>;

  /**
   * Boolean if this element is the current focus. This is useful for adding a
   * focus class name since this element actually does not gain focus while
   * active.
   */
  active: boolean;
}

/**
 * @remarks \@since 5.0.0
 */
export function useActiveDescendant<E extends HTMLElement>({
  id,
  ref,
}: ActiveDescendantHookOptions<E>): ActiveDescendantHookReturnValue<E> {
  const { activeId } = useActiveDescendantContext();
  const refCallback = useKeyboardFocusableElement(ref);
  return {
    ref: refCallback,
    active: id === activeId,
  };
}
