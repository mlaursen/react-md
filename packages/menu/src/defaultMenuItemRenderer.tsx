import React, { cloneElement, isValidElement, ReactNode } from "react";

import { MenuItem, MenuItemProps } from "./MenuItem";
import { MenuItemLink, MenuItemLinkWithComponentProps } from "./MenuItemLink";
import { MenuItemSeparator, MenuItemSeparatorProps } from "./MenuItemSeparator";

export type ValidMenuItem =
  | ReactNode
  | MenuItemProps
  | (MenuItemSeparatorProps & { role: "separator" });

export function defaultMenuItemRenderer(
  item: ValidMenuItem,
  key: string
): ReactNode {
  if (item !== 0 && !item) {
    return null;
  }

  if (item === "separator") {
    return <MenuItemSeparator key={key} />;
  }

  const type = typeof item;
  if (type === "number" || type === "string" || type === "boolean") {
    return <MenuItem key={key}>{item}</MenuItem>;
  }
  if (isValidElement(item)) {
    return cloneElement(item, { key });
  }

  const separatorProps = item as MenuItemSeparatorProps;
  if (separatorProps.role === "separator") {
    return <MenuItemSeparator {...separatorProps} key={key} />;
  }

  const linkProps = item as MenuItemLinkWithComponentProps;
  if (linkProps.to || linkProps.href || linkProps.component) {
    return <MenuItemLink key={key} {...linkProps} />;
  }

  const itemProps = item as MenuItemProps;
  return <MenuItem key={key} {...itemProps} />;
}

export type MenuItemRenderer = typeof defaultMenuItemRenderer;
