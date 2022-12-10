import { createContext, useContext, useMemo, useRef, useState } from "react";
import { getFocusableElements as defaultGetFocusableElements } from "../focus";
import { useUserInteractionMode } from "../interaction";
import { useDir } from "../typography/WritingDirection";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import {
  DEFAULT_KEYBOARD_MOVEMENT,
  DEFAULT_LTR_KEYBOARD_MOVEMENT,
  DEFAULT_RTL_KEYBOARD_MOVEMENT,
} from "./constants";
import { findMatchIndex } from "./findMatchIndex";
import type {
  KeyboardMovementConfig,
  KeyboardMovementConfiguration,
  KeyboardMovementContext,
  KeyboardMovementProviderImplementation,
  KeyboardMovementProviderOptions,
} from "./types";
import {
  getFirstFocusableIndex,
  getLastFocusableIndex,
  getNextFocusableIndex,
  getSearchText,
  getVirtualFocusDefaultIndex,
  isElementDisabled,
  isNotFocusable,
  recalculateFocusIndex,
} from "./utils";

/**
 * @remarks \@since 5.0.0
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
 * @remarks \@since 5.0.0
 * @internal
 */
export function useKeyboardMovementContext(): Readonly<KeyboardMovementContext> {
  return useContext(context);
}

const noop = (): void => {
  // do nothing
};

/**
 * Implements the custom keyboard movement behavior throughout react-md. Using
 * the "Find References" will be the best way to see example usage.
 *
 * @example
 * Default Keyboard Movement for any Focusable Element
 * ```tsx
 * import {
 *   KeyboardMovementProvider,
 *   useKeyboardMovementProvider,
 * } from "@react-md/core";
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
 * @example
 * Active Descendant Movement
 * ```tsx
 * import {
 *   KeyboardMovementProvider,
 *   useKeyboardMovementContext,
 *   useKeyboardMovementProvider,
 * } from "@react-md/core";
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
 * @example
 * Roving Tab Index
 * ```tsx
 * import {
 *   KeyboardMovementProvider,
 *   useKeyboardMovementContext,
 *   useKeyboardMovementProvider,
 * } from "@react-md/core";
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
 * @remarks \@since 6.0.0
 * @internal
 */
export function useKeyboardMovementProvider<E extends HTMLElement>(
  options: KeyboardMovementProviderOptions<E> = {}
): KeyboardMovementProviderImplementation<E> {
  const {
    onFocus = noop,
    onKeyDown = noop,
    loopable = false,
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
    getDefaultFocusedIndex,
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

  return {
    movementProps: {
      "aria-activedescendant":
        tabIndexBehavior === "virtual" ? activeDescendantId : undefined,
      tabIndex:
        tabIndexBehavior === "roving"
          ? activeDescendantId
            ? -1
            : 0
          : undefined,
      onFocus(event) {
        onFocus(event);
        if (event.isPropagationStopped() || refocus.current) {
          refocus.current = false;
          return;
        }

        // This makes it so you can click an element with a mouse and then
        // keyboard navigate from that element instead of the last keyboard focus
        // element
        if (event.target !== event.currentTarget) {
          const focusables = getFocusableElements(
            event.currentTarget,
            programmatic
          );
          const focusedIndex = focusables.findIndex(
            (element) => element === event.target
          );
          if (focusedIndex === -1) {
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
            event.currentTarget.focus();
          }

          onFocusChange({
            index: focusedIndex,
            element: focused,
          });
          return;
        }

        if (mode !== "keyboard") {
          return;
        }

        const focusables = getFocusableElements(
          event.currentTarget,
          programmatic
        );

        let defaultFocusIndex: number;
        if (typeof getDefaultFocusedIndex === "function") {
          defaultFocusIndex = getDefaultFocusedIndex({
            focusables,
            includeDisabled,
          });
        } else if (tabIndexBehavior === "virtual") {
          // virtual keyboard navigation **must** always focus at least one element
          defaultFocusIndex = getVirtualFocusDefaultIndex({
            focusables,
            activeDescendantId,
          });
        } else {
          defaultFocusIndex = getFirstFocusableIndex({
            focusables,
            includeDisabled,
          });
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
        }

        onFocusChange({
          index: defaultFocusIndex,
          element: focused,
        });
      },
      onKeyDown(event) {
        onKeyDown(event);
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
        if (currentFocusIndex.current === -1) {
          currentFocusIndex.current = recalculateFocusIndex({
            focusables: getFocusableElements(currentTarget, programmatic),
            tabIndexBehavior,
            activeDescendantId,
          });
        }

        const { key, altKey, ctrlKey, metaKey, shiftKey } = event;
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

        if (
          searchable &&
          key.length === 1 &&
          // can't search with space since it is generally a click event
          key !== " " &&
          !altKey &&
          !ctrlKey &&
          !metaKey
        ) {
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
  };
}
