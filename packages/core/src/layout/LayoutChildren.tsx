import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { useEffect, useState } from "react";
import type { SkipToMainContentProps } from "../link/SkipToMainContent.js";
import { SkipToMainContent } from "../link/SkipToMainContent.js";
import type { TreeData, TreeItemNode } from "../tree/types.js";
import type { PropsWithRef } from "../types.js";
import { LayoutAppBar } from "./LayoutAppBar.js";
import type { LayoutMainProps } from "./LayoutMain.js";
import { LayoutMain } from "./LayoutMain.js";
import { LayoutNavigation } from "./LayoutNavigation.js";
import { useLayoutConfig } from "./LayoutProvider.js";
import { MiniLayoutWrapper } from "./MiniLayoutWrapper.js";
import type {
  FlattenedLayoutComponentConfiguration,
  LayoutNavigationItem,
} from "./types.js";
import { isMiniLayout } from "./utils.js";

/**
 * This used to just be the `LayoutProps` but was split up to help with mini
 * layouts.
 *
 * @remarks \@since 2.7.0
 */
export interface LayoutChildrenProps<
  T extends TreeItemNode = LayoutNavigationItem,
> extends FlattenedLayoutComponentConfiguration<T> {
  /**
   * The base id to use for everything within the layout component. The `id`
   * will be applied to:
   *
   * - the `LayoutAppBar` as `${id}-header`
   * - the `AppBarTitle` as `${id}-title`
   * - the `LayoutNavToggle` as `${id}-nav-toggle`
   * - the `LayoutMain` element as `${id}-main`
   */
  id?: string;

  /**
   * Boolean if the main app bar should appear after the navigation component.
   * It is generally recommended to enable this prop if the navigation component
   * as a focusable element in the header since it will have a better tab focus
   * order.
   */
  navAfterAppBar?: boolean;

  /**
   * Any optional props to provide to the `<main>` element of the page.
   */
  mainProps?: PropsWithRef<LayoutMainProps, HTMLDivElement>;

  /**
   * Any additional props to provide to the `<SkipToMainLink />` link that is
   * automatically rendered in the layout.
   */
  skipProps?: Omit<SkipToMainContentProps, "mainId">;

  /**
   * An optional tree to use for the mini navigation pane since the default
   * behavior of rendering mini tree items might hide content in an undesirable
   * way.
   *
   * @remarks \@since 2.7.0
   * @see {@link defaultMiniNavigationItemRenderer} for more information
   */
  miniNavItems?: TreeData<T>;

  /**
   * This prop allows you to provide additional props to the `<div>` surrounding
   * the `LayoutMain` and mini `LayoutNavigation` components.
   *
   * Note: This additional `<div>` will only be rendered if:
   * - at least one of the provided layout types are `mini`
   * - the layout is not using a fixed app bar
   * - the `miniNav` prop has not been defined
   * - `treeProps` have been provided
   *
   * @remarks
   * \@since 2.8.3
   * \@since 2.9.1 This will render if any provided layout type is `mini`.
   */
  miniWrapperProps?: PropsWithRef<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;

  /**
   * The children to display within the layout. This is pretty much required
   * since you'll have an empty app otherwise, but it's left as optional just
   * for prototyping purposes.
   */
  children?: ReactNode;
}

/**
 * The only purpose of this component is to render the children and different
 * parts of the `Layout` depending on the current layout that is active. Since
 * the `Layout` component defines the provider itself, this has to be a child
 * component to get the resolved `layout` type.
 *
 * @remarks \@since 2.7.0
 * @internal
 */
export function LayoutChildren<T extends TreeItemNode = LayoutNavigationItem>({
  id = "layout",
  appBar: propAppBar,
  appBarProps,
  customTitle,
  title,
  titleProps,
  navToggle,
  navToggleProps,
  navAfterAppBar = false,
  nav: propNav,
  miniNav,
  miniNavItems,
  miniWrapperProps,
  navHeader,
  navHeaderProps,
  navHeaderTitle,
  navHeaderTitleProps,
  closeNav,
  closeNavProps,
  treeProps,
  navProps,
  skipProps,
  mainProps,
  children,
}: LayoutChildrenProps<T>): ReactElement {
  const mainId = mainProps?.id || `${id}-main`;
  const { layout, visible, appBarPosition } = useLayoutConfig();
  const mini = isMiniLayout(layout);
  const [miniHidden, setMiniHidden] = useState(visible);
  // when the layout changes, the hidden state for the mini drawer must also be
  // updated
  useEffect(() => {
    setMiniHidden(visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  let appBar = propAppBar;
  if (typeof appBar === "undefined") {
    appBar = (
      <LayoutAppBar
        {...appBarProps}
        customTitle={customTitle}
        title={title}
        titleProps={titleProps}
        navToggle={navToggle}
        navToggleProps={navToggleProps}
      />
    );
  }

  let nav = propNav;
  if (typeof nav === "undefined") {
    nav = (
      <LayoutNavigation
        header={navHeader}
        headerProps={navHeaderProps}
        headerTitle={navHeaderTitle}
        headerTitleProps={navHeaderTitleProps}
        closeNav={closeNav}
        closeNavProps={closeNavProps}
        treeProps={treeProps}
        {...navProps}
        onEntered={(appearing) => {
          navProps?.onEntered?.(appearing);
          setMiniHidden(true);
        }}
        onExit={() => {
          navProps?.onExit?.();
          setMiniHidden(false);
        }}
      />
    );
  }

  return (
    <>
      <SkipToMainContent {...skipProps} mainId={mainId} />
      {navAfterAppBar && appBar}
      {nav}
      {!navAfterAppBar && appBar}
      <MiniLayoutWrapper
        mini={mini}
        miniNav={miniNav}
        miniHidden={miniHidden}
        containerProps={miniWrapperProps}
        miniNavItems={miniNavItems}
        treeProps={treeProps}
        header={navHeader}
        headerProps={navHeaderProps}
        headerTitle={navHeaderTitle}
        headerTitleProps={navHeaderTitleProps}
        closeNav={closeNav}
        closeNavProps={closeNavProps}
      >
        <LayoutMain
          headerOffset={!!appBarPosition}
          mini={mini}
          miniHidden={miniHidden}
          {...mainProps}
          id={mainId}
        >
          {children}
        </LayoutMain>
      </MiniLayoutWrapper>
    </>
  );
}