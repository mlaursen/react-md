/* tslint:disable:no-shadowed-variable */
import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { List, IListProps } from "@react-md/list";
import { FontIcon } from "@react-md/icon";
import {
  searchNodes,
  TextExtractor,
  extractTextContent as defaultExtractTextContent,
} from "@react-md/utils";

import {
  IIndexKeyAny,
  TreeViewElement,
  TreeViewData,
  TreeViewDataList,
  ITreeViewProps,
  ITreeViewDefaultProps,
  TreeViewWithDefaultProps,
  TreeViewWithMultiSelectHandlers,
  treeViewRenderer,
  treeItemRenderer,
  onItemSelect,
  onItemExpandedChange,
  MultipleIdHandler,
} from "./types";
import DefaultTreeItemRenderer from "./DefaultTreeItemRenderer";
import findTreeItemFromElement from "./utils/findTreeItemFromElement";
import findTreeItemsFromElement from "./utils/findTreeItemsFromElement";
import findAllIds from "./utils/findAllIds";
import findIdsToRootOrEnd from "./utils/findIdsToRootOrEnd";

const FONT_ICON_CLASS_NAME = ".rmd-icon--font";
const SHIFT_CODE = 16;

type TreeKeyboardEvent = React.KeyboardEvent<TreeViewElement>;

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
export default class TreeView<D = IIndexKeyAny, R = IIndexKeyAny> extends React.Component<
  ITreeViewProps<D, R>
> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    "aria-label": PropTypes.string,
    "aria-labelledby": PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        itemId: PropTypes.string.isRequired,
      })
    ).isRequired,
    multiSelect: PropTypes.bool,
    selectOnFocus: PropTypes.bool,
    disableGroupSelection: PropTypes.bool,
    disableSiblingExpansion: PropTypes.bool,
    searchResetTime: PropTypes.number,
    extractTextContent: PropTypes.func,
    disableFontIconTextCheck: PropTypes.bool,
    treeViewRenderer: PropTypes.func,
    treeItemRenderer: PropTypes.func,
    expandedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    onItemSelect: PropTypes.func.isRequired,
    onItemExpandedChange: PropTypes.func.isRequired,
    onMultipleItemExpansion: PropTypes.func,
    onMultipleItemSelection: PropTypes.func,
    _multipleExpansionValidator: (
      props: ITreeViewProps,
      propName: string,
      componentName: string
    ) => {
      if (!props.disableSiblingExpansion && typeof props.onMultipleItemExpansion !== "function") {
        const value = props.onMultipleItemExpansion as any;
        return new Error(
          `The \`onMultipleItemExpansion\` prop is required for the \`${componentName}\` component when the ` +
            `\`disableSiblingExpansion\` prop has not been enabled but \`${
              !value ? "" : value
            }\` was provided instead.`
        );
      }

      return null;
    },
    _multipleSelectionValidator: (
      props: ITreeViewProps,
      propName: string,
      componentName: string
    ) => {
      if (props.multiSelect && !props.onMultipleItemSelection) {
        const value = props.onMultipleItemSelection as any;
        return new Error(
          `The \`onMultipleItemSelection\` prop is required for the \`${componentName}\` component when the ` +
            `\`multiSelect\` prop has not been enabled but \`${value}\` was provided instead.`
        );
      }

      return null;
    },
    _a11yValidator: (props: ITreeViewProps, propName: string, componentName: string) => {
      const label = props["aria-label"];
      const labelledBy = props["aria-labelledby"];
      if (typeof label !== "string" && typeof labelledBy !== "string") {
        return new Error(
          `The \`${componentName}\` component requires either the \`aria-label\` or \`aria-labelledby\` props for ` +
            "accessibility but both were `undefined`."
        );
      } else if (typeof label === "string" && !label.length) {
        return new Error(
          `The \`${componentName}\` component requires an \`aria-label\` with a length greater than 0, but ` +
            `\`${label}\` was provided. `
        );
      } else if (typeof labelledBy === "string" && !labelledBy.length) {
        return new Error(
          `The \`${componentName}\` component requires an \`aria-labelledby\` with a length greater than 0, but ` +
            `\`${labelledBy}\` was provided.`
        );
      }

      return null;
    },
  };

  public static defaultProps: ITreeViewDefaultProps<IIndexKeyAny, IIndexKeyAny> = {
    searchResetTime: 500,
    multiSelect: false,
    selectOnFocus: false,
    disableGroupSelection: false,
    disableSiblingExpansion: false,
    disableFontIconTextCheck: false,
    extractTextContent: defaultExtractTextContent,
    expanderIcon: <FontIcon>keyboard_arrow_down</FontIcon>,
    treeViewRenderer: props => <List {...props} />,
    treeItemRenderer: (
      props,
      { linkComponent, to, href, leftIcon, rightIcon, children },
      { expanderIcon }
    ) => (
      <DefaultTreeItemRenderer
        {...props}
        expanderIcon={expanderIcon}
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
  private treeItemStrings: string[];
  private updateFrame?: number;
  private searchTimer?: number;
  private lastSearch: string;
  private tempFocusableItem?: HTMLElement;
  constructor(props: ITreeViewProps<D, R>) {
    super(props);

    this.treeEl = null;
    this.treeItems = [];
    this.treeItemStrings = [];
    this.lastSearch = "";
  }

  public componentDidMount() {
    this.treeEl = document.getElementById(this.props.id) as TreeViewElement | null;
    this.updateTreeItems();
    if (!this.treeEl) {
      throw new Error("Unable to find a tree element");
    }
  }

  public componentDidUpdate(prevProps: ITreeViewProps<D, R>) {
    const selectedLength = this.props.selectedIds.length;
    const prevSelectedLength = prevProps.selectedIds.length;
    if (
      (selectedLength === 0 && prevSelectedLength > 0) ||
      (prevSelectedLength === 0 && selectedLength > 0)
    ) {
      this.fixNoFocus();
    }
  }

  public componentWillUnmount() {
    this.clearSearch();
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
        const { extractTextContent, disableFontIconTextCheck } = this
          .props as TreeViewWithDefaultProps<D, R>;
        this.treeItems = Array.from(this.treeEl.querySelectorAll('[role="treeitem"]'));
        this.treeItemStrings = this.treeItems.map(node =>
          extractTextContent(node, disableFontIconTextCheck)
        );
        this.fixNoFocus();
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
      onMultipleItemExpansion,
      onMultipleItemSelection,
      multiSelect,
      selectOnFocus,
      disableGroupSelection,
      disableSiblingExpansion,
      extractTextContent,
      disableFontIconTextCheck,
      searchResetTime,
      data,
      expanderIcon,
      ...props
    } = this.props as TreeViewWithDefaultProps<D, R>;

    return treeViewRenderer({
      ...props,
      role: "treeview",
      className: cn("rmd-tree-view", className),
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClickFrom,
      children: this.renderChildTreeItems(data, 0),
    });
  }

  /**
   * If the user has selected a node deep within the tree and then closes any parent nodes,
   * the tree would no longer be able to gain keyboard focus if the user tabs away. If this happens,
   * temporarily set the tabIndex for the first item to 0 so it will be focusable, but not updating
   * the selected state.
   */
  private fixNoFocus = () => {
    const selected = this.treeItems.filter(
      node => node.tabIndex === 0 && node !== this.tempFocusableItem
    );
    if (!selected.length && this.treeItems.length) {
      this.tempFocusableItem = this.treeItems[0];
      this.tempFocusableItem.tabIndex = 0;
    } else if (this.tempFocusableItem) {
      this.tempFocusableItem.tabIndex = -1;
      this.tempFocusableItem = undefined;
    }
  };

  private handleSpaceKey = (event: TreeKeyboardEvent) => {
    const { data, multiSelect, onItemSelect } = this.props;
    event.preventDefault();

    // accroding to the specs, spacebar does nothing in single-select trees
    if (!multiSelect) {
      return;
    }

    const item = findTreeItemFromElement(event.target as HTMLElement, data, this.treeEl);
    if (!item) {
      return;
    }

    onItemSelect(item.itemId);
  };

  private handleEnterKey = (event: TreeKeyboardEvent) => {
    event.stopPropagation();
    (event.target as HTMLElement).click();
  };

  private handleHomeEndKeys = (event: TreeKeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const isHome = event.key === "Home";
    if (this.props.multiSelect && event.shiftKey && event.ctrlKey) {
      this.selectFrom(event.target as HTMLElement, isHome);
      return;
    }

    this.focus(isHome ? 0 : this.treeItems.length - 1);
  };

  private handleArrowKeys = (event: TreeKeyboardEvent) => {
    const { key } = event;
    const element = event.target as HTMLElement;
    event.preventDefault();
    const horizontal = key === "ArrowLeft" || key === "ArrowRight";
    if (horizontal) {
      this.toggleFrom(element, key === "ArrowRight");
      return;
    }

    this.focusFrom(element, key === "ArrowDown");
  };

  private handleLetterA = (event: TreeKeyboardEvent) => {
    if (!this.props.multiSelect || !event.ctrlKey) {
      this.search(event);
      return;
    }

    const { selectedIds, data, onMultipleItemSelection } = this
      .props as TreeViewWithMultiSelectHandlers;
    const allIds = findAllIds(data);
    const nextSelectedIds = allIds.length === selectedIds.length ? [] : allIds;
    onMultipleItemSelection(nextSelectedIds);
  };

  private handleKeyDown = (event: TreeKeyboardEvent) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    switch (event.key) {
      case "Home":
      case "End":
        this.handleHomeEndKeys(event);
        break;
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
        this.handleArrowKeys(event);
        break;
      case " ":
        this.handleSpaceKey(event);
        break;
      case "Enter":
        this.handleEnterKey(event);
        break;
      case "a":
        this.handleLetterA(event);
        break;
      case "*":
        this.openAllRelatedNodes(event.target as HTMLElement);
        break;
      default:
        this.search(event);
    }
  };

  private handleClickFrom = (event: React.MouseEvent<TreeViewElement>) => {
    const element = event.target as HTMLElement;
    const item = findTreeItemFromElement(element, this.props.data, this.treeEl);
    if (!item) {
      return;
    }

    const { itemId } = item;
    const {
      onItemSelect,
      selectedIds,
      expandedIds,
      onItemExpandedChange,
      disableGroupSelection,
    } = this.props;

    // make sure parent groups aren't opened or closed as well.
    event.stopPropagation();
    if (item.childItems) {
      const i = expandedIds.indexOf(itemId);
      onItemExpandedChange(itemId, i === -1);
    }

    // the event will not be trusted if it happens after the enter keypress. When that happens, we only
    // want the `onItemSelect` to be called when it is not already selected as Enter will only select -- not toggle
    if (
      (!disableGroupSelection || !item.childItems) &&
      (event.isTrusted || !selectedIds.includes(itemId))
    ) {
      onItemSelect(itemId);
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
    const { data, disableSiblingExpansion, onMultipleItemExpansion, expandedIds } = this
      .props as TreeViewWithMultiSelectHandlers<D, R>;

    if (!this.treeEl || disableSiblingExpansion) {
      return;
    }

    const items = findTreeItemsFromElement(element, data, this.treeEl).filter(
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

    onMultipleItemExpansion(newExpandedIds);
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

  private clearSearch = () => {
    if (this.searchTimer) {
      window.clearTimeout(this.searchTimer);
      this.searchTimer = undefined;
    }
  };

  private startSearchTimer = () => {
    const { searchResetTime } = this.props as TreeViewWithDefaultProps<D, R>;
    this.clearSearch();
    this.searchTimer = window.setTimeout(() => {
      this.searchTimer = undefined;
      this.lastSearch = "";
    }, searchResetTime);
  };

  private search = (event: TreeKeyboardEvent) => {
    if (!this.treeEl || !this.treeItems.length || event.altKey || event.metaKey || event.ctrlKey) {
      return;
    }

    const code = event.which || event.keyCode;
    if (code === SHIFT_CODE) {
      return;
    }

    const letter = event.key.toUpperCase();
    if (letter.length !== 1) {
      return;
    }

    const i = this.treeItems.indexOf(document.activeElement as HTMLElement);
    if (i === -1) {
      return;
    }

    this.startSearchTimer();
    if (this.lastSearch !== letter) {
      this.lastSearch = `${this.lastSearch}${letter}`;
    }

    const matchIndex = searchNodes(this.lastSearch, this.treeItemStrings, i, s => s as string);
    if (matchIndex !== -1) {
      this.focus(matchIndex);
    }
  };

  private selectFrom = (element: HTMLElement, toRoot: boolean) => {
    if (!this.treeEl) {
      return;
    }

    const { data, selectedIds, onMultipleItemSelection } = this
      .props as TreeViewWithMultiSelectHandlers<D, R>;
    const nextSelectedIds = findIdsToRootOrEnd({
      element,
      data,
      treeEl: this.treeEl,
      toRoot,
      selectedIds,
    });

    if (nextSelectedIds !== selectedIds) {
      onMultipleItemSelection(nextSelectedIds);
    }
  };

  private renderChildTreeItems = (data: TreeViewDataList<D>, depth: number): React.ReactNode => {
    const { selectedIds, expandedIds, treeItemRenderer } = this.props as TreeViewWithDefaultProps<
      D,
      R
    >;
    const listSize = data.length;

    return data.map((item, i) => {
      const { itemId, childItems } = item;
      const selected = selectedIds.indexOf(itemId) !== -1;
      const expanded = expandedIds.indexOf(itemId) !== -1;

      return treeItemRenderer(
        {
          key: itemId,
          depth,
          listSize,
          itemIndex: i,
          selected,
          expanded,
          updateTreeItems: this.updateTreeItems,
          renderChildItems: childItems
            ? () => this.renderChildTreeItems(childItems, depth + 1)
            : undefined,
        },
        item,
        this.props
      );
    });
  };
}
