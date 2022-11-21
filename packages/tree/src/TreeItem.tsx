import {
  RippleContainer,
  useElementInteraction,
  useHigherContrastChildren,
} from "@react-md/core";
import { useLink } from "@react-md/link";
import { ListItemChildren } from "@react-md/list";
import { cnb } from "cnbuilder";
import type { MutableRefObject, ReactElement, ReactNode } from "react";

import { treeItem, treeItemContent } from "./styles";
import { TreeGroup } from "./TreeGroup";
import { TreeItemExpander } from "./TreeItemExpander";
import { useTreeContext } from "./TreeProvider";
import type {
  OverridableTreeItemProps,
  TreeItemNode,
  TreeItemStates,
} from "./types";

export interface TreeItemProps
  extends OverridableTreeItemProps,
    TreeItemStates {
  id: string;
  item: TreeItemNode;
  contentRef: MutableRefObject<HTMLSpanElement | null>;
  childItems: ReactNode;
}

export function TreeItem(props: TreeItemProps): ReactElement {
  const {
    id,
    depth,
    focused,
    expanded,
    selected,
    disabled = false,
    disabledOpacity = false,
    children: propChildren,
    className,
    item,
    leftAddon,
    leftAddonType: propLeftAddonType,
    leftAddonPosition,
    leftAddonClassName,
    leftAddonForceWrap,
    rightAddon,
    rightAddonType,
    rightAddonPosition,
    rightAddonClassName,
    rightAddonForceWrap,
    disableTextChildren,
    disableLeftAddonCenteredMedia: propDisableLeftAddonCenteredMedia,
    disableRightAddonCenteredMedia,
    childItems,
    contentClassName,
    disableTransition: propDisableTransition,
    onBlur,
    onClick,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    contentRef,
    isLeafNode,
    ...remaining
  } = props;
  const { itemId } = item;

  if (disabled) {
    // you can't really disable a link other than removing the href, so
    // unset these props
    remaining.to = undefined;
    remaining.href = undefined;
  }

  const {
    expanderLeft,
    expansionMode,
    onItemSelection,
    onItemExpansion,
    disableTransition: contextDisableTransition,
  } = useTreeContext();

  const disableTransition = propDisableTransition ?? contextDisableTransition;

  const { pressedClassName, rippleContainerProps, handlers } =
    useElementInteraction<HTMLLIElement>({
      onBlur,
      onClick(event) {
        onClick?.(event);
        if (event.isPropagationStopped()) {
          return;
        }

        event.stopPropagation();
        onItemSelection(itemId);
        if (!isLeafNode && expansionMode !== "manual") {
          onItemExpansion(itemId, !expanded);
        }
      },
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      disabled,
    });

  const children = useHigherContrastChildren(propChildren);

  const a11yProps = {
    "aria-expanded": !isLeafNode ? expanded : undefined,
    "aria-level": depth + 1,
    "aria-selected": selected || undefined,
    "aria-disabled": disabled || undefined,
    id,
    ref: contentRef,
    role: "treeitem",
    tabIndex: -1,
    ...handlers,
  };
  const noA11yProps = { role: "none" };
  const isLink = !!(remaining.to || remaining.href);
  const Link = useLink();

  // cheating a bit so there are type errors around the event handlers
  const ContentComponent = (isLink ? Link : "span") as "span";
  const leftAddonType =
    propLeftAddonType ?? (expanderLeft && leftAddon) ? "media" : undefined;
  const isMediaLeftAddon =
    typeof propLeftAddonType === "undefined" && leftAddonType === "media";
  const disableLeftAddonCenteredMedia =
    propDisableLeftAddonCenteredMedia ?? isMediaLeftAddon;

  return (
    <li
      {...(isLink ? noA11yProps : a11yProps)}
      className={treeItem({ className, expander: !!childItems, expanderLeft })}
    >
      <ContentComponent
        {...remaining}
        {...(isLink ? a11yProps : undefined)}
        className={treeItemContent({
          link: isLink,
          padded: depth > 0,
          focused,
          selected,
          disabled,
          disabledOpacity,
          className: contentClassName,
          pressedClassName,
        })}
      >
        <ListItemChildren
          leftAddon={
            <TreeItemExpander
              left
              item={item}
              addon={leftAddon}
              expanded={expanded}
              disabled={disabled}
              isLeafNode={isLeafNode}
            />
          }
          leftAddonType={leftAddonType}
          leftAddonPosition={leftAddonPosition}
          leftAddonClassName={cnb(
            leftAddonClassName,
            isMediaLeftAddon && "rmd-tree-item__media",
            isMediaLeftAddon && isLeafNode && "rmd-tree-item__media--single"
          )}
          leftAddonForceWrap={leftAddonForceWrap}
          rightAddon={
            <TreeItemExpander
              item={item}
              addon={rightAddon}
              expanded={expanded}
              disabled={disabled}
              isLeafNode={isLeafNode}
            />
          }
          rightAddonType={rightAddonType}
          rightAddonPosition={rightAddonPosition}
          rightAddonClassName={rightAddonClassName}
          rightAddonForceWrap={rightAddonForceWrap}
          disableTextChildren={disableTextChildren}
          disableLeftAddonCenteredMedia={disableLeftAddonCenteredMedia}
          disableRightAddonCenteredMedia={disableRightAddonCenteredMedia}
        >
          {children}
        </ListItemChildren>
        {rippleContainerProps && <RippleContainer {...rippleContainerProps} />}
      </ContentComponent>
      <TreeGroup
        id={`${id}-group`}
        depth={depth - 1}
        collapsed={isLeafNode || !expanded}
        disableTransition={disableTransition}
      >
        {childItems}
      </TreeGroup>
    </li>
  );
}
