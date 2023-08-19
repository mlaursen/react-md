import type { ReactElement } from "react";
import { Divider } from "../divider/Divider.js";
import { ListSubheader } from "../list/ListSubheader.js";
import type { TreeItemRendererProps } from "../tree/DefaultTreeItemRenderer.js";
import { DefaultTreeItemRenderer } from "../tree/DefaultTreeItemRenderer.js";
import type { TreeItemNode } from "../tree/types.js";
import type { LayoutNavigationItem } from "./types.js";

export function DefaultLayoutNavigationItemRenderer<
  T extends TreeItemNode = LayoutNavigationItem,
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
