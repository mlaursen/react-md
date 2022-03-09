import { useState } from "react";

import type { ActiveDescendantContext } from "./activeDescendantContext";
import type {
  KeyboardFocusCallbacks,
  KeyboardFocusHookReturnValue,
} from "./useKeyboardFocus";
import { useKeyboardFocus } from "./useKeyboardFocus";

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export interface ActiveDescendantFocusHookOptions<E extends HTMLElement>
  extends KeyboardFocusCallbacks<E> {
  /**
   * An optional DOM id for one of the children that should be focused by
   * default.
   */
  defaultActiveId?: string;
}

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export interface ActiveDescendantFocusHookReturnValue<E extends HTMLElement>
  extends KeyboardFocusHookReturnValue<E> {
  /**
   * The current DOM id of a child that has keyboard focus.
   */
  "aria-activedescendant": string;

  /**
   * An object of props that should be passed to the
   * {@link ActiveDescendantMovementProvider}.
   */
  providerProps: Readonly<ActiveDescendantContext>;
}

/**
 * @see {@link ActiveDescendantMovementProvider} for an example
 * @internal
 * @remarks \@since 5.0.0
 */
export function useActiveDescendantFocus<E extends HTMLElement>({
  defaultActiveId = "",
  ...options
}: ActiveDescendantFocusHookOptions<E> = {}): ActiveDescendantFocusHookReturnValue<E> {
  const [activeId, setActiveId] = useState(defaultActiveId);
  return {
    ...useKeyboardFocus({
      ...options,
      onFocusChange(element) {
        setActiveId(element.id);
      },
      getDefaultFocusIndex(elements) {
        if (!activeId) {
          return -1;
        }

        return elements.findIndex(({ id }) => id === activeId);
      },
    }),
    "aria-activedescendant": activeId,
    providerProps: {
      activeId,
      setActiveId,
    },
  };
}
