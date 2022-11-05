import { createContext, useContext, useMemo, useRef, useState } from "react";
import { getFocusableElements } from "../focus";
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
  isNotFocusable,
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

export function useKeyboardMovementProvider<E extends HTMLElement>(
  options: KeyboardMovementProviderOptions<E> = {}
): KeyboardMovementProviderImplementation<E> {
  const {
    onFocus,
    onKeyDown,
    loopable = false,
    searchable = false,
    horizontal = false,
    includeDisabled = false,
    tabIndexBehavior,
    programmatic = includeDisabled,
    incrementKeys: propIncrementKeys,
    decrementKeys: propDecrementKeys,
    jumpToFirstKeys: propJumpToFirstKeys,
    jumpToLastKeys: propJumpToLastKeys,
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
        onFocus?.(event);
        if (event.isPropagationStopped()) {
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

          if (tabIndexBehavior) {
            setActiveDescendantId(focusables[focusedIndex].id);
          }
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
      },
      onKeyDown(event) {
        onKeyDown?.(event);
        if (event.isPropagationStopped()) {
          return;
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

          const focusables = getFocusableElements(
            event.currentTarget,
            programmatic
          );
          const activeElement = focusables[currentFocusIndex.current];
          const disabled = activeElement?.getAttribute("aria-disabled");
          if ((!disabled && disabled === "") || disabled === "true") {
            return;
          }

          activeElement.focus();
          activeElement.click();
          // const activeElement = document.getElementById(activeDescendantId);
          // need to focus first because the useElementInteraction calls
          // event.stopPropagation() for maybe preventing bulbbing ripples?
          // maybe I can remove that
          // activeElement?.focus();
          // activeElement?.click();
          return;
        }

        const {
          incrementKeys,
          decrementKeys,
          jumpToFirstKeys,
          jumpToLastKeys,
        } = config.current;
        const update = (
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
        };

        if (
          searchable &&
          key.length === 1 &&
          // can't search with space since it is generally a click event
          key !== " " &&
          !altKey &&
          !ctrlKey &&
          !metaKey
        ) {
          const focusables = getFocusableElements(
            event.currentTarget,
            programmatic
          );
          const index = findMatchIndex({
            value: key,
            values: focusables.map((element) =>
              getSearchText(element, !isNotFocusable(element, includeDisabled))
            ),
            startIndex: shiftKey ? -1 : currentFocusIndex.current,
          });
          update(index, focusables);
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
        const focusables = getFocusableElements(
          event.currentTarget,
          programmatic
        );

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

        update(index, focusables);
      },
    },
    movementContext,
  };
}
