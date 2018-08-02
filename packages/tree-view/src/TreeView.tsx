import * as React from "react";
import cn from "classnames";
import { List, IListProps } from "@react-md/list";

import {
  ILazyKey,
  TreeViewElement,
  TreeViewData,
  TreeViewDataList,
  ITreeViewItemInjectedProps,
  ITreeViewInjectedProps,
  treeViewRenderer,
  treeItemRenderer,
  onItemSelect,
  onItemExpandedChange,
  onItemSiblingExpansion,
} from "./types";
import DefaultTreeItemRenderer from "./DefaultTreeItemRenderer";

export interface ITreeViewBaseProps<D, R> {
  /**
   * The id for the tree view. This is required as it will be passes as a prop to the `treeViewRenderer`.
   *
   * @docgen
   */
  id: string;

  /**
   * An optional style that will get passed down to the `treeViewRenderer`.
   *
   * @docgen
   */
  style?: React.CSSProperties;

  /**
   * An optional style that will get merged and passed down to the `treeViewRenderer`.
   *
   * @docgen
   */
  className?: string;

  /**
   * An optional id that points to an element that labels this tree. Either this or the `aria-label`
   * prop are required for a11y.
   *
   * @docgen
   */
  "aria-labelledby"?: string;

  /**
   * An optional label string that describes this tree. Either this or the `aria-labelledby` prop are
   * required for a11y.
   *
   * @docgen
   */
  "aria-label"?: string;

  /**
   * A list of data that should be transformed into a tree view.
   *
   * @docgen
   */
  data: Array<TreeViewData<D>>;

  /**
   * A function that will render the entire tree view. This should mostly remain the default implementation
   * of passing down to the `List` component, but it can be changed to something else if you need more flexibility
   * or functionality.
   *
   * @docgen
   */
  treeViewRenderer?: treeViewRenderer<R>;

  /**
   * A function that will render a specific tree item. The default implementation _should_ probably be good enough
   * for most use cases, but this can be updated if you need additional functionality.
   *
   * @docgen
   */
  treeItemRenderer?: treeItemRenderer<D>;

  /**
   * Boolean if the functionality for opening all siblings at the same level when the asterisk (`*`) key is pressed
   * should be disabled.
   *
   * @docgen
   */
  disableSiblingExpansion?: boolean;

  /**
   * The function that should be called when a new tree item is selected. The callback function should
   * be used to update the `selectedId` prop to the provided `itemId`.
   *
   * @docgen
   */
  onItemSelect?: onItemSelect;

  /**
   * The function that should be called when a tree item's expansion value changes. The callback function
   * should be used to update the `expandedIds` prop to include or remove the provided `itemId`.
   *
   * @docgen
   */
  onItemExpandedChange?: onItemExpandedChange;

  /**
   * A function to call when the `disableSiblingExpansion` prop is not enabled and the user presses the `*`
   * key on a tree item to expand all related sibling nodes.
   *
   * @docgen
   */
  onItemSiblingExpansion?: onItemSiblingExpansion;
}

export interface ITreeViewIdsProps {
  /**
   * A list of tree item ids that are currently selected.
   *
   * @docgen
   */
  selectedIds: string[];

  /**
   * A list of tree item ids that are currently expanded.
   *
   * @docgen
   */
  expandedIds: string[];
}

export interface ITreeViewProps<D = ILazyKey, R = ILazyKey>
  extends ITreeViewBaseProps<D, R>,
    ITreeViewIdsProps,
    ILazyKey {
  onItemSelect: onItemSelect;
  onItemExpandedChange: onItemExpandedChange;
}

export type TreeViewPropsWithSiblingExpansion<D = ILazyKey, R = ILazyKey> = ITreeViewProps<D, R> & {
  onItemSiblingExpansion: onItemSiblingExpansion;
};

export interface ITreeViewDefaultProps<D = ILazyKey, R = ILazyKey> {
  disableSiblingExpansion: boolean;
  treeViewRenderer: treeViewRenderer<R>;
  treeItemRenderer: treeItemRenderer<D>;
}

export type TreeViewWithDefaultProps<D = ILazyKey, R = ILazyKey> = ITreeViewProps<D, R> & ITreeViewDefaultProps<D, R>;

