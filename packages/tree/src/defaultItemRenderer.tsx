import React, { ReactElement } from "react";
import TreeItem from "./TreeItem";
import {
  ProvidedTreeItemProps,
  ProvidedTreeProps,
  TreeItemIds,
  UnknownTreeItem,
} from "./types";

/**
 * A "reasonable" default implementation for rendering a tree item that extracts
 * the most used ListItem props and passes them down to the `TreeItem`.
 *
 * @private
 */
export default function defaultItemRenderer(
  providedProps: ProvidedTreeItemProps,
  item: TreeItemIds,
  treeProps: ProvidedTreeProps
): ReactElement {
  const treeItem = item as UnknownTreeItem;
  const {
    expanderLeft,
    expanderIcon,
    labelKey,
    getItemLabel,
    getItemProps,
  } = treeProps;
  const {
    leftIcon,
    rightIcon,
    leftAvatar,
    rightAvatar,
    contentComponent,
    to,
    href,
    isLink,
    readOnly,
    disabled,
  } = treeItem;

  return (
    <TreeItem
      {...providedProps}
      to={to}
      href={href}
      isLink={isLink}
      contentComponent={contentComponent}
      readOnly={readOnly}
      disabled={disabled}
      leftIcon={leftIcon}
      leftAvatar={leftAvatar}
      rightIcon={rightIcon}
      rightAvatar={rightAvatar}
      expanderLeft={expanderLeft}
      expanderIcon={expanderIcon}
      {...getItemProps(treeItem)}
    >
      {getItemLabel(treeItem, labelKey)}
    </TreeItem>
  );
}
