import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type { HoverModeHookReturnValue } from "@react-md/utils";

/** @remarks \@since 5.0.0 */
export type MenuVisibilityContext = Pick<
  HoverModeHookReturnValue,
  "visible" | "setVisible"
>;

/**
 * @internal
 * @remarks \@since 5.0.0
 */
const context = createContext<MenuVisibilityContext>({
  visible: false,
  setVisible() {
    throw new Error('"MenuVisibilityProvider" must be a parent component');
  },
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
 * @internal
 * @remarks \@since 5.0.0
 */
export function MenuVisibilityProvider({
  visible,
  setVisible,
  children,
}: MenuVisibilityProviderProps): ReactElement {
  const value = useMemo<MenuVisibilityContext>(
    () => ({
      visible,
      setVisible,
    }),
    [visible, setVisible]
  );

  return <Provider value={value}>{children}</Provider>;
}
