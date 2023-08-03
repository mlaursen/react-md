"use client";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type { NonNullMutableRef, UseStateObject } from "../types";

/**
 * @remarks
 * \@since 5.0.0
 * \@since 6.0.0 Added the `defaultFocusIndex` ref.
 */
export interface MenuVisibilityContext
  extends UseStateObject<"visible", boolean> {
  defaultFocusIndex: NonNullMutableRef<number>;
}

/**
 * @internal
 * @remarks \@since 5.0.0
 */
const context = createContext<MenuVisibilityContext>({
  visible: false,
  setVisible() {
    throw new Error('"MenuVisibilityProvider" must be a parent component');
  },
  defaultFocusIndex: { current: 0 },
});
context.displayName = "MenuVisibility";

/**
 * @internal
 * @remarks \@since 5.0.0
 */
const { Provider } = context;

/**
 * This hook allows you control the visibility of a parent menu. The main
 * use-case for this hook is adding a custom sheet header/footer.
 *
 * @example
 * Simple Example
 * ```tsx
 * function SheetFooter(): ReactElement {
 *   const { setVisible } = useMenuVisibility();
 *
 *   return (
 *     <DialogFooter>
 *       <Button onClick={() => setVisible(false)}>Cancel</Button>
 *     </DialogFooter>
 *   );
 * }
 * ```
 *
 * @returns the {@link MenuVisibilityContext}
 * @remarks \@since 5.0.0
 */
export function useMenuVisibility(): Readonly<MenuVisibilityContext> {
  return useContext(context);
}

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export interface MenuVisibilityProviderProps extends MenuVisibilityContext {
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * @internal
 * @remarks \@since 5.0.0
 */
export function MenuVisibilityProvider({
  visible,
  setVisible,
  defaultFocusIndex,
  children,
}: MenuVisibilityProviderProps): ReactElement {
  const value = useMemo<MenuVisibilityContext>(
    () => ({
      visible,
      setVisible,
      defaultFocusIndex,
    }),
    [visible, setVisible, defaultFocusIndex]
  );

  return <Provider value={value}>{children}</Provider>;
}
