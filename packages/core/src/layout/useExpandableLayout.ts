"use client";

import { cnb } from "cnbuilder";

import { useSsr } from "../SsrProvider.js";
import { useAppSize } from "../media-queries/AppSizeProvider.js";
import { type CSSTransitionElementProps } from "../transition/types.js";
import { type CssPosition, type UseStateInitializer } from "../types.js";
import { useToggle } from "../useToggle.js";
import { type LayoutNavProps } from "./LayoutNav.js";
import {
  type HorizontalLayoutTransitionOptions,
  useHorizontalLayoutTransition,
} from "./useHorizontalLayoutTransition.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type useResizableLayout } from "./useResizableLayout.js";
import {
  type ProvidedLayoutNavToggleProps,
  type ProvidedTemporaryLayoutAppBarProps,
  type ProvidedTemporaryLayoutMainProps,
  type TemporaryLayoutImplementation,
  type TemporaryLayoutOptions,
  useTemporaryLayout,
} from "./useTemporaryLayout.js";

/**
 * @since 6.0.0
 */
export interface ExpandableLayoutOptions extends TemporaryLayoutOptions {
  /** @defaultValue `"fixed"` */
  appBarPosition?: CssPosition;

  /** @defaultValue `false` */
  defaultExpanded?: UseStateInitializer<boolean>;

  /**
   * Set this to `true` if the expandable navigation should be the full height
   * of the screen. This will also update the app bar so that it is not covered
   * by the navigation. The default behavior is to place the navigation below
   * the fixed header.
   *
   * Set this to `"static"` to make the navigation span the full height of the
   * screen and hide the button until the screen shrinks to the temporary
   * layout type.
   *
   * @defaultValue `false`
   */
  fullHeightNav?: boolean | "static";

  /** @see {@link HorizontalLayoutTransitionOptions} */
  transitionProps?: Omit<HorizontalLayoutTransitionOptions, "transitionIn">;

  /**
   * Set this to `"desktop"` if you want to use the temporary navigation until
   * the viewport is at least desktop width instead of tablet.
   *
   * @defaultValue `"tablet"`
   */
  temporaryUntil?: "tablet" | "desktop";
}

/**
 * @since 6.0.0
 */
export interface ProvidedLayoutMainProps
  extends ProvidedTemporaryLayoutMainProps,
    CSSTransitionElementProps<HTMLElement> {}

/**
 * @since 6.0.0
 */
export type ProvidedLayoutNavProps = Pick<
  LayoutNavProps,
  "expanded" | "appBarOffset"
>;

/**
 * @since 6.0.0
 */
export type ProvidedLayoutAppBarProps = ProvidedTemporaryLayoutAppBarProps &
  Partial<CSSTransitionElementProps<HTMLElement>>;

/**
 * @since 6.0.0
 */
export interface ProvidedExpandableLayoutNavToggleProps
  extends ProvidedLayoutNavToggleProps {
  className: string;
}

/**
 * @since 6.0.0
 */
export interface ExpandableLayoutImplementation
  extends TemporaryLayoutImplementation {
  temporary: boolean;
  persistent: boolean;
  expanded: boolean;
  expandNavigation: () => void;
  collapseNavigation: () => void;
  toggleNavigation: () => void;
  appBarProps: ProvidedLayoutAppBarProps;
  mainProps: ProvidedLayoutMainProps;
  navToggleProps: ProvidedExpandableLayoutNavToggleProps;
  expandableNavProps: ProvidedLayoutNavProps;
}

