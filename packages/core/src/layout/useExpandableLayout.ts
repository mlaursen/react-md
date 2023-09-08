"use client";
import { useAppSize } from "../media-queries/AppSizeProvider.js";
import type { CSSTransitionElementProps } from "../transition/types.js";
import type { CssPosition, UseStateInitializer } from "../types.js";
import { useToggle } from "../useToggle.js";
import type { LayoutNavProps } from "./LayoutNav.js";
import type { HorizontalLayoutTransitionOptions } from "./useHorizontalLayoutTransition.js";
import { useHorizontalLayoutTransition } from "./useHorizontalLayoutTransition.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { useResizableLayout } from "./useResizableLayout.js";
import type {
  ProvidedTemporaryLayoutAppBarProps,
  ProvidedTemporaryLayoutMainProps,
  TemporaryLayoutImplementation,
  TemporaryLayoutOptions,
} from "./useTemporaryLayout.js";
import { useTemporaryLayout } from "./useTemporaryLayout.js";

/**
 * @remarks \@since 6.0.0
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
   * @defaultValue `false`
   */
  fullHeightNav?: boolean;

  /** @see {@link HorizontalLayoutTransitionOptions} */
  transitionProps?: Omit<HorizontalLayoutTransitionOptions, "transitionIn">;
}

/**
 * @remarks \@since 6.0.0
 */
export interface ProvidedLayoutMainProps
  extends ProvidedTemporaryLayoutMainProps,
    CSSTransitionElementProps<HTMLElement> {}

/**
 * @remarks \@since 6.0.0
 */
export type ProvidedLayoutNavProps = Pick<
  LayoutNavProps,
  "expanded" | "appBarOffset"
>;

/**
 * @remarks \@since 6.0.0
 */
export type ProvidedLayoutAppBarProps = ProvidedTemporaryLayoutAppBarProps &
  Partial<CSSTransitionElementProps<HTMLElement>>;

/**
 * @remarks \@since 6.0.0
 */
export interface ExpandableLayoutImplementation
  extends TemporaryLayoutImplementation {
  expanded: boolean;
  expandNavigation(): void;
  collapseNavigation(): void;
  toggleNavigation(): void;
  appBarProps: ProvidedLayoutAppBarProps;
  mainProps: ProvidedLayoutMainProps;
  expandableNavProps: ProvidedLayoutNavProps;
}

/**
 * @example
 * Main USage
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
 *     isPhone,
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
 *       {isPhone && (
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
 * @remarks \@since 6.0.0
 * @see {@link useResizableLayout}
 */
export function useExpandableLayout(
  options: ExpandableLayoutOptions
): ExpandableLayoutImplementation {
  const {
    defaultExpanded = false,
    fullHeightNav = false,
    transitionProps,
    ...temporaryOptions
  } = options;

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
  const { isPhone } = useAppSize();
  const { elementProps } = useHorizontalLayoutTransition({
    ...transitionProps,
    transitionIn: expanded,
  });

  return {
    visible,
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
        if (isPhone) {
          showTemporaryNav();
        } else {
          toggleNavigation();
        }
      },
    },
  };
}
