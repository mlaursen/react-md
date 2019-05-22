import React, { ReactNode, isValidElement } from "react";
import MenuItem, { MenuItemProps } from "./MenuItem";
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
  if (
    isValidElement(item) ||
    type === "number" ||
    type === "string" ||
    type === "boolean"
  ) {
    return <MenuItem key={key}>{item}</MenuItem>;
  }

  const separatorProps = item as MenuItemSeparatorProps;
  if (separatorProps.role === "separator") {
    return <MenuItemSeparator {...separatorProps} key={key} />;
  }

  const itemProps = item as MenuItemProps;
  return <MenuItem {...itemProps} key={key} />;
}
