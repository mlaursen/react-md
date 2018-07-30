import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { List, IListProps } from "@react-md/list";

export type TreeViewElement = HTMLUListElement | HTMLOListElement;

import { default as TreeItem, ITreeItemProps, ITreeItemData } from "./TreeItem";

export interface ITreeViewLinkAttributeMapper {
  [key: string]: string;
}

export interface ITreeView {
  id: string;
  style?: React.CSSProperties;
  className?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  dense?: boolean;
  inline?: boolean;
  ordered?: boolean;
  role: "treeview";
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<TreeViewElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<TreeViewElement>) => void;
}

export interface ITreeViewItem extends ITreeItemProps {
  key: string;
}

export interface ITreeViewBaseProps extends IListProps {
  /**
   * The id for the tree view. This is required as it will be passes as a prop to the `treeViewRenderer`.
   *
   * @docgen
   */
  id: string;

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
  data: ITreeItemData[];

  /**
   * A function that will render the entire tree view. This should mostly remain the default implementation
   * of passing down to the `List` component, but it can be changed to something else if you need more flexibility
   * or functionality.
   *
   * @docgen
   */
  treeViewRenderer?: (treeView: ITreeView) => React.ReactNode;

  /**
   * A function that will render a specific tree item. The default implementation _should_ probably be good enough
   * for most use cases, but this can be updated if you need additional functionality.
   *
   * @docgen
   */
  treeItemRenderer?: (item: ITreeViewItem) => React.ReactNode;

  /**
   * A function to call that will return the children for a tree item. The default is to just return the `children`
   * attribute if it exists on the tree item.
   *
   * @docgen
   */
  treeItemChildrenRenderer?: (item: ITreeItemData) => React.ReactNode;

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
  onItemSelect?: (itemId: string) => void;

  /**
   * The function that should be called when a tree item's expansion value changes. The callback function
   * should be used to update the `expandedIds` prop to include or remove the provided `itemId`.
   *
   * @docgen
   */
  onItemExpandedChange?: (itemId: string, expanded: boolean) => void;

  /**
   * A function to call when the `disableSiblingExpansion` prop is not enabled and the user presses the `*`
   * key on a tree item to expand all related sibling nodes.
   *
   * @docgen
   */
  onSiblingExpansion?: (expandedIds: string[]) => void;

  /**
   * The component to render link tree items as. This should really be the `Link` component from `react-router`
   * (or a similar link component from a routing library) or `"a"`.
   *
   * @docgen
   */
  linkComponent?: React.ReactType;

  /**
   * A function to call to get additional props to apply to a link when a tree item has `link: true`. This
   * prop is really only required so that you can easily render your links as a third-party library like
   * `react-router`. There are "sensible" defaults that will automatically extract the `to` and `href` props
   * if they exist and pass it down.
   *
   * @docgen
   * @see {@link #linkComponent}
   */
  getLinkProps?: (item: ITreeViewItem) => { [key: string]: any };
}

export interface ITreeViewProps extends ITreeViewBaseProps {
  /**
   * The current tree item id that is selected. This needs to be a valid tree item id so that the user can
   * tab focus into the entire tree view since the `selectedId` will be the only item within the tree view
   * has a tabIndex that allows tab focus.
   *
   * @docgen
   */
  selectedId: string;

  /**
   * A list of tree item ids that are currently expanded.
   *
   * @docgen
   */
  expandedIds: string[];
  onItemSelect: (itemId: string) => void;
  onItemExpandedChange: (itemId: string, expanded: boolean) => void;
  onSiblingExpansion: (expandedIds: string[]) => void;
}

export interface ITreeViewDefaultProps {
  linkComponent: React.ReactType;
  getLinkProps: (item: ITreeItemData) => { [key: string]: any };
  disableSiblingExpansion: boolean;
  treeViewRenderer: (treeView: ITreeView) => React.ReactNode;
  treeItemRenderer: (item: ITreeViewItem) => React.ReactNode;
  treeItemChildrenRenderer: (item: ITreeItemData) => React.ReactNode;
}

export type TreeViewWithDefaultProps = ITreeViewProps & ITreeViewDefaultProps;

export interface ITreeViewFoundItems {
  item: ITreeItemData | null;
  items: ITreeItemData[];
  element: HTMLElement;
}

