import * as React from "react";
import * as PropTypes from "prop-types";
import { List, IListProps } from "@react-md/list";

export type TreeViewElement = HTMLUListElement | HTMLOListElement;

import { ITreeItem } from "./TreeItem";

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

export interface ITreeViewData {
  [key: string]: any;
  itemId: string;
  children?: ITreeViewData[];
}

export interface ITreeViewItem extends ITreeItem {
  item: ITreeViewData;
}

export interface ITreeViewProps extends IListProps {
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
  data: ITreeViewData[];
  selectedId?: string;
  defaultSelectedId?: string;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  treeItemRenderer: (item: ITreeViewItem) => React.ReactNode;
  treeViewRenderer: (treeView: ITreeView) => React.ReactNode;

  disableSiblingExpansion?: boolean;

  onItemSelect?: (itemId: string) => void;
  onItemExpandedChange?: (itemId: string, expanded: boolean) => void;
  onSiblingExpansion?: (expandedIds: string[]) => void;
}

export interface ITreeViewDefaultProps {
  defaultSelectedId: string;
  defaultExpandedIds: string[];
  disableSiblingExpansion: boolean;
}

export type TreeViewWithDefaultProps = ITreeViewProps & ITreeViewDefaultProps;

export interface ITreeViewState {
  selectedId: string;
  expandedIds: string[];
}

export default class TreeView extends React.Component<ITreeViewProps, ITreeViewState> {
  public static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  public static defaultProps: ITreeViewDefaultProps = {
    defaultSelectedId: "",
    defaultExpandedIds: [],
    disableSiblingExpansion: false,
  };

  private treeEl: TreeViewElement | null;
  private treeItems: HTMLElement[];
  constructor(props: ITreeViewProps) {
    super(props);

    const { defaultExpandedIds, defaultSelectedId, data } = props as TreeViewWithDefaultProps;
    this.state = {
      expandedIds: defaultExpandedIds,
      selectedId: defaultSelectedId || (data.length >= 1 ? data[0].itemId : ""),
    };
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
    } = this.props;
    return treeViewRenderer({
      id,
      style,
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      role: "treeview",
      onKeyDown: this.handleKeyDown,
      children: this.renderChildren(data, 0),
    });
  }

  private handleKeyDown = (event: React.KeyboardEvent<TreeViewElement>) => {
    console.log("event.key:", event.key);
    console.log("this.treeItems:", this.treeItems);
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
      default:
    }
  };

  private toggleFrom = (element: HTMLElement, expanded: boolean) => {
    const item = this.findItemFromElement(element);
    if (!item) {
      return;
    }

    this.handleItemExpandedChange(item.itemId, expanded);
  };

  private openAllRelatedNodes = (item: HTMLElement) => {
    if (!this.treeEl || this.props.disableSiblingExpansion) {
      return;
    }

    const items = item.parentElement === this.treeEl ? this.props.data : this.findParentItemsFromItem(item);
    const oldExpandedIds = this.props.expandedIds || this.state.expandedIds;

    let changed = false;
    const newExpandedIds = items.reduce((list, { itemId }) => {
      if (list.indexOf(itemId) === -1) {
        list.push(itemId);
        changed = true;
      }
      return list;
    }, oldExpandedIds.slice());

    if (!changed) {
      return;
    }

    if (this.props.onSiblingExpansion) {
      this.props.onSiblingExpansion(newExpandedIds);
    }

    if (!this.props.expandedIds) {
      this.setState({ expandedIds: newExpandedIds });
    }
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
      if (!temp.children) {
        break;
      }

      list = temp.children;
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
      if (!temp.children) {
        return [];
      }

      list = temp.children;
    }

    return list.filter(({ children }) => !!children);
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

  private renderChildren = (data: ITreeViewData[], depth: number): React.ReactNode => {
    const setSize = data.length;

    return data.map((item, index) => {
      const { itemId, children } = item;
      const selected = this.isSelected(itemId);
      return this.props.treeItemRenderer({
        "aria-expanded": undefined,
        "aria-level": depth,
        "aria-setsize": setSize,
        "aria-posinset": index + 1,
        item,
        key: itemId,
        role: "treeitem",
        tabIndex: selected ? 0 : -1,
        selected,
        expanded: this.isExpanded(itemId),
        onItemSelect: this.handleItemSelect,
        onItemExpandedChange: this.handleItemExpandedChange,
        renderChildren: children ? () => this.renderChildren(children, depth + 1) : undefined,
      });
    });
  };

  private handleItemSelect = (itemId: string) => {
    if (this.props.onItemSelect) {
      this.props.onItemSelect(itemId);
    }

    if (typeof this.props.selectedId === "undefined" && this.state.selectedId !== itemId) {
      this.setState({ selectedId: itemId });
    }
  };

  private handleItemExpandedChange = (itemId: string, expanded: boolean) => {
    if (this.props.onItemExpandedChange) {
      this.props.onItemExpandedChange(itemId, expanded);
    }

    if (typeof this.props.expandedIds === "undefined") {
      const expandedIds = this.state.expandedIds.slice();
      const i = expandedIds.indexOf(itemId);
      if (expanded && i === -1) {
        expandedIds.push(itemId);
      } else if (!expanded && i !== -1) {
        expandedIds.splice(i, 1);
      }

      if (expandedIds.length !== this.state.expandedIds.length) {
        this.setState({ expandedIds });
      }
    }
  };

  private isSelected = (itemId: string) => {
    let { selectedId } = this.state;
    if (typeof this.props.selectedId === "string") {
      selectedId = this.props.selectedId;
    }

    return itemId === selectedId;
  };

  private isExpanded = (itemId: string) => {
    const ids = this.props.expandedIds || this.state.expandedIds;
    return ids.indexOf(itemId) !== -1;
  };
}
