import React, { cloneElement, isValidElement, ReactNode } from "react";

import MenuItem, { MenuItemProps } from "./MenuItem";
import MenuItemLink, { MenuItemLinkProps } from "./MenuItemLink";
import MenuItemSeparator, { MenuItemSeparatorProps } from "./MenuItemSeparator";

export type Item =
  | ReactNode
  | MenuItemProps
  | (MenuItemSeparatorProps & { role: "separator" });

export default function defaultItemRenderer(item: Item, key: string) {
  if (item !== 0 && !item) {
    return null;
  }

  if (item === "separator") {
    return <MenuItemSeparator key={key} />;
  }

  const type = typeof item;
  if (type === "number" || type === "string" || type === "boolean") {
    return <MenuItem key={key}>{item}</MenuItem>;
  } else if (isValidElement(item)) {
    return cloneElement(item, { key });
  }

  const separatorProps = item as MenuItemSeparatorProps;
  if (separatorProps.role === "separator") {
    return <MenuItemSeparator {...separatorProps} key={key} />;
  }

  const linkProps = item as MenuItemLinkProps;
  if (linkProps.to || linkProps.href || linkProps.component) {
    return <MenuItemLink key={key} {...linkProps} />;
  }

  const itemProps = item as MenuItemProps;
  return <MenuItem key={key} {...itemProps} />;
}

export type MenuItemRenderer = typeof defaultItemRenderer;
