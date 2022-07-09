import type { ReactElement } from "react";
import { TreeItem } from "./TreeItem";
import type {
  TreeItemNode,
  DefaultTreeItemNode,
  TreeItemRendererProps,
} from "./types";

export type DefaultTreeItemRendererProps<
  T extends TreeItemNode = DefaultTreeItemNode
> = TreeItemRendererProps<T>;

export function DefaultTreeItemRenderer<T extends TreeItemNode>(
  props: DefaultTreeItemRendererProps<T>
): ReactElement {
  const { getTreeItemProps, ...remaining } = props;
  const item = props.item as DefaultTreeItemNode;

  const {
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
      {...getTreeItemProps(remaining)}
    >
      {children}
    </TreeItem>
  );
}
