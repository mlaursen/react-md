"use client";
import type { ReactElement, ReactNode } from "react";
import type { KeyboardMovementContext } from "../movement";
import { KeyboardMovementProvider } from "../movement";

/**
 * @remarks \@since 6.0.0
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
 * @remarks \@since 6.0.0
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
