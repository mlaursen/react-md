import type { ReactElement } from "react";
import type { TreeItemRendererProps } from "../tree/DefaultTreeItemRenderer.js";
import { TreeItem } from "../tree/TreeItem.js";
import type { TreeItemNode } from "../tree/types.js";
import { SrOnly } from "../typography/SrOnly.js";
import { DefaultLayoutNavigationItemRenderer } from "./DefaultLayoutNavigationItemRenderer.js";
import type { LayoutNavigationItem } from "./types.js";

export function DefaultMiniLayoutNavigationItemRenderer<
  T extends TreeItemNode = LayoutNavigationItem,
>(props: TreeItemRendererProps<T>): ReactElement | null {
  const { item: _item, ...remaining } = props;
  const item = props.item as LayoutNavigationItem;
  const { leftAddon, itemId } = item;

  if (leftAddon) {
    return (
      <TreeItem key={itemId} itemId={itemId} {...remaining}>
        {leftAddon}
        <SrOnly>{item.name ?? item.children}</SrOnly>
      </TreeItem>
    );
  }

  return <DefaultLayoutNavigationItemRenderer {...props} />;
}
