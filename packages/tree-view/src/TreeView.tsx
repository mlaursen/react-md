import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { List, IListProps } from "@react-md/list";
import { searchNodes, TextExtractor, extractTextContent as defaultExtractTextContent } from "@react-md/utils";

import {
  IIndexKeyAny,
  TreeViewElement,
  TreeViewData,
  TreeViewDataList,
  treeViewRenderer,
  treeItemRenderer,
  onItemSelect,
  onItemExpandedChange,
  MultipleIdHandler,
} from "./types";
import DefaultTreeItemRenderer from "./DefaultTreeItemRenderer";
import findTreeItemFromElement from "./utils/findTreeItemFromElement";
import findTreeItemsFromElement from "./utils/findTreeItemsFromElement";
import findIdsToRootOrEnd from "./utils/findIdsToRootOrEnd";

const FONT_ICON_CLASS_NAME = ".rmd-icon--font";
const SHIFT_CODE = 16;

type TreeKeyboardEvent = React.KeyboardEvent<TreeViewElement>;

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
   * An optional label string that describes this tree. Either this or the `aria-labelledby` prop are
   * required for a11y.
   *
   * @docgen
   */
  "aria-label"?: string;

  /**
   * An optional id that points to an element that labels this tree. Either this or the `aria-label`
   * prop are required for a11y.
   *
   * @docgen
   */
  "aria-labelledby"?: string;

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
   * Boolean if `TreeItem`s that have nested child items (groups) are also able to be selected.
   *
   * @docgen
   */
  isItemWithGroupSelectable?: boolean;

  /**
   * Boolean if the functionality for opening all siblings at the same level when the asterisk (`*`) key is pressed
   * should be disabled.
   *
   * @docgen
   */
  disableSiblingExpansion?: boolean;

  /**
   * The `TreeView` component allows the user to search for items by typing a letter which will attempt to find
   * the first item that matches that letter. If the user keeps pressing the same letter, the next item that starts
   * with that letter will be chosen instead. If a different letter is pressed, the search string will include both
   * letters and the match will now require the tree item to start with both letters.
   *
   * This prop is the amount of time in milliseconds that this search logic should be active before the search resets
   * back to the empty string.
   *
   * @docgen
   */
  searchResetTime?: number;

  /**
   * A function to extract the searchable text within a treeitem. The default behavior is to just run
   * `treeItem.textContent` on each tree item. If there is a `FontIcon` component from react-md (or really just an
   * element with `.rmd-icon--font` on it as a child of the tree item), the treeitem will be cloned without
   * the `FontIcon` and then run `clonedTreeItem.textContent`. See `disableFontIconTextCheck` for some
   * more details.
   *
   * @docgen
   */
  extractTextContent?: TextExtractor;

  /**
   * Boolean if the `extractTextContent` function should not attempt to check for font icons when searching
   * the tree for treeitems starting with some text. This is enabled by default to help all users of react-md,
   * but if you do not use `FontIcon`s or a font icon library that does not render icons based on innerText
   * (font-awesome for example), you can disable the fonticon check for a slight boost in performance.
   *
   * > The performance boost is extremely slight since this function will only be run when new treeitems are
   * added or removed from the DOM and is only used for keyboard navigation.
   *
   * @docgen
   */
  disableFontIconTextCheck?: boolean;

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
   * This function will only be called when the `disableSiblingExpansion` prop is not enabled and the user
   * presses the asterisk (*) key on a TreeItem to attempt to expand all sibling treeitems at the same level
   * and within the same group.
   *
   * @docgen
   */
  onMultipleItemExpansion?: MultipleIdHandler;

  /**
   * This function will be called when the `multiSelect` prop is enabled and a user has multi-selected items via
   * the keyboard.
   *
   * @docgen
   */
  onMultipleItemSelection?: MultipleIdHandler;
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

export type TreeViewWithMultiSelectHandlers<D = IIndexKeyAny, R = IIndexKeyAny> = ITreeViewProps<D, R> & {
  onMultipleItemExpansion: MultipleIdHandler;
  onMultipleItemSelection: MultipleIdHandler;
};

export interface ITreeViewDefaultProps<D = IIndexKeyAny, R = IIndexKeyAny> {
  multiSelect: boolean;
  selectOnFocus: boolean;
  isItemWithGroupSelectable: boolean;
  disableSiblingExpansion: boolean;
  searchResetTime: number;
  treeViewRenderer: treeViewRenderer<R>;
  treeItemRenderer: treeItemRenderer<D>;
  extractTextContent: TextExtractor;
  disableFontIconTextCheck: boolean;
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
    data: PropTypes.arrayOf(
      PropTypes.shape({
        itemId: PropTypes.string.isRequired,
      })
    ).isRequired,
    multiSelect: PropTypes.bool,
    selectOnFocus: PropTypes.bool,
    isItemWithGroupSelectable: PropTypes.bool,
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
    onMultipleItemExpansion: (props: ITreeViewProps, propName: string, component: string, ...args: any[]) => {
      if (!props.disableSiblingExpansion) {
        return PropTypes.func.isRequired(props, propName, component, ...args);
      }

      return null;
    },
    onMultipleItemSelection: (props: ITreeViewProps, propName: string, component: string, ...args: any[]) => {
      let validator = PropTypes.func;
      if (props.multiSelect) {
        // @ts-ignore
        validator = validator.isRequired;
      }

      return validator(props, propName, component, ...args);
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
    searchResetTime: 500,
    multiSelect: false,
    selectOnFocus: false,
    isItemWithGroupSelectable: false,
    disableSiblingExpansion: false,
    disableFontIconTextCheck: false,
    extractTextContent: defaultExtractTextContent,
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
    if ((selectedLength === 0 && prevSelectedLength > 0) || (prevSelectedLength === 0 && selectedLength > 0)) {
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
        const { extractTextContent, disableFontIconTextCheck } = this.props as TreeViewWithDefaultProps<D, R>;
        this.treeItems = Array.from(this.treeEl.querySelectorAll('[role="treeitem"]'));
        this.treeItemStrings = this.treeItems.map(node => extractTextContent(node, disableFontIconTextCheck));
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
      isItemWithGroupSelectable,
      disableSiblingExpansion,
      extractTextContent,
      disableFontIconTextCheck,
      searchResetTime,
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

  /**
   * If the user has selected a node deep within the tree and then closes any parent nodes,
   * the tree would no longer be able to gain keyboard focus if the user tabs away. If this happens,
   * temporarily set the tabIndex for the first item to 0 so it will be focusable, but not updating
   * the selected state.
   */
  private fixNoFocus = () => {
    const selected = this.treeItems.filter(node => node.tabIndex === 0 && node !== this.tempFocusableItem);
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

  private handleKeyDown = (event: TreeKeyboardEvent) => {
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
        event.stopPropagation();
        (event.target as HTMLElement).click();
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
    const { onItemSelect, expandedIds, onItemExpandedChange, isItemWithGroupSelectable } = this.props;

    // make sure parent groups aren't opened or closed as well.
    event.stopPropagation();
    if (item.childItems) {
      const i = expandedIds.indexOf(itemId);
      onItemExpandedChange(itemId, i === -1);
      if (isItemWithGroupSelectable) {
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
    const { data, disableSiblingExpansion, onMultipleItemExpansion, expandedIds } = this
      .props as TreeViewWithMultiSelectHandlers<D, R>;

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

    const { data, selectedIds, onMultipleItemSelection } = this.props as TreeViewWithMultiSelectHandlers<D, R>;
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
