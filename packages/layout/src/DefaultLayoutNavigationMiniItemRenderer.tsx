import { SrOnly } from "@react-md/core";
import type { TreeItemNode, TreeItemRendererProps } from "@react-md/tree";
import { TreeItem } from "@react-md/tree";
import type { ReactElement } from "react";

import { DefaultLayoutNavigationItemRenderer } from "./DefaultLayoutNavigationItemRenderer";
import type { LayoutNavigationItem } from "./types";

export function DefaultMiniLayoutNavigationItemRenderer<
  T extends TreeItemNode = LayoutNavigationItem
>(props: TreeItemRendererProps<T>): ReactElement | null {
  const { getTreeItemProps: _getTreeItemProps, ...remaining } = props;
  const item = props.item as LayoutNavigationItem;
  const { leftAddon, itemId } = item;

  if (leftAddon) {
    return (
      <TreeItem key={itemId} {...remaining}>
        {leftAddon}
        <SrOnly>{item.name ?? item.children}</SrOnly>
      </TreeItem>
    );
  }

  return <DefaultLayoutNavigationItemRenderer {...props} />;
}
