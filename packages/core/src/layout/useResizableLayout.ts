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
  type LayoutWindowSplitterOptions,
  useLayoutWindowSplitter,
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
 * @example Main Usage
 * ```tsx
 * import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
 * import { Button } from "@react-md/core/button/Button";
 * import { LayoutAppBar } from "@react-md/core/layout/LayoutAppBar";
 * import { LayoutNav } from "@react-md/core/layout/LayoutNav";
 * import { LayoutWindowSplitter } from "@react-md/core/layout/LayoutWindowSplitter";
 * import { Main } from "@react-md/core/layout/Main";
 * import { useResizableLayout } from "@react-md/core/layout/useResizableLayout";
 * import { Sheet } from "@react-md/core/sheet/Sheet";
 * import { type ReactElement, type ReactNode } from "react";
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
 *   } = useResizableLayout({ pathname });
 *
 *   return (
 *     <>
 *       <LayoutAppBar {...appBarProps}>
 *         <Button {...navToggleProps} />
 *         <AppBarTitle>Hello, world!</AppBarTitle>
 *       </LayoutAppBar>
 *       <LayoutNav {...expandableNavProps}>
 *         <CustomNavigation />
 *       </LayoutNav>
 *       <LayoutWindowSplitter {...windowSplitterProps} />
 *       {temporary && (
 *         <Sheet {...temporaryNavProps}>
 *           <CustomNavigation />
 *         </Sheet>
 *       )}
 *       <Main {...mainProps}>{children}</Main>
 *     </>
 *   );
 * }
 * ```
 *
 * If you have a large navigation panel, you can conditionally render the
 * `LayoutNav` with the `persistent` boolean returned by the hook which will
 * ensure that the DOM has rehydrated before unmounting to prevent SSR errors.
 *
 * @example Conditionally Rendering
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
 *   } = useResizableLayout({ pathname });
 *
 *   return (
 *     <>
 *       <LayoutAppBar {...appBarProps}>
 *         <Button {...navToggleProps} />
 *         <AppBarTitle>Hello, world!</AppBarTitle>
 *       </LayoutAppBar>
 * -     <LayoutNav {...expandableNavProps}>
 * -       <CustomNavigation />
 * -     </LayoutNav>
 * -     <LayoutWindowSplitter {...windowSplitterProps} />
 * +     {persistent && (
 * +       <>
 * +         <LayoutNav {...expandableNavProps}>
 * +           <CustomNavigation />
 * +         </LayoutNav>
 * +         <LayoutWindowSplitter {...windowSplitterProps} />
 * +       </>
 * +     )}
 *       {temporary && (
 *         <Sheet {...temporaryNavProps}>
 *           <CustomNavigation />
 *         </Sheet>
 *       )}
 *       <Main {...mainProps}>{children}</Main>
 *     </>
 *   )
 * ```
 *
 * @see {@link https://next.react-md.dev/getting-started/layout | Layout Demos}
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
    temporaryUntil,
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
    temporaryUntil,
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