export interface ITreeViewState {}

export default class TreeView<D = ILazyKey, R = ILazyKey> extends React.Component<
  ITreeViewProps<D, R>,
  ITreeViewState
> {
  public static defaultProps: ITreeViewDefaultProps<ILazyKey, ILazyKey> = {
    disableSiblingExpansion: false,
    treeViewRenderer: props => <List {...props} />,
    treeItemRenderer: ({ linkComponent, to, href, leftIcon, rightIcon, children }, props) => (
      <DefaultTreeItemRenderer
        {...props}
        linkComponent={linkComponent}
        to={to}
        href={href}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      >
        {children}
      </DefaultTreeItemRenderer>
    ),
  };

  public static findTreeItemFromElement<D = ILazyKey>(
    element: HTMLElement,
    data: TreeViewDataList<D>,
    treeEl: TreeViewElement | null
  ) {
    const itemElement = TreeView.findTreeItemElement(element);
    if (!treeEl || !itemElement) {
      return null;
    }
    const itemIndex = parseInt(itemElement.getAttribute("aria-posinset") || "", 10) - 1;

    return TreeView.findTreeItemDataList(TreeView.buildItemIndexStack(itemElement, treeEl), data)[itemIndex] || null;
  }

  public static findTreeItemsFromElement<D = ILazyKey>(
    element: HTMLElement,
    data: TreeViewDataList<D>,
    treeEl: TreeViewElement | null
  ) {
    const itemElement = TreeView.findTreeItemElement(element);
    if (!treeEl || !itemElement) {
      return [];
    }

    return TreeView.findTreeItemDataList(TreeView.buildItemIndexStack(itemElement, treeEl), data);
  }

  private static findTreeItemElement(element: HTMLElement) {
    const role = element.getAttribute("role");
    if (role === "group") {
      return null;
    } else if (role !== "treeitem") {
      const closest = element.closest('[role="treeitem"]') as HTMLElement;
      if (!closest) {
        return null;
      }

      element = closest;
    }

    return element;
  }

  private static findTreeItemDataList<D = ILazyKey>(stack: number[], data: TreeViewDataList<D>) {
    let temp;
    let list = data;
    for (const index of stack) {
      temp = list[index];
      if (!temp.childItems) {
        return [];
      }

      list = temp.childItems;
    }

    return list;
  }

  private static buildItemIndexStack(element: HTMLElement, treeEl: TreeViewElement) {
    // Since this is only working with the DOM at this point, create a stack of treeitem indexes as they would
    // appear in `this.props.data` array so that a list of all item ids on the same level as this item can be
    // generated. Luckily, all this information is provided by the `aria-posinset` which we can just subtract
    // 1 from so it is the index within the items array.
    const itemIndexStack = [];

    // don't need to add the current element into the stack since it will automatically be included once the
    // parent indexes are found
    let node: HTMLElement | null = element.parentElement;
    while (node && treeEl.contains(node)) {
      const position = parseInt(node.getAttribute("aria-posinset") || "", 10);
      if (node.getAttribute("role") === "treeitem" && position > 0) {
        itemIndexStack.unshift(position - 1);
      }

      node = node.parentElement;
    }

    return itemIndexStack;
  }

  private treeEl: TreeViewElement | null;
  private treeItems: HTMLElement[];
  private updateFrame?: number;
  constructor(props: ITreeViewProps<D, R>) {
    super(props);

    this.treeEl = null;
    this.treeItems = [];
  }

  public componentDidMount() {
    this.treeEl = document.getElementById(this.props.id) as TreeViewElement | null;
    this.updateTreeItems();
    if (!this.treeEl) {
      throw new Error("Unable to find a tree element");
    }
  }

  public componentWillUnmount() {
    if (this.updateFrame) {
      window.cancelAnimationFrame(this.updateFrame);
    }
  }

  public updateTreeItems = () => {
    if (this.updateFrame) {
      window.cancelAnimationFrame(this.updateFrame);
    }

    this.updateFrame = window.requestAnimationFrame(() => {
      this.updateFrame = undefined;
      if (this.treeEl) {
        this.treeItems = [].slice.call(this.treeEl.querySelectorAll('[role="treeitem"]'));
      } else {
        this.treeItems = [];
      }
    });
  };

  public render() {
    const {
      className,
      treeItemRenderer,
      treeViewRenderer,
      selectedIds,
      expandedIds,
      onItemSelect,
      onItemExpandedChange,
      onItemSiblingExpansion,
      disableSiblingExpansion,
      data,
      ...props
    } = this.props as TreeViewWithDefaultProps<D, R>;

    // TODO: try to fix typing or just be lazy and go to [key: string]: any
    // @ts-ignore
    return treeViewRenderer({
      ...props,
      role: "treeview",
      className: cn("rmd-tree-view", className),
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClickFrom,
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
      case " ":
      case "Enter":
        this.handleClickFrom(event);
        break;
      case "*":
        this.openAllRelatedNodes(event.target as HTMLElement);
        break;
      default:
    }
  };

  private handleClickFrom = (event: React.KeyboardEvent<TreeViewElement> | React.MouseEvent<TreeViewElement>) => {
    const element = event.target as HTMLElement;
    const item = TreeView.findTreeItemFromElement(element, this.props.data, this.treeEl);
    if (!item) {
      return;
    }

    const { itemId } = item;
    const { selectedIds, onItemSelect, expandedIds, onItemExpandedChange } = this.props;

    if (selectedIds.indexOf(itemId) === -1) {
      onItemSelect(itemId);
    }

    event.stopPropagation();
    if (event.type === "keydown") {
      event = event as React.KeyboardEvent<TreeViewElement>;
      if (event.key === " ") {
        event.preventDefault();
      }

      element.click();
    } else if (item.childItems) {
      const i = expandedIds.indexOf(itemId);
      onItemExpandedChange(itemId, i === -1);
    }
  };

  private toggleFrom = (element: HTMLElement, expanded: boolean) => {
    const item = TreeView.findTreeItemFromElement(element, this.props.data, this.treeEl);
    if (!item || !item.childItems) {
      return;
    }

    const { expandedIds, onItemExpandedChange } = this.props;
    const i = expandedIds.indexOf(item.itemId);
    if (expanded ? i === -1 : i !== -1) {
      onItemExpandedChange(item.itemId, expanded);
    }
  };

  private openAllRelatedNodes = (element: HTMLElement) => {
    const { data, disableSiblingExpansion, onItemSiblingExpansion, expandedIds } = this
      .props as TreeViewPropsWithSiblingExpansion<D, R>;

    if (!this.treeEl || disableSiblingExpansion) {
      return;
    }

    const items = TreeView.findTreeItemsFromElement(element, data, this.treeEl).filter(
      ({ childItems }) => !!childItems
    );

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

    onItemSiblingExpansion(newExpandedIds);
  };

  private focus = (index: number) => {
    index = Math.max(0, Math.min(this.treeItems.length - 1, index));

    const element = this.treeItems[index];
    if (element) {
      element.focus();
    }

    const { selectedIds, onItemSelect, data } = this.props;
    const item = TreeView.findTreeItemFromElement(element, data, this.treeEl);
    if (!item) {
      return;
    }

    const { itemId } = item;
    if (selectedIds.indexOf(itemId) === -1) {
      onItemSelect(itemId);
    }
  };

  private focusFrom = (element: HTMLElement, increment: boolean) => {
    const currentIndex = this.treeItems.indexOf(element);
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

  private renderChildTreeItems = (data: TreeViewDataList<D>, depth: number): React.ReactNode => {
    const { selectedIds, expandedIds, treeItemRenderer } = this.props as TreeViewWithDefaultProps<D, R>;
    const listSize = data.length;

    return data.map((item, i) => {
      const { itemId, childItems } = item;
      const selected = selectedIds.indexOf(itemId) !== -1;
      const expanded = expandedIds.indexOf(itemId) !== -1;

      return treeItemRenderer(item, {
        key: itemId,
        depth,
        listSize,
        itemIndex: i,
        selected,
        expanded,
        updateTreeItems: this.updateTreeItems,
        renderChildItems: childItems ? () => this.renderChildTreeItems(childItems, depth + 1) : undefined,
      });
    });
  };
}
