"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { getFocusableElements as defaultGetFocusableElements } from "../focus/utils.js";
import { useUserInteractionMode } from "../interaction/UserInteractionModeProvider.js";
import { useDir } from "../typography/WritingDirectionProvider.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
import {
  DEFAULT_KEYBOARD_MOVEMENT,
  DEFAULT_LTR_KEYBOARD_MOVEMENT,
  DEFAULT_RTL_KEYBOARD_MOVEMENT,
} from "./constants.js";
import { findMatchIndex } from "./findMatchIndex.js";
import {
  type KeyboardFocusFromKeyOptions,
  type KeyboardMovementConfig,
  type KeyboardMovementConfiguration,
  type KeyboardMovementContext,
  type KeyboardMovementProviderImplementation,
  type KeyboardMovementProviderOptions,
  type KeyboardMovementUpdateFocusIndexOptions,
} from "./types.js";
import {
  getFirstFocusableIndex,
  getLastFocusableIndex,
  getNextFocusableIndex,
  getSearchText,
  getVirtualFocusDefaultIndex,
  isElementDisabled,
  isNotFocusable,
  isSearchableEvent,
  recalculateFocusIndex,
} from "./utils.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.3.0
 */
export const DEFAULT_KEYBOARD_MOVEMENT_CONTEXT: Readonly<KeyboardMovementContext> =
  {
    config: { current: DEFAULT_KEYBOARD_MOVEMENT },
    loopable: false,
    searchable: false,
    horizontal: false,
    includeDisabled: false,
    tabIndexBehavior: undefined,
    activeDescendantId: "",
    focusFirst: noop,
    focusLast: noop,
    focusNext: noop,
    focusPrevious: noop,
    focusFromKey: noop,
    focusCurrent: (): undefined => {},
    updateFocusIndex: noop,
  };

/**
 * @since 5.0.0
 * @internal
 */
const context = createContext<KeyboardMovementContext>(
  DEFAULT_KEYBOARD_MOVEMENT_CONTEXT
);
context.displayName = "KeyboardMovement";
export const { Provider: KeyboardMovementProvider } = context;

/**
 * @since 5.0.0
 * @internal
 */
export function useKeyboardMovementContext(): Readonly<KeyboardMovementContext> {
  return useContext(context);
}

const returnNegative1 = (): number => -1;

/**
 * Implements the custom keyboard movement behavior throughout react-md. Using
 * the "Find References" will be the best way to see example usage.
 *
 * @example Default Keyboard Movement for any Focusable Element
 * ```tsx
 * import {
 *   KeyboardMovementProvider,
 *   useKeyboardMovementProvider,
 * } from "@react-md/core/movement/useKeyboardMovementProvider";
 * import type { ReactElement, ReactNode } from "react";
 *
 * function Example({ children }: { children: ReactNode }): ReactElement {
 *   const { movementContext, movementProps } = useKeyboardMovementProvider();
 *
 *   // any focusable element child can be focused with the arrow , home, and
 *   // end keys
 *   return (
 *     <KeyboardMovementProvider value={movementContext}>
 *       <div {...movementProps}>
 *         {children}
 *       </div>
 *     </KeyboardMovementProvider>
 *   );
 * }
 * ```
 *
 * @example Active Descendant Movement
 * ```tsx
 * import {
 *   KeyboardMovementProvider,
 *   useKeyboardMovementContext,
 *   useKeyboardMovementProvider,
 * } from "@react-md/core/movement/useKeyboardMovementProvider";
 * import type { ReactElement, ReactNode } from "react";
 * import { useId } from "react";
 *
 * function Child(): ReactElement {
 *   const id = useId()
 *   const { activeDescendantId } = useKeyboardMovementContext();
 *
 *   return (
 *     <div
 *       {...props}
 *       id={id}
 *       className={cnb(id === activeDescendantId && "focused-class-name")}
 *     >
 *       Some Content
 *     </div>
 *   );
 * }
 *
 * function Example({ children }: { children: ReactNode }): ReactElement {
 *   const { movementContext, movementProps } = useKeyboardMovementProvider({
 *     loopable: true,
 *     searchable: true,
 *     tabIndexBehavior: "virtual",
 *   });
 *
 *   // any focusable element child can be focused with the arrow , home, and
 *   // end keys
 *   return (
 *     <KeyboardMovementProvider value={movementContext}>
 *       <div {...movementProps}>
 *         <Child />
 *         <Child />
 *         <Child />
 *       </div>
 *     </KeyboardMovementProvider>
 *   );
 * }
 * ```
 *
 * @example Roving Tab Index
 * ```tsx
 * import {
 *   KeyboardMovementProvider,
 *   useKeyboardMovementContext,
 *   useKeyboardMovementProvider,
 * } from "@react-md/core/movement/useKeyboardMovementProvider";
 * import type { ReactElement, ReactNode } from "react";
 * import { useId } from "react";
 *
 * function Child(): ReactElement {
 *   const id = useId()
 *   const { activeDescendantId } = useKeyboardMovementContext();
 *
 *   return (
 *     <div
 *       {...props}
 *       id={id}
 *       tabIndex={id === activeDescendantId ? 0 : -1}
 *     >
 *       Some Content
 *     </div>
 *   );
 * }
 *
 * function Example({ children }: { children: ReactNode }): ReactElement {
 *   const { movementContext, movementProps } = useKeyboardMovementProvider({
 *     loopable: true,
 *     searchable: true,
 *     tabIndexBehavior: "roving",
 *   });
 *
 *   // any focusable element child can be focused with the arrow , home, and
 *   // end keys
 *   return (
 *     <KeyboardMovementProvider value={movementContext}>
 *       <div {...movementProps}>
 *         <Child />
 *         <Child />
 *         <Child />
 *       </div>
 *     </KeyboardMovementProvider>
 *   );
 * }
 * ```
 * @since 6.0.0
 * @internal
 */
