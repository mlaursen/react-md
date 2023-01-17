import type { KeyboardMovementContext } from "@react-md/core";
import { KeyboardMovementProvider } from "@react-md/core";
import type { ReactElement, ReactNode } from "react";

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