export default class TreeView extends React.Component<ITreeViewProps, {}> {
  public static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    dense: PropTypes.bool,
    ordered: PropTypes.bool,
    inline: PropTypes.bool,
    id: PropTypes.string.isRequired,
    "aria-label": PropTypes.string,
    "aria-labelledby": PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        itemId: PropTypes.string.isRequired,
      })
    ).isRequired,
    selectedId: PropTypes.string.isRequired,
    expandedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    linkComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onItemSelect: PropTypes.func.isRequired,
    onItemExpandedChange: PropTypes.func.isRequired,
    onSiblingExpansion: PropTypes.func.isRequired,
    disableSiblingExpansion: PropTypes.bool,
    treeViewRenderer: PropTypes.func,
    treeItemRenderer: PropTypes.func,
    treeItemChildrenRenderer: PropTypes.func,
  };

  public static defaultProps: ITreeViewDefaultProps = {
    linkComponent: "a",
    getLinkProps: item => ({
      href: item.href,
      to: item.to,
    }),
    disableSiblingExpansion: false,
    treeViewRenderer: props => <List {...props} />,
    treeItemRenderer: props => <TreeItem {...props} />,
    treeItemChildrenRenderer: ({ children }) => children,
  };

  public static findTreeItemFromElement(element: HTMLElement, data: ITreeItemData[], treeEl: TreeViewElement | null) {
    const itemElement = TreeView.findTreeItemElement(element);
    if (!treeEl || !itemElement) {
      return null;
    }
    const itemIndex = parseInt(itemElement.getAttribute("aria-posinset") || "", 10) - 1;

    return TreeView.findTreeItemDataList(TreeView.buildItemIndexStack(itemElement, treeEl), data)[itemIndex] || null;
  }

  public static findTreeItemsFromElement(element: HTMLElement, data: ITreeItemData[], treeEl: TreeViewElement | null) {
    const itemElement = TreeView.findTreeItemElement(element);
    if (!treeEl || !itemElement) {
      return [];
    }

    return TreeView.findTreeItemDataList(TreeView.buildItemIndexStack(itemElement, treeEl), data);
  }

  private static findTreeItemElement(element: HTMLElement) {
    if (element.getAttribute("role") !== "treeitem") {
      const closest = element.closest('[role="treeitem"]') as HTMLElement;
      if (!closest) {
        return null;
      }

      element = closest;
    }

    return element;
  }

  private static findTreeItemDataList(stack: number[], data: ITreeItemData[]) {
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
  constructor(props: ITreeViewProps) {
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
      id,
      "aria-labelledby": ariaLabelledBy,
      "aria-label": ariaLabel,
      style,
      className,
      treeViewRenderer,
      inline,
      dense,
      ordered,
      data,
    } = this.props as TreeViewWithDefaultProps;

    return treeViewRenderer({
      id,
      style,
      className: cn("rmd-tree-view", className),
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      inline,
      dense,
      ordered,
      role: "treeview",
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      children: this.renderChildTreeItems(data, 0),
    });
  }

  private handleClick = (event: React.MouseEvent<TreeViewElement>) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    this.handleClickFrom(event);
  };

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
    const { selectedId, onItemSelect, expandedIds, onItemExpandedChange } = this.props;

    if (selectedId !== itemId) {
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
    const { data, disableSiblingExpansion, onSiblingExpansion, expandedIds } = this.props;
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

    onSiblingExpansion(newExpandedIds);
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
      linkComponent: propLinkComponent,
      getLinkProps,
      selectedId,
      expandedIds,
      onItemSelect,
      onItemExpandedChange,
      treeItemRenderer,
      treeItemChildrenRenderer,
    } = this.props as TreeViewWithDefaultProps;
    const setSize = data.length;

    return data.map((item, index) => {
      const { itemId, childItems, link, leftIcon, rightIcon } = item;
      const selected = selectedId === itemId;
      const expanded = expandedIds.indexOf(itemId) !== -1;
      const linkComponent = item.linkComponent || propLinkComponent;

      return treeItemRenderer({
        "aria-expanded": expanded ? "true" : undefined,
        "aria-level": depth,
        "aria-setsize": setSize,
        "aria-posinset": index + 1,
        key: itemId,
        itemId,
        link,
        linkComponent,
        leftIcon,
        rightIcon,
        linkProps: link ? getLinkProps(item) : undefined,
        role: "treeitem",
        tabIndex: selected ? 0 : -1,
        selected,
        expanded,
        updateTreeItems: this.updateTreeItems,
        children: treeItemChildrenRenderer(item),
        renderChildItems: childItems ? () => this.renderChildTreeItems(childItems, depth + 1) : undefined,
      });
    });
  };
}