/**
 * @example Main Usage
 * ```tsx
 * import {
 *   AppBarTitle,
 *   Button,
 *   LayoutAppBar,
 *   LayoutNav,
 *   Main,
 *   Sheet,
 *   useExpandableLayout,
 * } from "@react-md/core";
 * import type { ReactElement, ReactNode } from "react";
 *
 * import { CustomNavigation } from "./CustomNavigation";
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
 *     temporary,
 *     appBarProps,
 *     expandableNavProps,
 *     mainProps,
 *     navToggleProps,
 *     temporaryNavProps,
 *     windowSplitterProps,
 *   } = useExpandableLayout({ pathname });
 *
 *   return {
 *     <>
 *       <LayoutAppBar {...appBarProps}>
 *         <Button {...navToggleProps} />
 *         <AppBarTitle>Hello, world!</AppBarTitle>
 *       </LayoutAppBar>
 *       <LayoutNav {...expandableNavProps}>
 *         <CustomNavigation />
 *       </LayoutNav>
 *       {temporary && (
 *         <Sheet {...temporaryNavProps}>
 *           <CustomNavigation />
 *         </Sheet>
 *       )}
 *       <Main {...mainProps}>{children}</Main>
 *     </>
 *   }
 * }
 * ```
 *
 * If you have a large navigation panel, you can conditionally render the
 * `LayoutNav` with the `persistent` boolean returned by the hook which will
 * ensure that the DOM has rehydrated before unmounting to prevent SSR errors.
 *
 * @example Safely Conditionally Rendering
 * ```diff
 *   const {
 *     temporary,
 * +   persistent,
 *     appBarProps,
 *     expandableNavProps,
 *     mainProps,
 *     navToggleProps,
 *     temporaryNavProps,
 *     windowSplitterProps,
 *   } = useExpandableLayout({ pathname });
 *
 *   return {
 *     <>
 *       <LayoutAppBar {...appBarProps}>
 *         <Button {...navToggleProps} />
 *         <AppBarTitle>Hello, world!</AppBarTitle>
 *       </LayoutAppBar>
 * -     <LayoutNav {...expandableNavProps}>
 * -       <CustomNavigation />
 * -     </LayoutNav>
 * +     {persistent && (
 * +       <LayoutNav {...expandableNavProps}>
 * +         <CustomNavigation />
 * +       </LayoutNav>
 * +     )}
 *       {temporary && (
 *         <Sheet {...temporaryNavProps}>
 *           <CustomNavigation />
 *         </Sheet>
 *       )}
 *       <Main {...mainProps}>{children}</Main>
 *     </>
 *   }
 * ```
 *
 * @since 6.0.0
 * @see {@link useResizableLayout}
 */
export function useExpandableLayout(
  options: ExpandableLayoutOptions
): ExpandableLayoutImplementation {
  const {
    fullHeightNav = false,
    temporaryUntil = "tablet",
    transitionProps,
    defaultExpanded = fullHeightNav === "static",
    ...temporaryOptions
  } = options;

  const ssr = useSsr();
  const {
    appBarProps,
    mainProps,
    navToggleProps,
    temporaryNavProps,
    hideTemporaryNav,
    showTemporaryNav,
    visible,
  } = useTemporaryLayout(temporaryOptions);

  const {
    toggled: expanded,
    enable: expandNavigation,
    disable: collapseNavigation,
    toggle: toggleNavigation,
  } = useToggle(defaultExpanded);
  const { elementProps } = useHorizontalLayoutTransition({
    ...transitionProps,
    transitionIn: expanded,
  });
  const { isPhone, isDesktop } = useAppSize();
  const temporary = isPhone || (temporaryUntil === "desktop" && !isDesktop);

  return {
    visible,
    temporary,
    persistent: ssr || !temporary,
    hideTemporaryNav,
    showTemporaryNav,
    expanded,
    expandNavigation,
    collapseNavigation,
    toggleNavigation,
    appBarProps: {
      ...appBarProps,
      ...(fullHeightNav ? elementProps : {}),
    },
    mainProps: {
      ...mainProps,
      ...elementProps,
    },
    temporaryNavProps,
    expandableNavProps: {
      expanded,
      appBarOffset: !fullHeightNav,
    },
    navToggleProps: {
      ...navToggleProps,
      onClick() {
        if (temporary) {
          showTemporaryNav();
        } else {
          toggleNavigation();
        }
      },
      className: cnb(fullHeightNav === "static" && "rmd-layout-nav-toggle"),
    },
  };
}
