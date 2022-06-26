import {
  bem,
  useActiveDescendant,
  useHigherContrastChildren,
  useElementInteraction,
  RippleContainer,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import { getListItemClassName, ListItemChildren } from "@react-md/list";
import type { ReactElement, ReactNode } from "react";
import type { ConfigurableTreeItemProps } from "./types";
import { TreeGroup } from "./TreeGroup";

const styles = bem("rmd-tree-item");

type CSSProperties = React.CSSProperties & {
  "--rmd-tree-depth": number;
};

export interface TreeItemProps extends ConfigurableTreeItemProps {
  id: string;
  selected: boolean;
  expanded: boolean;
  depth: number;
  listSize: number;
  itemIndex: number;
  isLeafNode: boolean;
  renderChildItems?(): ReactNode;
  onItemSelection(): void;
  onItemExpansion(): void;
}

export function TreeItem(props: TreeItemProps): ReactElement {
  const {
    id,
    to,
    href,
    depth,
    expanded,
    selected,
    listSize,
    itemIndex,
    disabled = false,
    children: propChildren,
    className,
    leftAddon,
    leftAddonType,
    leftAddonPosition,
    rightAddon,
    rightAddonType,
    rightAddonPosition,
    forceAddonWrap,
    renderChildItems,
    collapsible = true,
    isLeafNode,
    onItemSelection,
    onItemExpansion,
    contentClassName,
    disableCollapseTransition = false,
    onClick,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    ...remaining
  } = props;

  const { ref, active } = useActiveDescendant({ id });
  const { pressedClassName, rippleContainerProps, handlers } =
    useElementInteraction({
      onClick(event) {
        onClick?.(event);
        if (event.isPropagationStopped()) {
          return;
        }

        event.stopPropagation();
        onItemSelection();
        if (!isLeafNode) {
          onItemExpansion();
        }
      },
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onTouchMove,
      disabled,
    });

  const children = useHigherContrastChildren(propChildren);

  const a11yProps = {
    "aria-expanded": !isLeafNode ? expanded : undefined,
    "aria-level": depth + 1,
    "aria-setsize": listSize,
    "aria-posinset": itemIndex + 1,
    "aria-selected": selected || undefined,
    "aria-disabled": disabled ? "true" : undefined,
    id,
    ref,
    role: "treeitem",
    tabIndex: -1,
    ...handlers,
  } as const;
  const noA11yProps = { role: "none" };
  const isLink = !!(to || href);
  const style: CSSProperties = {
    "--rmd-tree-depth": depth - 1,
  };

  return (
    <li
      {...(isLink ? noA11yProps : a11yProps)}
      style={style}
      className={cnb(styles(), className)}
    >
      <span
        {...remaining}
        {...(isLink ? a11yProps : undefined)}
        className={cnb(
          styles("content", {
            focused: active,
            selected,
            padded: depth > 0,
          }),
          getListItemClassName({
            className: contentClassName,
            disabled,
            pressedClassName,
          })
        )}
      >
        <ListItemChildren
          leftAddon={leftAddon}
          leftAddonType={leftAddonType}
          leftAddonPosition={leftAddonPosition}
          rightAddon={rightAddon}
          rightAddonType={rightAddonType}
          rightAddonPosition={rightAddonPosition}
          forceAddonWrap={forceAddonWrap}
        >
          {children}
        </ListItemChildren>
        {rippleContainerProps && <RippleContainer {...rippleContainerProps} />}
      </span>
      <TreeGroup
        id={`${id}-group`}
        collapsed={isLeafNode || !expanded}
        renderChildItems={renderChildItems}
        disableTransition={disableCollapseTransition}
      />
    </li>
  );
}