export function useKeyboardMovementProvider<E extends HTMLElement>(
  options: KeyboardMovementProviderOptions<E> = {}
): KeyboardMovementProviderImplementation<E> {
  const {
    ref: propRef,
    onClick = noop,
    onFocus = noop,
    onKeyDown = noop,
    loopable = false,
    disabled,
    searchable = false,
    horizontal = false,
    trackTabKeys = false,
    includeDisabled = false,
    tabIndexBehavior,
    extendKeyDown = noop,
    onFocusChange = noop,
    programmatic = includeDisabled,
    incrementKeys: propIncrementKeys,
    decrementKeys: propDecrementKeys,
    jumpToFirstKeys: propJumpToFirstKeys,
    jumpToLastKeys: propJumpToLastKeys,
    getFocusableElements = defaultGetFocusableElements,
    getDefaultFocusedIndex = returnNegative1,
    isNegativeOneAllowed = false,
  } = options;

  const [nodeRef, nodeRefCallback] = useEnsuredRef(propRef);

  const isRTL = useDir().dir === "rtl";
  let defaults: Readonly<Required<KeyboardMovementConfiguration>>;
  if (horizontal) {
    defaults = isRTL
      ? DEFAULT_RTL_KEYBOARD_MOVEMENT
      : DEFAULT_LTR_KEYBOARD_MOVEMENT;
  } else {
    defaults = DEFAULT_KEYBOARD_MOVEMENT;
  }

  const incrementKeys = propIncrementKeys || defaults.incrementKeys;
  const decrementKeys = propDecrementKeys || defaults.decrementKeys;
  const jumpToFirstKeys = propJumpToFirstKeys || defaults.jumpToFirstKeys;
  const jumpToLastKeys = propJumpToLastKeys || defaults.jumpToLastKeys;

  const configuration: KeyboardMovementConfig = {
    incrementKeys,
    decrementKeys,
    jumpToFirstKeys,
    jumpToLastKeys,
  };
  const config = useRef(configuration);
  useIsomorphicLayoutEffect(() => {
    config.current = configuration;
  });

  const mode = useUserInteractionMode();
  const refocus = useRef(false);
  const currentFocusIndex = useRef(-1);
  const [activeDescendantId, setActiveDescendantId] = useState("");

  if (process.env.NODE_ENV !== "production") {
    // this fixes issues during hot reloading and using the `useId()` hook
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      return () => {
        setActiveDescendantId("");
      };
    }, []);
  }

  let tabIndex: number | undefined;
  if (tabIndexBehavior) {
    tabIndex =
      disabled || (tabIndexBehavior === "roving" && activeDescendantId)
        ? -1
        : 0;
  }

  const getFocusableElementsFromRef = useCallback(() => {
    const container = nodeRef.current;
    if (!container) {
      return [];
    }

    return getFocusableElements(container, programmatic);
  }, [getFocusableElements, nodeRef, programmatic]);
  const focusCurrent = useCallback(
    (focusables = getFocusableElementsFromRef()): HTMLElement | undefined => {
      const index = currentFocusIndex.current;
      if (index === -1) {
        return;
      }

      const focused = focusables[index];
      if (!focused) {
        return;
      }

      if (tabIndexBehavior) {
        focused.scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
        setActiveDescendantId(focused.id);
      }

      if (tabIndexBehavior !== "virtual") {
        focused.focus();
      }

      return focused;
    },
    [getFocusableElementsFromRef, tabIndexBehavior]
  );
  const updateFocusIndex = useCallback(
    (options: KeyboardMovementUpdateFocusIndexOptions) => {
      const {
        index,
        force,
        focusables = getFocusableElementsFromRef(),
      } = options;
      const isSameIndex = currentFocusIndex.current === index;
      if ((!force && isSameIndex) || index === -1) {
        return;
      }

      currentFocusIndex.current = index;
      const focused = focusCurrent(focusables);
      if (focused && !isSameIndex) {
        onFocusChange({
          index,
          element: focused,
        });
      }
    },
    [focusCurrent, getFocusableElementsFromRef, onFocusChange]
  );

  const focusNext = useCallback(
    (focusables = getFocusableElementsFromRef(), force = false) => {
      updateFocusIndex({
        index: getNextFocusableIndex({
          loopable,
          increment: true,
          focusables,
          includeDisabled: true,
          currentFocusIndex: currentFocusIndex.current,
        }),
        force,
        focusables,
      });
    },
    [getFocusableElementsFromRef, loopable, updateFocusIndex]
  );
  const focusPrevious = useCallback(
    (focusables = getFocusableElementsFromRef(), force = false) => {
      updateFocusIndex({
        index: getNextFocusableIndex({
          loopable,
          increment: false,
          focusables,
          includeDisabled: true,
          currentFocusIndex: currentFocusIndex.current,
        }),
        force,
        focusables,
      });
    },
    [getFocusableElementsFromRef, loopable, updateFocusIndex]
  );
  const focusFirst = useCallback(
    (focusables = getFocusableElementsFromRef(), force = false) => {
      updateFocusIndex({
        index: getFirstFocusableIndex({
          focusables,
          includeDisabled,
        }),
        force,
        focusables,
      });
    },
    [getFocusableElementsFromRef, includeDisabled, updateFocusIndex]
  );
  const focusLast = useCallback(
    (focusables = getFocusableElementsFromRef(), force = false) => {
      updateFocusIndex({
        index: getLastFocusableIndex({
          focusables,
          includeDisabled,
        }),
        force,
        focusables,
      });
    },
    [getFocusableElementsFromRef, includeDisabled, updateFocusIndex]
  );
  const focusFromKey = useCallback(
    (options: KeyboardFocusFromKeyOptions) => {
      const {
        key,
        force,
        reversed,
        focusables = getFocusableElementsFromRef(),
      } = options;
      if (!searchable) {
        return;
      }

      const index = findMatchIndex({
        value: key,
        values: focusables.map((element) =>
          getSearchText(element, !isNotFocusable(element, includeDisabled))
        ),
        startIndex: reversed ? -1 : currentFocusIndex.current,
      });
      updateFocusIndex({ index, force, focusables });
    },
    [getFocusableElementsFromRef, includeDisabled, searchable, updateFocusIndex]
  );

  const movementContext = useMemo<KeyboardMovementContext>(
    () => ({
      config,
      loopable,
      searchable,
      horizontal,
      focusFirst,
      focusLast,
      focusNext,
      focusPrevious,
      focusFromKey,
      focusCurrent,
      updateFocusIndex,
      includeDisabled,
      tabIndexBehavior,
      activeDescendantId,
    }),
    [
      activeDescendantId,
      focusCurrent,
      focusFirst,
      focusFromKey,
      focusLast,
      focusNext,
      focusPrevious,
      horizontal,
      includeDisabled,
      loopable,
      searchable,
      tabIndexBehavior,
      updateFocusIndex,
    ]
  );

  return {
    nodeRef,
    movementProps: {
      "aria-activedescendant":
        tabIndexBehavior === "virtual" ? activeDescendantId : undefined,
      ref: nodeRefCallback,
      tabIndex,

      // Note: This used to be on the `onFocus` event, but this causes issues in
      // Chromium browsers for drag and drop behavior
      onClick(event) {
        onClick(event);
        if (disabled) {
          return;
        }

        // This makes it so you can click an element with a mouse and then
        // keyboard navigate from that element instead of the last keyboard focus
        // element
        const { currentTarget, target } = event;
        if (target === currentTarget || !(target instanceof HTMLElement)) {
          return;
        }

        const focusables = getFocusableElements(currentTarget, programmatic);
        const focusedIndex = focusables.findIndex(
          (element) => element === target || element.contains(target)
        );
        if (focusedIndex === -1 || !focusables.length) {
          return;
        }

        currentFocusIndex.current = focusedIndex;
        const focused = focusables[focusedIndex];
        if (tabIndexBehavior) {
          setActiveDescendantId(focused.id);
        }

        // need to force focus back to the container element when using
        // aria activedescendant
        if (tabIndexBehavior === "virtual") {
          refocus.current = true;
          currentTarget.focus();
        }

        onFocusChange({
          index: focusedIndex,
          element: focused,
        });
      },
      onFocus(event) {
        onFocus(event);
        if (event.isPropagationStopped() || refocus.current) {
          refocus.current = false;
          return;
        }

        if (
          (mode !== "keyboard" && tabIndexBehavior !== "virtual") ||
          event.target !== event.currentTarget
        ) {
          return;
        }

        const focusables = getFocusableElements(
          event.currentTarget,
          programmatic
        );
        if (!focusables.length) {
          return;
        }

        let defaultFocusIndex = getDefaultFocusedIndex({
          focusables,
          includeDisabled,
        });

        // This allows my custom `getDefaultFocusedIndex` implementations to
        // have a nice fallback without having to re-implement the "focus
        // first" behavior
        if (!isNegativeOneAllowed && defaultFocusIndex === -1) {
          if (tabIndexBehavior === "virtual") {
            // virtual keyboard navigation **must** always focus at least one element
            defaultFocusIndex = getVirtualFocusDefaultIndex({
              focusables,
              includeDisabled,
              activeDescendantId,
            });
          } else {
            defaultFocusIndex = getFirstFocusableIndex({
              focusables,
              includeDisabled,
            });
          }
        }

        if (defaultFocusIndex === -1) {
          return;
        }

        currentFocusIndex.current = defaultFocusIndex;
        const focused = focusables[defaultFocusIndex];
        if (tabIndexBehavior) {
          setActiveDescendantId(focused.id);
        }

        if (tabIndexBehavior !== "virtual") {
          focused.focus();
        } else {
          focused.scrollIntoView({ block: "nearest" });
        }

        onFocusChange({
          index: defaultFocusIndex,
          element: focused,
        });
      },
      onKeyDown(event) {
        onKeyDown(event);
        if (disabled) {
          return;
        }

        const { currentTarget } = event;

        const setFocusIndex = (
          index: number,
          focusables: readonly HTMLElement[]
        ): void => {
          event.preventDefault();
          event.stopPropagation();
          updateFocusIndex({ index, focusables });
        };

        extendKeyDown({
          event,
          setFocusIndex,
          currentFocusIndex,
          setActiveDescendantId,
          ...movementContext,
        });

        if (event.isPropagationStopped()) {
          return;
        }

        // TODO: Figure this part out. This is currently required for the tree
        // movement when the asterisk key is pressed. There might be other cases
        // as well.
        if (!isNegativeOneAllowed && currentFocusIndex.current === -1) {
          currentFocusIndex.current = recalculateFocusIndex({
            focusables: getFocusableElements(currentTarget, programmatic),
            includeDisabled,
            tabIndexBehavior,
            activeDescendantId,
          });
        }

        const { key, shiftKey } = event;
        if (
          tabIndexBehavior === "virtual" &&
          activeDescendantId &&
          (key === " " || key === "Enter")
        ) {
          if (key === " ") {
            event.preventDefault();
          }

          const focusables = getFocusableElements(currentTarget, programmatic);
          const activeElement = focusables[currentFocusIndex.current];
          if (!activeElement || isElementDisabled(activeElement)) {
            return;
          }

          activeElement.click();
          return;
        }

        const {
          incrementKeys,
          decrementKeys,
          jumpToFirstKeys,
          jumpToLastKeys,
        } = config.current;

        if (searchable && isSearchableEvent(event)) {
          event.preventDefault();
          event.stopPropagation();
          focusFromKey({ key, reversed: shiftKey });
          return;
        }

        if (trackTabKeys && key === "Tab") {
          currentFocusIndex.current = getNextFocusableIndex({
            loopable,
            increment: !event.shiftKey,
            focusables: getFocusableElements(currentTarget, programmatic),
            includeDisabled,
            currentFocusIndex: currentFocusIndex.current,
          });
          return;
        }

        const jumpToFirst = jumpToFirstKeys.includes(key);
        const jumpToLast = !jumpToFirst && jumpToLastKeys.includes(key);
        const increment =
          !jumpToFirst && !jumpToLast && incrementKeys.includes(key);
        const decrement =
          !jumpToFirst &&
          !jumpToLast &&
          !increment &&
          decrementKeys.includes(key);

        if (jumpToFirst || jumpToLast || increment || decrement) {
          event.preventDefault();
          event.stopPropagation();
        }

        if (jumpToFirst) {
          focusFirst();
        } else if (jumpToLast) {
          focusLast();
        } else if (increment) {
          focusNext();
        } else if (decrement) {
          focusPrevious();
        }
      },
    },
    movementContext,
    currentFocusIndex,
    activeDescendantId,
    setActiveDescendantId,
  };
}
