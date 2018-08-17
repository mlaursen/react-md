import * as React from "react";
import * as PropTypes from "prop-types";
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

/**
 * The `TreeView` component is used to create an accessible
 * [tree view widget](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) by adding the base required
 * click and keyboard listeners to the tree to open, close, and select tree items. However, the items will
 * not be opened, closed, or selected unless the provided `onItemSelect`, `onItemExpandedChange`, and
 * `onItemSiblingExpansion` props do not update the `expandedIds` and `selectedIds` props. There is a
 * `TreeViewControls` component that can be used to automatically handle this logic for you though.
 *
 * To make rendering the tree easy, there are decent defaults for rendering the entire `TreeView` and each
 * `TreeItem` that should work out of the box for simple tree views. However, this can be updated for more
 * complex trees that have drag and drop or other functionality built in.
 */
export default class TreeView<D = ILazyKey, R = ILazyKey> extends React.Component<ITreeViewProps<D, R>> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    "aria-label": PropTypes.string,
    "aria-labelledby": PropTypes.string,
    disableSiblingExpansion: PropTypes.bool,
    treeViewRenderer: PropTypes.func,
    treeItemRenderer: PropTypes.func,
    expandedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    onItemSelect: PropTypes.func.isRequired,
    onItemExpandedChange: PropTypes.func.isRequired,
    onItemSiblingExpansion: (props: ITreeViewProps, propName: string, component: string, ...args: any[]) => {
      if (!props.disableSiblingExpansion) {
        return PropTypes.func.isRequired(props, propName, component, ...args);
      }

      return null;
    },
    _a11yValidator: (props: ITreeViewProps, propName: string, component: string) => {
      const label = props["aria-label"];
      const labelledBy = props["aria-labelledby"];
      if (typeof label !== "string" && typeof labelledBy !== "string") {
        return new Error(
          `The \`${component}\` component requires either the \`aria-label\` or \`aria-labelledby\` props for ` +
            "accessibility but both were `undefined`."
        );
      } else if (typeof label === "string" && !label.length) {
        return new Error(
          `The \`${component}\` component requires an \`aria-label\` with a length greater than 0, but \`${label}\` ` +
            "was provided. "
        );
      } else if (typeof labelledBy === "string" && !labelledBy.length) {
        return new Error(
          `The \`${component}\` component requires an \`aria-labelledby\` with a length greater than 0, but ` +
            `\`${labelledBy}\` was provided.`
        );
      }

      return null;
    },
  };

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

  /**
   * Attempts to find the `TreeViewData` based on the provided `element` and `data`. This is generally
   * used for click or keyboard events to navigate and select different items within the `TreeView`
   * component internally, but can also be used to add additional custom click and keyboard handlers.
   *
   * Example:
   * ```html
   * <ul role="treeview" id="tree">
   *   <li role="treeitem" id="item-1">Item 1</li>
   *   <li role="treeitem" id="item-2">
   *     Item 2
   *     <ul role="group">
   *      <li role="treeitem" id="item-2-1">Item 2-1</li>
   *      <li role="treeitem" id="item-2-2">Item 2-2</li>
   *     </ul>
   *   </li>
   *   <li role="treeitem" id="item-3">Item 3</li>
   * ```
   *
   * ```js
   * const data = [{
   *   itemId: "item-1",
   *   children: "Item 1",
   * }, {
   *   itemId: "item-2",
   *   children: "Item 2",
   *   childItems: [{
   *     itemId: "item-2-1",
   *     children: "Item 2-1",
   *   }, {
   *    itemId: "item-2-2",
   *    children: "Item 2-2",
   *   }],
   * }];
   * const item = document.getElementById("item-2-1") as HTMLElement | null;
   * const tree = document.getElementByid("tree") as HTMLElement | null;
   * const foundItemData = TreeView.findTreeItemFromElement(item, data, tree);
   * // foundItemData = { itemId: "item-2-1", children: "Item 2-1" }
   * ```
   */
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

  /**
   * Attempts to find the `TreeViewDataList` based on the provided `element` and `data`. This is generally
   * used for click or keyboard events to navigate and select different items within the `TreeView`
   * component internally, but can also be used to add additional custom click and keyboard handlers.
   *
   * Example:
   * ```html
   * <ul role="treeview" id="tree">
   *   <li role="treeitem" id="item-1">Item 1</li>
   *   <li role="treeitem" id="item-2">
   *     Item 2
   *     <ul role="group">
   *      <li role="treeitem" id="item-2-1">Item 2-1</li>
   *      <li role="treeitem" id="item-2-2">Item 2-2</li>
   *     </ul>
   *   </li>
   *   <li role="treeitem" id="item-3">Item 3</li>
   * ```
   *
   * ```js
   * const data = [{
   *   itemId: "item-1",
   *   children: "Item 1",
   * }, {
   *   itemId: "item-2",
   *   children: "Item 2",
   *   childItems: [{
   *     itemId: "item-2-1",
   *     children: "Item 2-1",
   *   }, {
   *    itemId: "item-2-2",
   *    children: "Item 2-2",
   *   }],
   * }];
   * const item = document.getElementById("item-2-1") as HTMLElement | null;
   * const tree = document.getElementByid("tree") as HTMLElement | null;
   * const foundItemData = TreeView.findTreeItemFromElement(item, data, tree);
   * // foundItemData = [{ itemId: "item-2-1", children: "Item 2-1" }, { itemId: "item-2-2", children: "Item 2-2" }]
   * ```
   */
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

  /**
   * Attempts to find the `TreeItemDataList` based on a stack of item indexes by digging down into the
   * provided `data` list.
   *
   * @see buildItemIndexStack
   */
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

  /**
   * This function will attempt to find all treeitems that currently exist within the treeview.
   * This is normally run automatically each time a new `TreeItem` is mounted or unmounted from
   * the DOM, but can also be called manually as needed when a `ref` is attached to the `TreeView`.
   */
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

    // make sure parent groups aren't opened or closed as well.
    event.stopPropagation();
    if (event.type === "keydown") {
      event = event as React.KeyboardEvent<TreeViewElement>;
      if (event.key === " ") {
        // prevent page from scrolling
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
