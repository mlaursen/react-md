import React, { forwardRef, ReactNode } from "react";
import cn from "classnames";
import { Sheet, SheetProps } from "@react-md/sheet";
import { BaseTreeItem, TreeItemRenderer } from "@react-md/tree";
import { bem, PropsWithRef } from "@react-md/utils";

import { LayoutCloseNavigationButtonProps } from "./LayoutCloseNavigationButton";
import {
  LayoutNavigationHeader,
  LayoutNavigationHeaderProps,
} from "./LayoutNavigationHeader";
import { useLayoutConfig } from "./LayoutProvider";
import { LayoutTree, LayoutTreeProps } from "./LayoutTree";
import { LayoutNavigationItem } from "./types";
import {
  isPersistentLayout,
  isTemporaryLayout,
  isToggleableLayout,
} from "./utils";
import { defaultMiniNavigationItemRenderer } from "./defaultMiniNavigationItemRenderer";

export type LayoutNavigationSheetProps = Omit<
  SheetProps,
  | "id"
  | "role"
  | "component"
  | "visible"
  | "onRequestClose"
  | "disableScrollLock"
  | "disableTabFocusWrap"
>;

export interface LayoutNavigationProps<
  T extends BaseTreeItem = LayoutNavigationItem
> extends LayoutNavigationSheetProps {
  /**
   * The id to use for the main navigation sheet element. When this is omitted,
   * this will be defaulted to: `${baseId}-nav-container`.
   */
  id?: string;

  /**
   * An optional header element to display before the navigation tree and
   * children. When this is omitted, it will default to the
   * `LayoutNavigationHeader` component with some reasonable defaults.
   */
  header?: ReactNode;

  /**
   * Any additional props to provide to the default `LayoutNavigationHeader`
   * component.
   */
  headerProps?: PropsWithRef<LayoutNavigationHeaderProps, HTMLDivElement>;

  /**
   * An optional title to display within the `LayoutNavigationHeader` component
   * that will be wrapped in an `AppBarTitle`.
   */
  headerTitle?: LayoutNavigationHeaderProps["title"];

  /**
   * Any additional props that should be passed to the `AppBarTitle` that
   * surrounds the `headerTitle`.
   */
  headerTitleProps?: PropsWithRef<
    Required<LayoutNavigationHeaderProps>["titleProps"],
    HTMLDivElement
  >;

  /**
   * An optional component to use instead of the default
   * `LayoutCloseNavigationButton` in the header.
   */
  closeNav?: ReactNode;

  /**
   * Any additional props to provide the `LayoutCloseNavigationButton`.
   */
  closeNavProps?: PropsWithRef<
    LayoutCloseNavigationButtonProps,
    HTMLButtonElement
  >;

  /**
   * When this is omitted, the default navigation tree will not be rendered and
   * the only content that will be displayed will be the optional `header`
   * element and any provided `children`.
   */
  treeProps?: LayoutTreeProps<T>;

  /**
   * Boolean if being rendered as the `mini` variant. This will override some
   * other behavior and styling within this component.
   *
   * @remarks \@since 2.7.0
   */
  mini?: boolean;

  /**
   * Boolean if the mini navigation should be treated as a "sticky" element.
   * This should really only be `true` if disabling the fixed `AppBar` behavior
   * in the `Layout`.
   *
   * @remarks \@since 2.8.3
   */
  sticky?: boolean;

  /** @remarks \@since 2.8.3 */
  miniNavItemRenderer?: TreeItemRenderer<T>;
}

const styles = bem("rmd-layout-navigation");

/**
 * The container for the main navigation within the `Layout` that renders
 * differently depending on the current layout type.
 */
export const LayoutNavigation = forwardRef<
  HTMLDivElement,
  LayoutNavigationProps
>(function LayoutNavigation(
  {
    id: propId,
    "aria-label": ariaLabel = "Navigation",
    "aria-labelledby": ariaLabelledby,
    className,
    children,
    mini = false,
    header: propHeader,
    headerProps,
    headerTitle,
    headerTitleProps,
    closeNav,
    closeNavProps,
    treeProps,
    sticky = false,
    miniNavItemRenderer = defaultMiniNavigationItemRenderer,
    ...props
  },
  ref
) {
  const {
    baseId,
    layout,
    visible: isNonMiniVisible,
    hideNav,
  } = useLayoutConfig();
  const visible = mini || isNonMiniVisible;
  const id = propId || `${baseId}-${mini ? "mini-" : ""}nav-container`;

  const isTemporary = !mini && isTemporaryLayout(layout);
  const isPersistent = mini || isPersistentLayout(layout);
  const isToggleable = !mini && isToggleableLayout(layout);
  const floating = layout === "floating";

  let header = propHeader;
  if (!mini && typeof header === "undefined") {
    header = (
      <LayoutNavigationHeader
        closeNav={closeNav}
        closeNavProps={closeNavProps}
        title={headerTitle}
        titleProps={headerTitleProps}
        {...headerProps}
      />
    );
  }

  return (
    <Sheet
      {...props}
      key={layout}
      id={id}
      ref={ref}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      role={!isPersistent ? "dialog" : "none"}
      visible={visible}
      onRequestClose={hideNav}
      // do not want to portal for the other types so that logical tab order
      // is preserved
      portal={isTemporary}
      overlay={isTemporary}
      disableScrollLock={!isTemporary}
      disableTabFocusWrap={isToggleable}
      disableNestedDialogFixes={mini}
      className={cn(
        styles({
          mini,
          sticky,
          floating,
          "header-offset": layout === "clipped" || floating,
        }),
        className
      )}
    >
      {header}
      {treeProps && (
        <LayoutTree
          miniItemRenderer={miniNavItemRenderer}
          sticky={mini && sticky}
          {...treeProps}
          mini={mini}
        />
      )}
      {children}
    </Sheet>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    LayoutNavigation.propTypes = {
      id: PropTypes.string,
      "aria-label": PropTypes.string,
      "aria-labelledby": PropTypes.string,
      className: PropTypes.string,
      children: PropTypes.node,
      treeProps: PropTypes.object,
      header: PropTypes.node,
      headerProps: PropTypes.object,
      headerTitle: PropTypes.node,
      headerTitleProps: PropTypes.object,
      closeNav: PropTypes.node,
      closeNavProps: PropTypes.object,
    };
  } catch (error) {}
}
