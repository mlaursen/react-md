import React, {
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import cn from "classnames";
import { FontIcon } from "@react-md/icon";
import { List } from "@react-md/list";
import { WithForwardedRef } from "@react-md/utils";
import {
  KeyboardFocusChangeEvent,
  useKeyboardFocusEventHandler,
  useSearchEventHandler,
} from "@react-md/wia-aria";

import TreeItem from "./TreeItem";
import { TreeDataList, TreeElement, TreeProps } from "./types.d";
import findTreeItemElement from "./utils/findTreeItemElement";
import findTreeItemFromElement from "./utils/findTreeItemFromElement";

export interface TreeWithLabel extends TreeProps {
  "aria-label": string;
}

export interface TreeWithLabelledBy extends TreeProps {
  "aria-labelledby": string;
}

type WithRef = WithForwardedRef<TreeElement>;
type DefaultProps = Required<
  Pick<
    TreeProps,
    | "searchResetTime"
    | "multiSelect"
    | "selectOnFocus"
    | "disableGroupSelection"
    | "disableSiblingExpansion"
    | "expanderIcon"
    | "treeRenderer"
    | "itemRenderer"
    | "getItemId"
    | "defaultActiveId"
  >
>;
type WithDefaultProps = TreeProps & DefaultProps & WithRef;
type RequiredTreeProps = TreeWithLabel | TreeWithLabelledBy;

const Tree: FunctionComponent<RequiredTreeProps & WithRef> = providedProps => {
  const {
    className,
    onKeyDown,
    selectedIds,
    expandedIds,
    onItemSelect,
    onItemExpandedChange,
    onMultipleItemExpansion,
    onMultipleItemSelection,
    multiSelect,
    selectOnFocus,
    disableGroupSelection,
    disableSiblingExpansion,
    disableFontIconTextCheck,
    searchResetTime,
    getItemId,
    data,
    expanderIcon,
    treeRenderer,
    itemRenderer,
    defaultActiveId,
    forwardedRef,
    ...props
  } = providedProps as WithDefaultProps;

  const [activeId, setActiveId] = useState(defaultActiveId);
  const [isTreeFocused, setTreeFocused] = useState(false);

  const onKeyboardFocus: KeyboardFocusChangeEvent = (value, event) => {
    setActiveId(value.element.id);
    // allows for the current active descendant to be visible if there
    // is scrolling enabled..
    value.element.focus();
    event.currentTarget.focus();
  };

  let { handlers } = useKeyboardFocusEventHandler<
    TreeElement,
    Required<Pick<HTMLAttributes<TreeElement>, "onClick">>
  >({
    handlers: {
      onKeyDown: event => {
        if (onKeyDown) {
          onKeyDown(event);
        }

        const { key } = event;
        if (key === " " || key === "Enter") {
          if (key === " ") {
            event.preventDefault();

            if (!multiSelect) {
              return;
            }
          }

          const active = document.getElementById(activeId);
          if (active) {
            active.click();
          }
          const tree = event.currentTarget;
          window.requestAnimationFrame(() => tree.focus());
        } else if (key === "ArrowLeft" || key === "ArrowRight") {
          const item = findTreeItemFromElement(
            document.getElementById(activeId) as HTMLElement,
            data,
            event.currentTarget
          );
          if (!item || !item.childItems || !item.childItems) {
            return;
          }

          const expand = key === "ArrowRight";
          const isExpanded = expandedIds.includes(item.itemId);
          if (expand !== isExpanded) {
            onItemExpandedChange(item.itemId, expand);
          }
        }
      },
      onClick: event => {
        if (!event.target) {
          return;
        }

        const element = findTreeItemElement(event.target as HTMLElement);
        if (!element) {
          return;
        }

        const item = findTreeItemFromElement(
          element,
          data,
          event.currentTarget
        );
        if (!item) {
          return;
        }

        const { itemId } = item;
        // make sure parent groups aren't opened or closed as well.
        event.stopPropagation();
        if (item.childItems) {
          const i = expandedIds.indexOf(itemId);
          onItemExpandedChange(itemId, i === -1);
        }

        // the event will not be trusted if it happens after the enter keypress. When
        // that happens, we only want the `onItemSelect` to be called when it is not already
        // selected as Enter will only select -- not toggle
        if (
          (!disableGroupSelection || !item.childItems) &&
          (event.isTrusted || !selectedIds.includes(itemId))
        ) {
          onItemSelect(itemId);
        }

        setActiveId(element.id);
      },
    },
    onKeyboardFocus,
  });

  ({ handlers } = useSearchEventHandler({
    handlers,
    onKeyboardFocus,
    searchResetTime,
  }));

  useEffect(() => {
    if (activeId) {
      return;
    }
  }, []);

  const renderChildItems = (
    data: TreeDataList,
    depth: number,
    prefix: string
  ): ReactNode => {
    const listSize = data.length;
    return data.map((item, i) => {
      const { itemId, childItems } = item;
      const id = getItemId({
        itemId,
        treeId: props.id,
        itemIndex: i,
        prefix,
      });
      const selected = selectedIds.includes(itemId);
      const expanded = expandedIds.includes(itemId);
      const focused = isTreeFocused && activeId === id;

      return itemRenderer(
        {
          key: itemId,
          id,
          depth,
          listSize,
          itemIndex: i,
          selected,
          expanded,
          focused,
          renderChildItems: childItems
            ? () => renderChildItems(childItems, depth + 1, `${prefix}-${i}`)
            : undefined,
        },
        item,
        providedProps as WithDefaultProps
      );
    });
  };

  return treeRenderer({
    ...props,
    ref: forwardedRef,
    ...handlers,
    onKeyUp: event => {
      if (!isTreeFocused) {
        setTreeFocused(true);
      }

      if (
        !event.target ||
        event.target !== event.currentTarget ||
        event.key !== "Tab" ||
        event.shiftKey
      ) {
        return;
      }
    },
    onMouseDown: event => {
      if (props.onMouseDown) {
        props.onMouseDown(event);
      }

      if (isTreeFocused) {
        setTreeFocused(false);
      }
    },
    onBlur: event => {
      if (props.onBlur) {
        props.onBlur(event);
      }

      if (!event.target || !event.currentTarget.contains(event.target)) {
        setTreeFocused(false);
      }
    },
    tabIndex: 0,
    "aria-activedescendant": activeId,
    role: "tree",
    className: cn("rmd-tree", className),
    children: renderChildItems(data, 0, ""),
  });
};

const defaultProps: DefaultProps = {
  defaultActiveId: "",
  searchResetTime: 500,
  multiSelect: false,
  selectOnFocus: false,
  disableGroupSelection: false,
  disableSiblingExpansion: false,
  expanderIcon: <FontIcon>keyboard_arrow_down</FontIcon>,
  getItemId: ({ treeId, itemIndex, prefix }) =>
    `${treeId}-item${prefix}-${itemIndex}`,
  treeRenderer: props => <List {...props} />,
  itemRenderer: (
    props,
    { leftIcon, rightIcon, children, contentComponent, to, href },
    { expanderIcon, expanderLeft }
  ) => (
    <TreeItem
      {...props}
      expanderLeft={expanderLeft}
      expanderIcon={expanderIcon}
      contentComponent={contentComponent}
      to={to}
      href={href}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    >
      {children}
    </TreeItem>
  ),
};

Tree.defaultProps = defaultProps;

export default forwardRef<TreeElement, RequiredTreeProps>((props, ref) => (
  <Tree {...props} forwardedRef={ref} />
));
