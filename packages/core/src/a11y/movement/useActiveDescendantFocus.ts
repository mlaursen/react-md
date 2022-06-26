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
   *
   * @defaultValue `""`
   * @remarks \@since 6.0.0 Supports initializer function.
   */
  defaultActiveId?: string | (() => string);

  /**
   * When the {@link defaultActiveId} is an empty string, this is used to set
   * the {@link ActiveDescendantFocusHookReturnValue.activeId} to one of the
   * focusable elements so that the container element is no longer focused.
   *
   * @defaultValue `0`
   * @remarks \@since 6.0.0
   */
  defaultFocusIndex?: number;
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
export function useActiveDescendantFocus<E extends HTMLElement>(
  options: ActiveDescendantFocusHookOptions<E> = {}
): ActiveDescendantFocusHookReturnValue<E> {
  const {
    defaultActiveId = "",
    defaultFocusIndex = 0,
    ...focusOptions
  } = options;
  const [activeId, setActiveId] = useState(defaultActiveId);

  return {
    ...useKeyboardFocus({
      ...focusOptions,
      onFocusChange(element) {
        setActiveId(element.id);
      },
      getDefaultFocusIndex(elements) {
        if (!activeId) {
          return defaultFocusIndex;
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
