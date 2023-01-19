import type { HTMLAttributes, ReactElement, ReactNode, Ref } from "react";
import { useEffect } from "react";
import {
  RippleContainer,
  useElementInteraction,
  useHigherContrastChildren,
} from "../interaction";
import { useLink } from "../link";
import { ListItemChildren } from "../list";
import { useKeyboardMovementContext } from "../movement";
import type { PropsWithRef } from "../types";
import { useEnsuredId } from "../useEnsuredId";
import { treeItem, treeItemContent, treeItemMedia } from "./styles";
import type { OverridableTreeGroupProps } from "./TreeGroup";
import { TreeGroup } from "./TreeGroup";
import { TreeItemExpander } from "./TreeItemExpander";
import { useTreeContext } from "./TreeProvider";
import type { DefaultTreeItemNode } from "./types";

/**
 * @remarks \@since 6.0.0  Added the `groupProps` prop.
 */
export interface TreeItemProps
  extends Omit<DefaultTreeItemNode, "parentId">,
    HTMLAttributes<HTMLLIElement> {
  /**
   * @defaultValue `"tree-item-" + useId()`
   */
  id?: string;

  /**
   * This is used to set the `--rmd-tree-depth` CSS variable which allows the
   * padding to increase for each nested tree.
   */
  depth: number;

  /**
   * Any additional props that should be passed to the surrounding `<li>`
   * element. The top-level props are passed to the `<span>` or `<a>` element
   * instead.
   */
  liProps?: PropsWithRef<HTMLAttributes<HTMLLIElement>, HTMLLIElement>;

  /**
   * Any additional props to pass to the `TreeGroup` component.
   */
  groupProps?: PropsWithRef<OverridableTreeGroupProps, HTMLUListElement>;

  /**
   * This should normally be the text/content to display within the tree item
   * and should **not** include nested trees.
   */
  childern?: ReactNode;

  /**
   * The nested tree items to render within a `TreeGroup`.
   */
  childItems?: ReactNode;

  /** @defaultValue `false` */
  disableTransition?: boolean;

  /**
   * This ref is applied to the `<span>` or `<a>` element and can be used to
   * implement drag and drop behavior.
   */
  contentRef?: Ref<HTMLElement>;

  /**
   * Set this to `true` if the {@link childItems} should not be rendered while
   * collapsed.
   *
   * @defaultValue `false`
   */
  temporaryChildItems?: boolean;
}

/**
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/treeview/}
 * @remarks
 * \@since 6.0.0 The wrapping `<li>` element will always be `role="none"` and
 * the `<span>` or `<a>` will gain the `role="treeitem"` instead. This makes it
 * easier to pass event handlers because of the nested behavior of tree items.
 * \@since 6.0.0 No longer provides the `aria-level`, `aria-setsize` and
 * `aria-posinset` attributes and allows the browser to compute them instead.
 */
export function TreeItem(props: TreeItemProps): ReactElement {
  const {
    id: propId,
    depth,
    liProps,
    disabled = false,
    disabledOpacity = false,
    groupProps,
    children: propChildren,
    className,
    itemId,
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
    textProps,
    textClassName,
    primaryText,
    secondaryText,
    secondaryTextProps,
    secondaryTextClassName,
    threeLines,
    childItems,
    contentClassName,
    temporaryChildItems,
    disableTransition: propDisableTransition,
    onBlur,
    onClick,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onDragStart,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    contentRef,
    ...remaining
  } = props;

  const id = useEnsuredId(propId, "tree-item");
  const children = useHigherContrastChildren(propChildren);
  if (disabled) {
    // you can't really disable a link other than removing the href, so
    // unset these props
    remaining.to = undefined;
    remaining.href = undefined;
  }

  const {
    metadataLookup,
    expandedIds,
    selectedIds,
    expanderLeft,
    expansionMode,
    toggleTreeItemSelection,
    toggleTreeItemExpansion,
    disableTransition: contextDisableTransition,
  } = useTreeContext();
  const { activeDescendantId } = useKeyboardMovementContext();

  const isLeafNode = !childItems;
  const focused = activeDescendantId === id;
  const expanded = expandedIds.has(itemId);
  const selected = selectedIds.has(itemId);
  const disableTransition = propDisableTransition ?? contextDisableTransition;

  useEffect(() => {
    const lookup = metadataLookup.current;
    lookup.expandable[itemId] = !isLeafNode;
    lookup.disabledItems[itemId] = disabled;
    lookup.elementToItem[id] = itemId;
    lookup.itemToElement[itemId] = id;

    return () => {
      delete lookup.disabledItems[itemId];
      delete lookup.expandable[itemId];
      delete lookup.elementToItem[id];
      delete lookup.itemToElement[itemId];
    };
  }, [id, metadataLookup, itemId, isLeafNode, disabled, depth]);

  const { pressedClassName, rippleContainerProps, handlers } =
    useElementInteraction<HTMLLIElement>({
      onBlur,
      onClick(event) {
        onClick?.(event);
        if (event.isPropagationStopped()) {
          return;
        }

        toggleTreeItemSelection(itemId);
        if (!isLeafNode && expansionMode !== "manual") {
          toggleTreeItemExpansion(itemId);
        }
      },
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onDragStart,
      onTouchStart,
      onTouchEnd,
      onTouchMove,
      disabled,
    });

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
      {...liProps}
      role="none"
      className={treeItem({
        className,
        expander: !!childItems,
        expanderLeft,
      })}
    >
      <ContentComponent
        {...remaining}
        aria-expanded={(!isLeafNode && expanded) || undefined}
        aria-selected={selected || undefined}
        aria-disabled={disabled || undefined}
        id={id}
        ref={contentRef}
        role="treeitem"
        tabIndex={-1}
        {...handlers}
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
          threeLines={threeLines}
          textClassName={textClassName}
          secondaryTextClassName={secondaryTextClassName}
          disableTextChildren={disableTextChildren}
          primaryText={primaryText}
          textProps={textProps}
          secondaryText={secondaryText}
          secondaryTextProps={secondaryTextProps}
          leftAddon={
            <TreeItemExpander
              left
              itemId={itemId}
              addon={leftAddon}
              expanded={expanded}
              disabled={disabled}
              isLeafNode={isLeafNode}
            />
          }
          leftAddonType={leftAddonType}
          leftAddonPosition={leftAddonPosition}
          leftAddonClassName={treeItemMedia({
            isLeafNode,
            isMediaLeftAddon,
            className: leftAddonClassName,
          })}
          leftAddonForceWrap={leftAddonForceWrap}
          rightAddon={
            <TreeItemExpander
              itemId={itemId}
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
        aria-labelledby={groupProps?.["aria-label"] ? undefined : id}
        id={`${id}-group`}
        temporary={temporaryChildItems}
        disableTransition={disableTransition}
        {...groupProps}
        depth={depth - 1}
        collapsed={isLeafNode || !expanded}
      >
        {childItems}
      </TreeGroup>
    </li>
  );
}
