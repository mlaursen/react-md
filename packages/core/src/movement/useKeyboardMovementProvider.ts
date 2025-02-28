"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { getFocusableElements as defaultGetFocusableElements } from "../focus/utils.js";
import { useUserInteractionMode } from "../interaction/UserInteractionModeProvider.js";
import { useDir } from "../typography/WritingDirectionProvider.js";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
import {
  DEFAULT_KEYBOARD_MOVEMENT,
  DEFAULT_LTR_KEYBOARD_MOVEMENT,
  DEFAULT_RTL_KEYBOARD_MOVEMENT,
} from "./constants.js";
import { findMatchIndex } from "./findMatchIndex.js";
import type {
  KeyboardMovementConfig,
  KeyboardMovementConfiguration,
  KeyboardMovementContext,
  KeyboardMovementProviderImplementation,
  KeyboardMovementProviderOptions,
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

/**
 * @since 5.0.0
 * @internal
 */
const context = createContext<KeyboardMovementContext>({
  config: { current: DEFAULT_KEYBOARD_MOVEMENT },
  loopable: false,
  searchable: false,
  horizontal: false,
  includeDisabled: false,
  tabIndexBehavior: undefined,
  activeDescendantId: "",
});
context.displayName = "KeyboardMovement";
export const { Provider: KeyboardMovementProvider } = context;

/**
 * @since 5.0.0
 * @internal
 */
export function useKeyboardMovementContext(): Readonly<KeyboardMovementContext> {
  return useContext(context);
}

const noop = (): void => {
  // do nothing
};

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
    onClick = noop,
    onFocus = noop,
    onKeyDown = noop,
    loopable = false,
    disabled,
    searchable = false,
    horizontal = false,
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

  const [activeDescendantId, setActiveDescendantId] = useState("");
  const movementContext = useMemo<KeyboardMovementContext>(
    () => ({
      config,
      loopable,
      searchable,
      horizontal,
      includeDisabled,
      tabIndexBehavior,
      activeDescendantId,
    }),
    [
      activeDescendantId,
      horizontal,
      includeDisabled,
      loopable,
      searchable,
      tabIndexBehavior,
    ]
  );
  const currentFocusIndex = useRef(-1);
  const mode = useUserInteractionMode();
  const refocus = useRef(false);

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

  return {
    movementProps: {
      "aria-activedescendant":
        tabIndexBehavior === "virtual" ? activeDescendantId : undefined,
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
          if (currentFocusIndex.current === index || index === -1) {
            return;
          }

          currentFocusIndex.current = index;
          const focused = focusables[index];
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

          onFocusChange({
            index,
            element: focused,
          });
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
          const focusables = getFocusableElements(currentTarget, programmatic);
          const index = findMatchIndex({
            value: key,
            values: focusables.map((element) =>
              getSearchText(element, !isNotFocusable(element, includeDisabled))
            ),
            startIndex: shiftKey ? -1 : currentFocusIndex.current,
          });
          setFocusIndex(index, focusables);
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

        if (!jumpToFirst && !jumpToLast && !increment && !decrement) {
          return;
        }
        const focusables = getFocusableElements(currentTarget, programmatic);

        let index: number;
        if (jumpToFirst) {
          index = getFirstFocusableIndex({
            focusables,
            includeDisabled,
          });
        } else if (jumpToLast) {
          index = getLastFocusableIndex({
            focusables,
            includeDisabled,
          });
        } else {
          index = getNextFocusableIndex({
            loopable,
            increment,
            focusables,
            includeDisabled,
            currentFocusIndex: currentFocusIndex.current,
          });
        }

        setFocusIndex(index, focusables);
      },
    },
    movementContext,
    currentFocusIndex,
    activeDescendantId,
    setActiveDescendantId,
  };
}
