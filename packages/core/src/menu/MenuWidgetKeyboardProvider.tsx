"use client";
import { type ReactElement, type ReactNode } from "react";
import { type KeyboardMovementContext } from "../movement/types.js";
import { KeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";

/**
 * @since 6.0.0
 * @internal
 */
export interface MenuWidgetKeyboardProviderProps {
  value: Readonly<KeyboardMovementContext>;
  disabled: boolean;
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * @since 6.0.0
 * @internal
 */
export function MenuWidgetKeyboardProvider(
  props: MenuWidgetKeyboardProviderProps
): ReactElement {
  const { value, disabled, children } = props;
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <KeyboardMovementProvider value={value}>
      {children}
    </KeyboardMovementProvider>
  );
}
