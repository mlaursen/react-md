"use client";
import {
  createContext,
  useContext,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";
import { type SheetPosition, type SheetVerticalSize } from "../sheet/styles.js";

/** @since 5.0.0 */
export interface MenuOrientationProps {
  /**
   * Boolean if the menu should be rendered horizontally instead of vertically.
   * This will also update the `aria-orientation`.
   *
   * @defaultValue `false`
   */
  horizontal?: boolean;
}

/**
 * This allows the menu to be conditionally rendered as a `Sheet` instead of a
 * menu.
 *
 * - `false` - always render as a `Menu`
 * - `true` - always render as a `Sheet`
 * - `"phone"` - render as a sheet only when the {@link AppSize} is considered
 *   phone (`isPhone === true`).
 *
 * @defaultValue `false`
 * @since 5.0.0
 */
export type RenderMenuAsSheet = boolean | "phone";

/** @since 5.0.0 */
export interface MenuConfiguration extends MenuOrientationProps {
  /** {@inheritDoc RenderMenuAsSheet} */
  renderAsSheet?: RenderMenuAsSheet;

  /**
   * @see {@link SheetPosition}
   * @defaultValue `"bottom"`
   */
  sheetPosition?: SheetPosition;

  /**
   * @see {@link SheetVerticalSize}
   * @defaultValue `"touch"`
   */
  sheetVerticalSize?: SheetVerticalSize;

  /**
   * Any children to render above the sheet's menu implementation. This would
   * normally be something like a `<DialogHeader>` or `AppBar`.
   *
   * @defaultValue `null`
   */
  sheetHeader?: ReactNode;

  /**
   * Any children to render below the sheet's menu implementation. This would
   * normally be something like a `<DialogFooter>`.
   *
   * @defaultValue `null`
   */
  sheetFooter?: ReactNode;
}

/** @since 5.0.0 */
export type MenuConfigurationContext = Required<MenuConfiguration>;

/** @since 5.0.0 */
export const DEFAULT_MENU_CONFIGURATION: Readonly<MenuConfiguration> = {
  horizontal: false,
  renderAsSheet: false,
  sheetHeader: null,
  sheetFooter: null,
  sheetPosition: "bottom",
  sheetVerticalSize: "touch",
};

/**
 * @internal
 * @since 5.0.0
 */
const context = createContext<MenuConfigurationContext>({
  horizontal: false,
  renderAsSheet: false,
  sheetHeader: null,
  sheetFooter: null,
  sheetPosition: "bottom",
  sheetVerticalSize: "touch",
});
context.displayName = "MenuConfiguration";

/**
 * @internal
 * @since 5.0.0
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
 * @since 5.0.0
 */
export function useMenuConfiguration(
  overrides: MenuConfiguration = {}
): Readonly<MenuConfigurationContext> {
  const {
    horizontal,
    renderAsSheet,
    sheetHeader,
    sheetFooter,
    sheetPosition,
    sheetVerticalSize,
  } = overrides;
  const inherited = useContext(context);

  return {
    horizontal: horizontal ?? inherited.horizontal,
    renderAsSheet: renderAsSheet ?? inherited.renderAsSheet,
    sheetHeader:
      sheetHeader === null ? null : (sheetHeader ?? inherited.sheetHeader),
    sheetFooter:
      sheetFooter === null ? null : (sheetFooter ?? inherited.sheetFooter),
    sheetPosition: sheetPosition ?? inherited.sheetPosition,
    sheetVerticalSize: sheetVerticalSize ?? inherited.sheetVerticalSize,
  };
}

/** @since 5.0.0 */
export interface MenuConfigurationProviderProps extends MenuConfiguration {
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * Note: This will always merge values with any parent
 * `MenuConfigurationProvider`s.
 *
 * @since 5.0.0
 */
export function MenuConfigurationProvider(
  props: MenuConfigurationProviderProps
): ReactElement {
  const { children, ...configuration } = props;
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
