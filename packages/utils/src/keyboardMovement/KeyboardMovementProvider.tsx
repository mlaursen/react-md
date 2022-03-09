import type { ReactElement, ReactNode } from "react";
import { useMemo, useRef } from "react";

import {
  DEFAULT_KEYBOARD_MOVEMENT,
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
 *   const { onKeyDown } = useKeyboardFocus();
 *   return (
 *     <div onKeyDown={onKeyDown}>
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
  includeDisabled = false,
  incrementKeys = DEFAULT_KEYBOARD_MOVEMENT.incrementKeys,
  decrementKeys = DEFAULT_KEYBOARD_MOVEMENT.decrementKeys,
  jumpToFirstKeys = DEFAULT_KEYBOARD_MOVEMENT.jumpToFirstKeys,
  jumpToLastKeys = DEFAULT_KEYBOARD_MOVEMENT.jumpToLastKeys,
}: KeyboardMovementProviderProps): ReactElement {
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
      includeDisabled: includeDisabled,
    }),
    [includeDisabled, loopable, searchable]
  );

  return (
    <KeyboardMovementContextProvider value={value}>
      {children}
    </KeyboardMovementContextProvider>
  );
}
