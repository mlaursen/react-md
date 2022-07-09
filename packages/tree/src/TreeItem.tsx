import {
  bem,
  RippleContainer,
  useElementInteraction,
  useHigherContrastChildren,
} from "@react-md/core";
import { getListItemClassName, ListItemChildren } from "@react-md/list";
import { cnb } from "cnbuilder";
import type { MutableRefObject, ReactElement, ReactNode } from "react";
import { TreeGroup } from "./TreeGroup";
import { TreeItemExpander } from "./TreeItemExpander";
import { useTreeContext } from "./TreeProvider";
import type {
  OverridableTreeItemProps,
  TreeItemNode,
  TreeItemStates,
} from "./types";

const styles = bem("rmd-tree-item");

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
    as = "span",
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
    disableLeftAddonCenteredMedia: propDisableLeftAddonCenteredMedia,
    disableRightAddonCenteredMedia,
    childItems,
    contentClassName,
    disableTransition: propDisableTransition,
    onClick,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
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
      onTouchStart,
      onTouchEnd,
      onTouchMove,
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

  // cheating a bit so there are type errors around the event handlers
  const ContentComponent = as as "span";
  const leftAddonType =
    propLeftAddonType ?? (expanderLeft && leftAddon) ? "media" : undefined;
  const isMediaLeftAddon =
    typeof propLeftAddonType === "undefined" && leftAddonType === "media";
  const disableLeftAddonCenteredMedia =
    propDisableLeftAddonCenteredMedia ?? isMediaLeftAddon;

  return (
    <li
      {...(isLink ? noA11yProps : a11yProps)}
      className={cnb(
        styles({
          "rotator-left": expanderLeft,
          "rotator-right": !expanderLeft,
        }),
        className
      )}
    >
      <ContentComponent
        {...remaining}
        {...(isLink ? a11yProps : undefined)}
        className={cnb(
          styles("content", {
            link: isLink,
            padded: depth > 0,
            focused,
            selected,
            disabled,
            "rotator-left": expanderLeft,
            "rotator-right": !expanderLeft,
          }),
          getListItemClassName({
            className: contentClassName,
            disabled,
            disabledOpacity,
            pressedClassName,
          })
        )}
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
