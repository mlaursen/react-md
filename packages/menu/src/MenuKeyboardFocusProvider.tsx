import type { ReactElement, ReactNode } from "react";
import { KeyboardMovementProvider } from "@react-md/utils";

import type { MenuOrientationProps } from "./types";

/** @remarks \@since 5.0.0 */
export interface MenuKeyboardFocusProviderProps extends MenuOrientationProps {
  children: ReactNode;
}

/** @remarks \@since 5.0.0 */
export function MenuKeyboardFocusProvider({
  horizontal = false,
  children,
}: MenuKeyboardFocusProviderProps): ReactElement {
  return (
    <KeyboardMovementProvider
      loopable
      searchable
      incrementKeys={horizontal ? ["ArrowRight"] : ["ArrowDown"]}
      decrementKeys={horizontal ? ["ArrowLeft"] : ["ArrowUp"]}
      // disabled menu items should be focusable, but not interactable for some
      // reason
      // https://www.w3.org/TR/wai-aria-practices/#menu
      includeDisabled
    >
      {children}
    </KeyboardMovementProvider>
  );
}
