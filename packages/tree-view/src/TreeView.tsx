import * as React from "react";
import * as PropTypes from "prop-types";
import { List, IListProps } from "@react-md/list";

export type TreeViewElement = HTMLUListElement | HTMLOListElement;

import { default as TreeItem, ITreeItemProps, ITreeItemData } from "./TreeItem";

export interface ITreeView {
  id: string;
  style?: React.CSSProperties;
  className?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  role: "treeview";
  children: React.ReactNode;
  onKeyDown: (event: React.KeyboardEvent<TreeViewElement>) => void;
}

export interface ITreeViewItem extends ITreeItemProps {
  key: string;
  item: ITreeItemData;
}

export interface ITreeViewProps extends IListProps {
  /**
   * The id for the tree view. This is required as it will be passes as a prop to the `treeViewRenderer`.
   */
  id: string;

  /**
   * An optional id that points to an element that labels this tree. Either this or the `aria-label`
   * prop are required for a11y.
   */
  "aria-labelledby"?: string;

  /**
   * An optional label string that describes this tree. Either this or the `aria-labelledby` prop are
   * required for a11y.
   */
  "aria-label"?: string;

  /**
   * A list of data that should be transformed into a tree view.
   */
  data: ITreeItemData[];

  /**
   * The current tree item id that is selected. This needs to be a valid tree item id so that the user can
   * tab focus into the entire tree view since the `selectedId` will be the only item within the tree view
   * has a tabIndex that allows tab focus.
   */
  selectedId: string;

  /**
   * A list of tree item ids that are currently expanded.
   */
  expandedIds: string[];

  /**
   *
   */
  treeViewRenderer?: (treeView: ITreeView) => React.ReactNode;

  /**
   *
   */
  treeItemRenderer?: (item: ITreeViewItem) => React.ReactNode;

  /**
   *
   */
  treeItemChildrenRenderer?: (item: ITreeItemData) => React.ReactNode;

  /**
   * Boolean if the functionality for opening all siblings at the same level when the asterisk (`*`) key is pressed
   * should be disabled.
   */
  disableSiblingExpansion?: boolean;

  /**
   * The function that should be called when a new tree item is selected. The callback function should
   * be used to update the `selectedId` prop to the provided `itemId`.
   */
  onItemSelect: (itemId: string) => void;

  /**
   * The function that should be called when a tree item's expansion value changes. The callback function
   * should be used to update the `expandedIds` prop to include or remove the provided `itemId`.
   */
  onItemExpandedChange: (itemId: string, expanded: boolean) => void;

  /**
   * A function to call when the `disableSiblingExpansion` prop is not enabled and the user presses the `*`
   * key on a tree item to expand all related sibling nodes.
   */
  onSiblingExpansion: (expandedIds: string[]) => void;
}

export interface ITreeViewDefaultProps {
  disableSiblingExpansion: boolean;
  treeViewRenderer: (treeView: ITreeView) => React.ReactNode;
  treeItemRenderer: (item: ITreeViewItem) => React.ReactNode;
  treeItemChildrenRenderer: (item: ITreeItemData) => React.ReactNode;
}

export type TreeViewWithDefaultProps = ITreeViewProps & ITreeViewDefaultProps;

export default class TreeView extends React.Component<ITreeViewProps, {}> {
  public static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  public static defaultProps: ITreeViewDefaultProps = {
    disableSiblingExpansion: false,
    treeViewRenderer: props => <List {...props} />,
    treeItemRenderer: props => <TreeItem {...props} />,
    treeItemChildrenRenderer: ({ children }) => children,
  };

  private treeEl: TreeViewElement | null;
  private treeItems: HTMLElement[];
  constructor(props: ITreeViewProps) {
    super(props);

    this.treeEl = null;
    this.treeItems = [];
  }

  public componentDidMount() {
    this.treeEl = document.getElementById(this.props.id) as TreeViewElement | null;
    if (!this.treeEl) {
      throw new Error("Unable to find a tree element");
    }
  }

  public render() {
    const {
      id,
      "aria-labelledby": ariaLabelledBy,
      "aria-label": ariaLabel,
      style,
      className,
      treeViewRenderer,
      data,
    } = this.props as TreeViewWithDefaultProps;

    return treeViewRenderer({
      id,
      style,
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      role: "treeview",
      onKeyDown: this.handleKeyDown,
      children: this.renderChildTreeItems(data, 0),
    });
  }

  private handleKeyDown = (event: React.KeyboardEvent<TreeViewElement>) => {
    switch (event.key) {
      case "Home":
      case "End":
        event.preventDefault();
        event.stopPropagation();
        this.focus(event.key === "Home" ? 0 : this.treeItems.length - 1);
        break;
      case "ArrowUp":
      case "ArrowDown":
        event.preventDefault();
        this.focusFrom(event.target as HTMLElement, event.key === "ArrowDown");
        break;
      case "ArrowLeft":
      case "ArrowRight":
        event.preventDefault();
        this.toggleFrom(event.target as HTMLElement, event.key === "ArrowRight");
        break;
      case "*":
        this.openAllRelatedNodes(event.target as HTMLElement);
        break;
      default:
    }
  };

