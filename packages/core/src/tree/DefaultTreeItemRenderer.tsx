import type { ReactElement, ReactNode } from "react";
import { TreeItem } from "./TreeItem";
import type { DefaultTreeItemNode, TreeItemNode } from "./types";

/**
 * @remarks \@since 6.0.0
 */
export interface TreeItemRendererProps<
  T extends TreeItemNode = DefaultTreeItemNode
> {
  item: T;
  depth: number;
  childItems: ReactNode;
}

/**
 * @remarks \@since 6.0.0
 */
export type DefaultTreeItemRendererProps<
  T extends TreeItemNode = DefaultTreeItemNode
> = TreeItemRendererProps<T>;

/**
 * A reasonable default for rendering tree items that will extract all the
 * `ListItemChildrenProps` from the item and attempt to pass them into the
 * `TreeItem`.
 *
 * Look at the `Tree` component for an example of creating a custom
 * implementation.
 *
 * @remarks \@since 6.0.0
 */
export function DefaultTreeItemRenderer<
  T extends TreeItemNode = DefaultTreeItemNode
>(props: DefaultTreeItemRendererProps<T>): ReactElement {
  const { item: _item, ...remaining } = props;
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
      {...remaining}
      to={to}
      href={href}
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
