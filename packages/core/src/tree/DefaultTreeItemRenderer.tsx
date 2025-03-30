import { type ReactElement } from "react";

import { TreeItem } from "./TreeItem.js";
import {
  type DefaultTreeItemNode,
  type TreeItemNode,
  type TreeItemRendererProps,
} from "./types.js";

/**
 * **Client Component**
 *
 * A reasonable default for rendering tree items that will extract all the
 * `ListItemChildrenProps` from the item and attempt to pass them into the
 * `TreeItem`.
 *
 * Look at the `Tree` component for an example of creating a custom
 * implementation.
 *
 * @see {@link https://next.react-md.dev/components/tree | Tree Demos}
 * @since 6.0.0
 */
export function DefaultTreeItemRenderer<
  T extends TreeItemNode = DefaultTreeItemNode,
>(props: TreeItemRendererProps<T>): ReactElement {
  const { parents, children: childItems } = props;
  const item = props.item as DefaultTreeItemNode;

  const {
    itemId,
    to,
    href,
    disabled,
    className,
    contentClassName,
    leftAddon,
    leftAddonType,
    leftAddonPosition,
    leftAddonClassName,
    leftAddonForceWrap,
    rightAddon,
    rightAddonType,
    rightAddonPosition,
    rightAddonClassName,
    rightAddonForceWrap,
    disableLeftAddonCenteredMedia,
    disableRightAddonCenteredMedia,
  } = item;
  const children = item.name ?? item.children;

  return (
    <TreeItem
      to={to}
      href={href}
      depth={parents.length}
      childItems={childItems}
      className={className}
      contentClassName={contentClassName}
      itemId={itemId}
      disabled={disabled}
      leftAddon={leftAddon}
      leftAddonType={leftAddonType}
      leftAddonPosition={leftAddonPosition}
      leftAddonClassName={leftAddonClassName}
      leftAddonForceWrap={leftAddonForceWrap}
      rightAddon={rightAddon}
      rightAddonType={rightAddonType}
      rightAddonPosition={rightAddonPosition}
      rightAddonClassName={rightAddonClassName}
      rightAddonForceWrap={rightAddonForceWrap}
      disableLeftAddonCenteredMedia={disableLeftAddonCenteredMedia}
      disableRightAddonCenteredMedia={disableRightAddonCenteredMedia}
    >
      {children}
    </TreeItem>
  );
}
