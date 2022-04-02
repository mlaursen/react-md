import type { ReactElement, ReactNode } from "react";
import { useMemo, useRef } from "react";

import { useDir } from "../Dir";
import {
  DEFAULT_KEYBOARD_MOVEMENT,
  DEFAULT_LTR_KEYBOARD_MOVEMENT,
  DEFAULT_RTL_KEYBOARD_MOVEMENT,
  KeyboardMovementContextProvider,
} from "./movementContext";
import type {
  KeyboardFocusContext,
  KeyboardFocusElementData,
  KeyboardMovementBehavior,
  KeyboardMovementConfig,
  KeyboardMovementConfiguration,
} from "./types";
import { getSearchText } from "./utils";

/**
 * @remarks \@since 5.0.0
 */
export interface KeyboardMovementProviderProps
  extends KeyboardMovementBehavior,
    KeyboardMovementConfiguration {
  children: ReactNode;
}

/**
 * @example
 * Main Usage
 * ```tsx
 * function Example() {
 *   return (
 *     <KeyboardMovementProvider>
 *       <CustomKeyboardFocusWidget />
 *     </KeyboardMovementProvider>
 *   );
 * }
 *
 * function CustomKeyboardFocusWidget() {
 *   const { focusIndex: _focusIndex, ...eventHandlers } = useKeyboardFocus();
 *   return (
 *     <div {...eventHandlers}>
 *       <FocusableChild />
 *       <FocusableChild />
 *       <FocusableChild />
 *       <FocusableChild />
 *     </div>
 *   );
 * }
 *
 * function FocusableChild() {
 *   const refCallback = useKeyboardFocusableElement()
 *
 *   return <div role="menuitem" tabIndex={-1} ref={refCallback}>Content</div>;
 * }
 * ```
 *
 * @remarks \@since 5.0.0
 */
export function KeyboardMovementProvider({
  children,
  loopable = false,
  searchable = false,
  horizontal = false,
  includeDisabled = false,
  incrementKeys: propIncrementKeys,
  decrementKeys: propDecrementKeys,
  jumpToFirstKeys: propJumpToFirstKeys,
  jumpToLastKeys: propJumpToLastKeys,
}: KeyboardMovementProviderProps): ReactElement {
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

  const watching = useRef<KeyboardFocusElementData[]>([]);
  const configuration: KeyboardMovementConfig = {
    incrementKeys,
    decrementKeys,
    jumpToFirstKeys,
    jumpToLastKeys,
  };
  const config = useRef(configuration);
  config.current = configuration;

  const value = useMemo<KeyboardFocusContext>(
    () => ({
      attach(element) {
        watching.current.push({
          element,
          content: getSearchText(element, searchable),
        });
      },
      detach(element) {
        watching.current = watching.current.filter(
          (cache) => cache.element !== element
        );
      },
      watching,
      config,
      loopable,
      searchable,
      horizontal,
      includeDisabled: includeDisabled,
    }),
    [horizontal, includeDisabled, loopable, searchable]
  );

  return (
    <KeyboardMovementContextProvider value={value}>
      {children}
    </KeyboardMovementContextProvider>
  );
}
