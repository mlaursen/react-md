"use client";
import { useEffect, type PropsWithChildren } from "react";
import { type AppBarProps } from "../app-bar/AppBar.js";
import { type ButtonProps } from "../button/Button.js";
import { getIcon } from "../icon/iconConfig.js";
import { type SheetProps } from "../sheet/Sheet.js";
import { type CssPosition, type UseStateInitializer } from "../types.js";
import { useToggle } from "../useToggle.js";
import { type MainProps } from "./Main.js";

export interface TemporaryLayoutOptions {
  /**
   * This is used to automatically hide the temporary navigation whenever the
   * route changes. Set this to `null` if you want to handle closing yourself.
   */
  pathname: string | null;

  /** @defaultValue `"fixed"` */
  appBarPosition?: CssPosition;

  /** @defaultValue `false` */
  defaultVisible?: UseStateInitializer<boolean>;
}

/**
 * @since 6.0.0
 */
export type ProvidedLayoutNavToggleProps = PropsWithChildren<
  Pick<Required<ButtonProps>, "aria-label" | "buttonType" | "onClick">
>;

/**
 * @since 6.0.0
 */
export type ProvidedTemporaryLayoutNavProps = Pick<
  Required<SheetProps>,
  "aria-label" | "visible" | "onRequestClose"
>;

/**
 * @since 6.0.0
 */
export type ProvidedTemporaryLayoutMainProps = Required<
  Pick<MainProps, "appBarOffset">
>;

/**
 * @since 6.0.0
 */
export type ProvidedTemporaryLayoutAppBarProps = Required<
  Pick<AppBarProps, "position">
>;

/**
 * @since 6.0.0
 */
export interface TemporaryLayoutImplementation {
  visible: boolean;
  showTemporaryNav: () => void;
  hideTemporaryNav: () => void;
  appBarProps: ProvidedTemporaryLayoutAppBarProps;
  mainProps: ProvidedTemporaryLayoutMainProps;
  navToggleProps: ProvidedLayoutNavToggleProps;
  temporaryNavProps: ProvidedTemporaryLayoutNavProps;
}

/**
 * @example
 * ```tsx
 * import {
 *   AppBar,
 *   AppBarTitle,
 *   Button,
 *   Main,
 *   Sheet,
 *   useTemporaryLayout,
 * } from "@react-md/core";
 * import type { ReactElement, ReactNode } from "react";
 *
 * import { CustomNavigation } from "./CustomNavigation.jsx";
 *
 * export interface LayoutProps {
 *   children: ReactNode;
 * }
 *
 * export function Layout(props: LayoutProps): ReactElement {
 *   const { children } = props;
 *
 *   // choose whichever one for your app
 *   // nextjs app dir
 *   const pathname = usePathname();
 *   // nextjs pages
 *   const { pathname } = useRouter();
 *   // react router
 *   const { pathname } = useHistory();
 *
 *   const {
 *     mainProps,
 *     navToggleProps,
 *     temporaryNavProps,
 *   } = useTemporaryLayout({ pathname });
 *
 *   return (
 *     <>
 *       <AppBar position="fixed">
 *         <Button {...navToggleProps} />
 *         <AppBarTitle>Hello, world!</AppBarTitle>
 *       </AppBar>
 *       <Main {...mainProps}>{children}</Main>
 *       <Sheet {...temporaryNavProps}>
 *         <CustomNavigation />
 *       </Sheet>
 *     </>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useTemporaryLayout(
  options: TemporaryLayoutOptions
): TemporaryLayoutImplementation {
  const {
    pathname,
    defaultVisible = false,
    appBarPosition = "fixed",
  } = options;

  const menuIcon = getIcon("menu");
  const {
    toggled: visible,
    enable: showTemporaryNav,
    disable: hideTemporaryNav,
  } = useToggle(defaultVisible);

  // hide the temporary nav whenever the route changes
  useEffect(() => {
    if (pathname !== null) {
      hideTemporaryNav();
    }
  }, [hideTemporaryNav, pathname]);

  return {
    visible,
    showTemporaryNav,
    hideTemporaryNav,
    appBarProps: {
      position: appBarPosition,
    },
    mainProps: {
      appBarOffset: appBarPosition !== "static",
    },
    temporaryNavProps: {
      "aria-label": "Navigation",
      visible,
      onRequestClose: hideTemporaryNav,
    },
    navToggleProps: {
      "aria-label": "Navigation",
      buttonType: "icon",
      children: menuIcon,
      onClick() {
        showTemporaryNav();
      },
    },
  };
}
