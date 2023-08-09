import type { ReactElement } from "react";
import { Divider } from "../divider/Divider";
import { ListSubheader } from "../list/ListSubheader";
import type { TreeItemRendererProps } from "../tree/DefaultTreeItemRenderer";
import { DefaultTreeItemRenderer } from "../tree/DefaultTreeItemRenderer";
import type { TreeItemNode } from "../tree/types";
import type { LayoutNavigationItem } from "./types";

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
