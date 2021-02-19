import React, { ElementType, ReactElement, ReactNode } from "react";

import { TreeItem } from "./TreeItem";
import {
  BaseTreeItem,
  ProvidedTreeItemProps,
  ProvidedTreeProps,
  UnknownTreeItem,
} from "./types";

function isElementType(
  contentComponent: unknown
): contentComponent is ElementType {
  return typeof contentComponent !== "undefined";
}

/**
 * A "reasonable" default implementation for rendering a tree item that extracts
 * the most used ListItem props and passes them down to the `TreeItem`.
 *
 * This is actually exported from this package so it can be used along with a
 * custom renderer for all items that have `isCustom` enabled.
 *
 * ```tsx
 * const itemRenderer: TreeItemRenderer<MyTreeItem> = (
 *   itemProps,
 *   item,
 *   treeProps
 * ) => {
 *   const { key } = itemProps;
 *   const { isCustom } = item;
 *   if (isCustom) {
 *     return <MyFancyNonTreeItem item={item} key={key} />
 *   }
 *
 *   return defaultTreeItemRenderer(itemProps, item, treeProps);
 * }
 * ```
 *
 * @param itemProps - The providied tree item props that should be passed down
 * for keyboard functionality, accessibility, and a `key` for the item.
 * @param item - The item itself. This is used to extract any of the common
 * ListItemChildren props.
 * @param treeProps - The props for the Tree this item is being rendered in.
 * This is really used so the `expanderLeft`, `expanderIcon`, `labelKey`,
 * `getItemLabel`, and `getItemProps` can be used to render the TreeItem
 * itself.
 * @returns a `TreeItem` or a custom `ReactElement`
 */
export function defaultTreeItemRenderer(
  itemProps: ProvidedTreeItemProps,
  item: BaseTreeItem & { visibleIndex: number },
  treeProps: ProvidedTreeProps
): ReactElement {
  const treeItem = item as UnknownTreeItem & { visibleIndex: number };
  const { focused, selected, expanded } = itemProps;
  const {
    expanderLeft,
    expanderIcon,
    labelKey,
    getItemLabel,
    getItemProps,
    linkComponent,
  } = treeProps;
  const {
    leftAddon,
    leftAddonType,
    leftAddonPosition,
    rightAddon,
    rightAddonType,
    rightAddonPosition,
    as,
    to,
    href,
  } = treeItem;
  let isLink: boolean | undefined;
  let readOnly: boolean | undefined;
  let disabled: boolean | undefined;
  let className: string | undefined;
  let liClassName: string | undefined;
  if (typeof treeItem.isLink === "boolean") {
    ({ isLink } = treeItem);
  }

  if (typeof treeItem.readOnly === "boolean") {
    ({ readOnly } = treeItem);
  }

  if (typeof treeItem.disabled === "boolean") {
    ({ disabled } = treeItem);
  }

  if (typeof treeItem.className === "string") {
    ({ className } = treeItem);
  }

  if (typeof treeItem.liClassName === "string") {
    ({ liClassName } = treeItem);
  }

  const overrides = getItemProps({
    ...treeItem,
    focused,
    selected,
    expanded,
  });

  let children: ReactNode = (overrides && overrides.children) || undefined;
  if (typeof children === "undefined") {
    children = getItemLabel(treeItem, labelKey);
  }

  let contentComponent: ElementType | undefined;
  if (isElementType(treeItem.contentComponent)) {
    ({ contentComponent } = treeItem);
  }

  if (isLink !== false && (to || href || isLink)) {
    contentComponent = contentComponent || linkComponent;
  }

  return (
    <TreeItem
      {...itemProps}
      as={as}
      to={to}
      href={href}
      isLink={isLink}
      contentComponent={contentComponent}
      readOnly={readOnly}
      disabled={disabled}
      leftAddon={leftAddon}
      leftAddonType={leftAddonType}
      leftAddonPosition={leftAddonPosition}
      rightAddon={rightAddon}
      rightAddonType={rightAddonType}
      rightAddonPosition={rightAddonPosition}
      expanderLeft={expanderLeft}
      expanderIcon={expanderIcon}
      className={className}
      liClassName={liClassName}
      {...overrides}
    >
      {children}
    </TreeItem>
  );
}
