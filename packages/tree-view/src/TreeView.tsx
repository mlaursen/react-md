import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { List, IListProps } from "@react-md/list";

import {
  IIndexKeyAny,
  TreeViewElement,
  TreeViewData,
  TreeViewDataList,
  treeViewRenderer,
  treeItemRenderer,
  onItemSelect,
  onItemExpandedChange,
  onItemSiblingExpansion,
} from "./types";
import DefaultTreeItemRenderer from "./DefaultTreeItemRenderer";
import { findTreeItemFromElement, findTreeItemsFromElement } from "./utils";

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
   * Boolean if the TreeView can have multiple treeitems selected.
   *
   * @docgen
   */
  multiSelect?: boolean;

  /**
   * Boolean if focusing using any of the provided keyboard navigation shortcuts should also select the item. This
   * should most likely be `false` at all times.
   *
   * @docgen
   */
  selectOnFocus?: boolean;

  /**
   * Boolean if the `TreeItem`s that have child items can also be selected.
   *
   * @docgen
   */
  selectableChildItemsItem?: boolean;

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

export interface ITreeViewProps<D = IIndexKeyAny, R = IIndexKeyAny>
  extends ITreeViewBaseProps<D, R>,
    ITreeViewIdsProps,
    IIndexKeyAny {
  onItemSelect: onItemSelect;
  onItemExpandedChange: onItemExpandedChange;
}

export type TreeViewPropsWithSiblingExpansion<D = IIndexKeyAny, R = IIndexKeyAny> = ITreeViewProps<D, R> & {
  onItemSiblingExpansion: onItemSiblingExpansion;
};

export interface ITreeViewDefaultProps<D = IIndexKeyAny, R = IIndexKeyAny> {
  multiSelect: boolean;
  selectOnFocus: boolean;
  selectableChildItemsItem: boolean;
  disableSiblingExpansion: boolean;
  treeViewRenderer: treeViewRenderer<R>;
  treeItemRenderer: treeItemRenderer<D>;
}

export type TreeViewWithDefaultProps<D = IIndexKeyAny, R = IIndexKeyAny> = ITreeViewProps<D, R> &
  ITreeViewDefaultProps<D, R>;

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
export default class TreeView<D = IIndexKeyAny, R = IIndexKeyAny> extends React.Component<ITreeViewProps<D, R>> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    "aria-label": PropTypes.string,
    "aria-labelledby": PropTypes.string,
    multiSelect: PropTypes.bool,
    selectOnFocus: PropTypes.bool,
    selectableChildItemsItem: PropTypes.bool,
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

  public static defaultProps: ITreeViewDefaultProps<IIndexKeyAny, IIndexKeyAny> = {
    multiSelect: false,
    selectOnFocus: false,
    selectableChildItemsItem: false,
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
      multiSelect,
      selectOnFocus,
      selectableChildItemsItem,
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
    const item = findTreeItemFromElement(element, this.props.data, this.treeEl);
    if (!item) {
      return;
    }

    const { itemId } = item;
    const { onItemSelect, expandedIds, onItemExpandedChange, selectableChildItemsItem } = this.props;

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
      if (selectableChildItemsItem) {
        onItemSelect(itemId);
      }
    }
  };

  private toggleFrom = (element: HTMLElement, expanded: boolean) => {
    const item = findTreeItemFromElement(element, this.props.data, this.treeEl);
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

    const items = findTreeItemsFromElement(element, data, this.treeEl).filter(({ childItems }) => !!childItems);

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

    const { selectedIds, onItemSelect, data, selectOnFocus } = this.props;
    if (!selectOnFocus) {
      return;
    }

    const item = findTreeItemFromElement(element, data, this.treeEl);
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
