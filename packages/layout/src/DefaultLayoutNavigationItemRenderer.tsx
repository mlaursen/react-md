import type { TreeItemNode, TreeItemRendererProps } from "@react-md/core";
import {
  DefaultTreeItemRenderer,
  Divider,
  ListSubheader,
} from "@react-md/core";
import type { ReactElement } from "react";

import type { LayoutNavigationItem } from "./types";

export function DefaultLayoutNavigationItemRenderer<
  T extends TreeItemNode = LayoutNavigationItem
>(props: TreeItemRendererProps<T>): ReactElement {
  const item = props.item as LayoutNavigationItem;
  const { divider, subheader, itemId } = item;

  if (divider) {
    return <Divider key={itemId} />;
  }

  if (subheader) {
    return (
      <ListSubheader key={itemId} role="none">
        {item.name ?? item.children}
      </ListSubheader>
    );
  }

  return <DefaultTreeItemRenderer {...props} />;
}