  private toggleFrom = (element: HTMLElement, expanded: boolean) => {
    const item = this.findItemFromElement(element);
    if (!item) {
      return;
    }

    const { expandedIds, onItemExpandedChange } = this.props;
    const i = expandedIds.indexOf(item.itemId);
    if (expanded ? i !== -1 : i === -1) {
      onItemExpandedChange(item.itemId, expanded);
    }
  };

  private openAllRelatedNodes = (item: HTMLElement) => {
    const { data, disableSiblingExpansion, onSiblingExpansion, expandedIds } = this.props;
    if (!this.treeEl || disableSiblingExpansion) {
      return;
    }

    const items = item.parentElement === this.treeEl ? data : this.findParentItemsFromItem(item);

    let changed = false;
    const newExpandedIds = items.reduce((list, { itemId }) => {
      if (list.indexOf(itemId) === -1) {
        list.push(itemId);
        changed = true;
      }
      return list;
    }, expandedIds.slice());

    if (!changed) {
      return;
    }

    onSiblingExpansion(newExpandedIds);
  };

  private findItemFromElement = (item: HTMLElement) => {
    if (!this.treeEl) {
      return null;
    }

    const i = parseInt(item.getAttribute("aria-posinset") || "", 10) - 1;
    if (i < 0) {
      return null;
    }

    // Since this is only working with the DOM at this point, create a stack of treeitem indexes as they would
    // appear in `this.props.items` array so that a list of all item ids on the same level as this item can be
    // generated. Luckily, all this information is provided by the `aria-posinset` which we can just subtract
    // 1 from so it is the index within the items array.
    const itemIndexStack = [];
    let node: HTMLElement | null = item.parentElement;
    while (node && this.treeEl.contains(node)) {
      const position = parseInt(node.getAttribute("aria-posinset") || "", 10);
      if (node.getAttribute("role") === "treeitem" && position > 0) {
        itemIndexStack.unshift(position - 1);
      }

      node = node.parentElement;
    }

    let temp;
    let list = this.props.data;
    for (const index of itemIndexStack) {
      temp = list[index];
      if (!temp.childItems) {
        break;
      }

      list = temp.childItems;
    }

    return list[i];
  };

  private findParentItemsFromItem = (item: HTMLElement) => {
    if (!this.treeEl) {
      return [];
    }

    // Since this is only working with the DOM at this point, create a stack of treeitem indexes as they would
    // appear in `this.props.items` array so that a list of all item ids on the same level as this item can be
    // generated. Luckily, all this information is provided by the `aria-posinset` which we can just subtract
    // 1 from so it is the index within the items array.
    const itemIndexStack = [];

    // don't need to add the current element into the stack since it will automatically be included once the
    // parent indexes are found
    let node: HTMLElement | null = item.parentElement;
    while (node && this.treeEl.contains(node)) {
      const position = parseInt(node.getAttribute("aria-posinset") || "", 10);
      if (node.getAttribute("role") === "treeitem" && position > 0) {
        itemIndexStack.unshift(position - 1);
      }

      node = node.parentElement;
    }

    itemIndexStack.pop();

    let temp;
    let list = this.props.data;
    for (const index of itemIndexStack) {
      temp = list[index];
      if (!temp.childItems) {
        return [];
      }

      list = temp.childItems;
    }

    return list.filter(({ childItems }) => !!childItems);
  };

  private focus = (index: number) => {
    index = Math.max(0, Math.min(this.treeItems.length - 1, index));

    const item = this.treeItems[index];
    if (item) {
      item.focus();
    }
  };

  private focusFrom = (item: HTMLElement, increment: boolean) => {
    const currentIndex = this.treeItems.indexOf(item);
    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex + (increment ? 1 : -1);
    if (nextIndex < 0) {
      nextIndex = this.treeItems.length - 1;
    } else if (nextIndex >= this.treeItems.length) {
      nextIndex = 0;
    }
    this.focus(nextIndex);
  };

  private renderChildTreeItems = (data: ITreeItemData[], depth: number): React.ReactNode => {
    const {
      selectedId,
      expandedIds,
      onItemSelect,
      onItemExpandedChange,
      treeItemRenderer,
      treeItemChildrenRenderer,
    } = this.props as TreeViewWithDefaultProps;
    const setSize = data.length;

    return data.map((item, index) => {
      const { itemId, childItems } = item;
      const selected = selectedId === itemId;
      const expanded = expandedIds.indexOf(itemId) !== -1;

      return treeItemRenderer({
        "aria-expanded": expanded ? "true" : undefined,
        "aria-level": depth,
        "aria-setsize": setSize,
        "aria-posinset": index + 1,
        item,
        key: itemId,
        role: "treeitem",
        tabIndex: selected ? 0 : -1,
        selected,
        expanded,
        initItem: this.initItem,
        deinitItem: this.deinitItem,
        onItemSelect,
        onItemExpandedChange,
        renderChildren: treeItemChildrenRenderer,
        renderChildItems: childItems ? () => this.renderChildTreeItems(childItems, depth + 1) : undefined,
      });
    });
  };

  private initItem = (itemId: string, item: HTMLElement) => {
    if (this.treeItems.indexOf(item) === -1) {
      this.treeItems.push(item);
    }
  };

  private deinitItem = (itemId: string, item: HTMLElement) => {
    const i = this.treeItems.indexOf(item);
    if (i !== -1) {
      this.treeItems.splice(i, 1);
    }
  };
}
