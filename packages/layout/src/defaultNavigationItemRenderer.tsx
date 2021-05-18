import React from "react";
import { Divider } from "@react-md/divider";
import { ListSubheader } from "@react-md/list";
import { defaultTreeItemRenderer, TreeItemRenderer } from "@react-md/tree";

import { LayoutNavigationItem } from "./types";

/**
 * This is the default navigation item renderer provided by the layout package
 * that has some reasonable defaults for creating a navigation tree. This is
 * just an extension of the base `defaultTreeItemRenderer` from the
 * `@react-md/tree` package that adds in some support for also rendering
 * dividers and subheader elements.
 */
export const defaultNavigationItemRenderer: TreeItemRenderer<LayoutNavigationItem> =
  (itemProps, item, treeProps) => {
    const { key } = itemProps;
    const { divider, subheader } = item;
    if (divider) {
      return <Divider key={key} />;
    }

    if (subheader) {
      return (
        <ListSubheader key={key} role="none">
          {item.children}
        </ListSubheader>
      );
    }

    return defaultTreeItemRenderer(itemProps, item, treeProps);
  };
