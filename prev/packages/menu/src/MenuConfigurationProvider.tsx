import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type { MenuConfiguration, MenuConfigurationContext } from "./types";

/** @remarks \@since 5.0.0 */
export const DEFAULT_MENU_CONFIGURATION: Readonly<MenuConfigurationContext> = {
  horizontal: false,
  renderAsSheet: false,
  sheetHeader: null,
  sheetFooter: null,
  sheetPosition: "bottom",
  sheetVerticalSize: "touch",
};

/**
 * @internal
 * @remarks \@since 5.0.0
 */
const context = createContext<MenuConfigurationContext>(
  DEFAULT_MENU_CONFIGURATION
);
context.displayName = "MenuConfiguration";
/**
 * @internal
 * @remarks \@since 5.0.0
 */
const { Provider } = context;

/**
 * This is probably just an internal only hook that allows you to get the
 * {@link MenuConfigurationContext} with optional overrides.
 *
 * @param overrides - An object of {@link MenuConfiguration} that would override
 * the inherited context values if they are not `undefined`.
 * @returns the {@link MenuConfigurationContext} with any overrides that were
 * provided.
 * @remarks \@since 5.0.0
 */
export function useMenuConfiguration({
  horizontal,
  renderAsSheet,
  sheetHeader,
  sheetFooter,
  sheetPosition,
  sheetVerticalSize,
}: MenuConfiguration = {}): Readonly<MenuConfigurationContext> {
  const inherited = useContext(context);

  return {
    horizontal: horizontal ?? inherited.horizontal,
    renderAsSheet: renderAsSheet ?? inherited.renderAsSheet,
    sheetHeader:
      sheetHeader === null ? null : sheetHeader ?? inherited.sheetHeader,
    sheetFooter:
      sheetFooter === null ? null : sheetFooter ?? inherited.sheetFooter,
    sheetPosition: sheetPosition ?? inherited.sheetPosition,
    sheetVerticalSize: sheetVerticalSize ?? inherited.sheetVerticalSize,
  };
}

/** @remarks \@since 5.0.0 */
export interface MenuConfigurationProviderProps extends MenuConfiguration {
  children: ReactNode;
}

/**
 * Note: This will always merge values with any parent
 * `MenuConfigurationProvider`s.
 *
 * @remarks \@since 5.0.0
 */
export function MenuConfigurationProvider({
  children,
  ...configuration
}: MenuConfigurationProviderProps): ReactElement {
  const {
    horizontal,
    renderAsSheet,
    sheetHeader,
    sheetFooter,
    sheetPosition,
    sheetVerticalSize,
  } = useMenuConfiguration(configuration);

  const value = useMemo<MenuConfigurationContext>(
    () => ({
      horizontal,
      renderAsSheet,
      sheetHeader,
      sheetFooter,
      sheetPosition,
      sheetVerticalSize,
    }),
    [
      horizontal,
      renderAsSheet,
      sheetFooter,
      sheetHeader,
      sheetPosition,
      sheetVerticalSize,
    ]
  );

  return <Provider value={value}>{children}</Provider>;
}
