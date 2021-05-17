import React, { HTMLAttributes, ReactElement, ReactNode } from "react";
import cn from "classnames";
import { BaseTreeItem, TreeData } from "@react-md/tree";
import { bem, PropsWithRef } from "@react-md/utils";

import { LayoutNavigation, LayoutNavigationProps } from "./LayoutNavigation";
import { LayoutNavigationItem } from "./types";
import { useLayoutConfig } from "./LayoutProvider";

const styles = bem("rmd-layout-mini-wrapper");

/**
 * This is probably an internal only interface.
 *
 * @remarks \@since 2.8.3
 */
export interface MiniLayoutWrapperProps<
  T extends BaseTreeItem = LayoutNavigationItem
> extends LayoutNavigationProps<T> {
  /**
   * Boolean if the current layout is one of the `mini` types.
   */
  mini: boolean;

  /**
   * A custom implementation for the main mini navigation component within the
   * `Layout`. If this is not `undefined`, it will be used instead of the
   * default implementation.
   *
   * Using this prop will make the following props do nothing for the mini nav:
   *
   * - `navProps`
   * - `navHeader`
   * - `navHeaderProps`
   * - `navHeaderTitle`
   * - `navHeaderTitleProps`
   * - `closeNav`
   * - `closeNavProps`
   * - `treeProps`
   *
   * @remarks \@since.2.7.0
   */
  miniNav?: ReactNode;

  /**
   * An optional tree to use for the mini navigation pane since the default
   * behavior of rendering mini tree items might hide content in an
   * undersireable way.
   *
   * @remarks \@since 2.7.0
   * @see {@link defaultMiniNavigationItemRenderer} for more information
   */
  miniNavItems?: TreeData<T>;

  /**
   * Boolean if the `mini` layout should be hidden. This should normally happen
   * after the non-mini layout becomes visible.
   */
  miniHidden: boolean;

  /**
   * Any additional props to provide to the wrapping `<div>`.
   */
  containerProps?: PropsWithRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

  /**
   * The children to render. This should normally be the `LayoutMain` component.
   */
  children: ReactNode;
}

/**
 * This is probably an internal only component.
 *
 * @remarks \@since 2.8.3
 */
export function MiniLayoutWrapper({
  mini,
  miniHidden,
  miniNav,
  miniNavItems,
  treeProps,
  header,
  headerProps,
  headerTitle,
  headerTitleProps,
  closeNav,
  closeNavProps,
  children,
  containerProps,
  ...props
}: MiniLayoutWrapperProps): ReactElement {
  const { fixedAppBar } = useLayoutConfig();
  if (!mini || !treeProps || typeof miniNav !== "undefined") {
    return (
      <>
        {miniNav}
        {children}
      </>
    );
  }

  let miniTreeProps = treeProps;
  if (miniNavItems) {
    miniTreeProps = {
      ...miniTreeProps,
      navItems: miniNavItems,
    };
  }

  const miniNavigation = (
    <LayoutNavigation
      header={header}
      headerProps={headerProps}
      headerTitle={headerTitle}
      headerTitleProps={headerTitleProps}
      closeNav={closeNav}
      closeNavProps={closeNavProps}
      treeProps={miniTreeProps}
      {...props}
      mini
      sticky={!fixedAppBar}
      hidden={miniHidden}
    />
  );

  if (fixedAppBar) {
    return (
      <>
        {miniNavigation}
        {children}
      </>
    );
  }

  return (
    <div
      {...containerProps}
      className={cn(!miniHidden && styles(), containerProps?.className)}
    >
      {miniNavigation}
      {children}
    </div>
  );
}
