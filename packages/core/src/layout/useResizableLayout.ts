import { useEnsuredId } from "../useEnsuredId.js";
import { DISPLAY_NONE_CLASS } from "../utils/isElementVisible.js";
import { type LayoutWindowSplitterProps } from "./LayoutWindowSplitter.js";
import {
  type ExpandableLayoutImplementation,
  type ExpandableLayoutOptions,
  type ProvidedLayoutNavProps,
} from "./useExpandableLayout.js";
import { useExpandableLayout } from "./useExpandableLayout.js";
import {
  useLayoutWindowSplitter,
  type LayoutWindowSplitterOptions,
} from "./useLayoutWindowSplitter.js";

/**
 * @since 6.0.0
 */
export interface ResizableLayoutOptions
  extends ExpandableLayoutOptions,
    LayoutWindowSplitterOptions {
  /**
   * This id will be used as the `aria-controls` prop for the
   * `LayoutWindowSplitter` and should be applied to the `LayoutNav` as an `id`.
   *
   * @defaultValue `"layout-nav" + useId()`
   */
  navId?: string;
}

/**
 * @since 6.0.0
 */
export interface ProvidedResizableLayoutNavProps
  extends ProvidedLayoutNavProps {
  id: string;
}

/**
 * @since 6.0.0
 */
export interface ResizableLayoutImplementation
  extends ExpandableLayoutImplementation {
  expandableNavProps: ProvidedResizableLayoutNavProps;
  windowSplitterProps: LayoutWindowSplitterProps;
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
 *   LayoutWindowSplitter,
 *   Main,
 *   Sheet,
 *   useResizableLayout,
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
 *   } = useResizableLayout({ pathname });
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
 *       <LayoutWindowSplitter {...windowSplitterProps} />
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
 * @since 6.0.0
 */
export function useResizableLayout(
  options: ResizableLayoutOptions
): ResizableLayoutImplementation {
  const {
    navId: propNavId,
    pathname,
    appBarPosition = "fixed",
    fullHeightNav = false,
    defaultVisible,
    defaultExpanded,
    ...splitterOptions
  } = options;
  const navId = useEnsuredId(propNavId, "layout-nav");
  const { splitterProps, ...windowSplitter } =
    useLayoutWindowSplitter(splitterOptions);
  const expandableLayout = useExpandableLayout({
    pathname,
    appBarPosition,
    fullHeightNav,
    defaultExpanded,
    defaultVisible,
  });
  const { expandableNavProps, expanded } = expandableLayout;

  return {
    ...expandableLayout,
    ...windowSplitter,
    expandableNavProps: {
      id: navId,
      ...expandableNavProps,
    },
    windowSplitterProps: {
      ...splitterProps,
      "aria-controls": navId,
      appBarOffset: !fullHeightNav,
      className: (!expanded && DISPLAY_NONE_CLASS) || undefined,
    },
  };
}
