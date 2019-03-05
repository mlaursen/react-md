import React, {
  FunctionComponent,
  ReactElement,
  useState,
  forwardRef,
  ReactNode,
  HTMLAttributes,
} from "react";
import cn from "classnames";
import { FontIcon } from "@react-md/icon";
import { List } from "@react-md/list";
import {
  useKeyboardFocusEventHandler,
  KeyboardFocusChangeEvent,
  useSearchEventHandler,
  useKeyboardFocusContext,
} from "@react-md/wia-aria";

import {
  ITreeProps,
  TreeRenderer,
  TreeElement,
  TreeItemRenderer,
  TreeDataList,
  GetItemId,
} from "./types.d";
import TreeItem from "./TreeItem";
import findTreeItemFromElement from "./utils/findTreeItemFromElement";
import findTreeItemElement from "./utils/findTreeItemElement";

interface ITreeDefaultProps {
  searchResetTime: number;
  multiSelect: boolean;
  selectOnFocus: boolean;
  disableGroupSelection: boolean;
  disableSiblingExpansion: boolean;
  expanderIcon: ReactElement<any>;
  treeRenderer: TreeRenderer;
  itemRenderer: TreeItemRenderer;
  getItemId: GetItemId;
}

type TreeWithDefaultProps = ITreeProps & ITreeDefaultProps;

export interface ITreeWithLabel extends ITreeProps {
  "aria-label": string;
}

export interface ITreeWithLabelledBy extends ITreeProps {
  "aria-labelledby": string;
}

type TreeProps = ITreeWithLabel | ITreeWithLabelledBy;

const Tree: FunctionComponent<TreeProps> = providedProps => {
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
    ...props
  } = providedProps as TreeWithDefaultProps;

  const [activeId, setActiveId] = useState<string>(() => {
    if (selectedIds.length >= 1) {
      return selectedIds[0];
    } else if (data[0]) {
      return data[0].itemId;
    }

    return "";
  });

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
        const tree = event.currentTarget;
        window.requestAnimationFrame(() => tree.focus());
      },
    },
    onKeyboardFocus,
  });

  ({ handlers } = useSearchEventHandler({
    handlers,
    onKeyboardFocus,
    searchResetTime,
  }));

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
        depth,
        itemIndex: i,
        prefix,
      });
      const selected = selectedIds.includes(itemId);
      const expanded = expandedIds.includes(itemId);
      const focused = activeId === id;

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
        providedProps as TreeWithDefaultProps
      );
    });
  };

  return treeRenderer({
    ...props,
    ...handlers,
    onKeyUp: event => {
      if (
        !event.target ||
        event.target !== event.currentTarget ||
        event.key !== "Tab" ||
        event.shiftKey
      ) {
        return;
      }
    },
    tabIndex: 0,
    "aria-activedescendant": activeId,
    role: "tree",
    className: cn("rmd-tree", className),
    children: renderChildItems(data, 0, ""),
  });
};

const defaultProps: ITreeDefaultProps = {
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

export default forwardRef<TreeElement, TreeProps>((props, ref) => (
  <Tree {...props} forwardedRef={ref} />
));
