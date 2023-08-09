import type { ReactElement } from "react";
import type { TreeItemRendererProps } from "../tree/DefaultTreeItemRenderer";
import { TreeItem } from "../tree/TreeItem";
import type { TreeItemNode } from "../tree/types";
import { SrOnly } from "../typography/SrOnly";
import { DefaultLayoutNavigationItemRenderer } from "./DefaultLayoutNavigationItemRenderer";
import type { LayoutNavigationItem } from "./types";

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
