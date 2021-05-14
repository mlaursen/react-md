import React, { ReactNode } from "react";
import cn from "classnames";
import { Divider } from "@react-md/divider";
import { TreeItem, TreeItemRenderer } from "@react-md/tree";
import { SrOnly } from "@react-md/typography";

import { LayoutNavigationItem } from "./types";

/**
 * This is the default mini navigation item renderer provided by the layout
 * package that has some reasonable defaults for creating a navigation tree.
 *
 * This renderer behaves a bit differently than the
 * `defaultNavigationItemRenderer` since it will only render the tree item if:
 *
 * - the item is at the root -- `parentId === null`
 * - the item is a divider at the root
 * - the item is not a subheader -- there isn't enough space
 * - the item does not have any child items -- not enough space to show nesting
 * - the item has a `leftAddon` -- the mini variant only renders icons
 *
 * This rendered `TreeItem` will only display the `leftAddon` as the children
 * but will also render the tree item's label in the `SrOnly` component so an
 * accessible label still exists for the icon `TreeItem`.
 *
 * @see {@link TreeItemRenderer}
 * @see {@link defaultNavigationItemRenderer}
 */
export const defaultMiniNavigationItemRenderer: TreeItemRenderer<LayoutNavigationItem> =
  (
    itemProps,
    item,
    { linkComponent, getItemProps, getItemLabel, labelKey }
  ) => {
    const { key, renderChildItems, ...props } = itemProps;
    const {
      divider,
      subheader,
      leftAddon,
      parentId,
      style,
      className,
      liStyle,
      liClassName,
      as,
      to,
      href,
      isLink,
      contentComponent: propContentComponent,
    } = item;

    if (divider && parentId === null) {
      return <Divider key={key} />;
    }

    if (subheader || parentId !== null || !leftAddon || renderChildItems) {
      return null;
    }

    let contentComponent = propContentComponent;
    if (!contentComponent && isLink !== false && (to || href || isLink)) {
      contentComponent = linkComponent;
    }

    const { focused, selected, expanded } = itemProps;
    const overrides = getItemProps({
      ...item,
      focused,
      selected,
      expanded,
    });
    let children: ReactNode = (overrides && overrides.children) || undefined;
    if (typeof children === "undefined") {
      children = getItemLabel(item, labelKey);
    }

    return (
      <TreeItem
        key={key}
        {...props}
        as={as}
        to={to}
        href={href}
        isLink={isLink}
        contentComponent={contentComponent}
        style={overrides?.style ?? style}
        className={cn(
          "rmd-layout-nav__mini-item",
          overrides?.className ?? className
        )}
        liStyle={overrides?.liStyle ?? liStyle}
        liClassName={overrides?.liClassName ?? liClassName}
        textChildren={false}
      >
        {leftAddon}
        <SrOnly>{children}</SrOnly>
      </TreeItem>
    );
  };
