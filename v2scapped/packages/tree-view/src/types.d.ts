import { IListProps } from "@react-md/list";
import { TextExtractor } from "@react-md/utils";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * The valid HTML Element for the tree view. Only really used for event listeners.
 */
export type TreeViewElement = HTMLUListElement | HTMLOListElement;

/**
 * A really simple interface that can be used with another interface to allow any key.
 * It's really just a fallback until I can figure out better typing, but it is also a
 * "reasonable" default.
 */
export interface IIndexKeyAny {
  [key: string]: any;
}

/**
 * This is the data that should be supplied to a tree view. The "base" requirements are just
 * to have an `itemId`, but it can also have `childItems` which is a list of more TreeViewData
 * that should be rendered as a child group. Finally, any valid key is allowed by default, but
 * a specific type or interface can be supplied to get better typing. This allows for "easier"
 * data manipulation and rendering if you want to have a single lookup instead of multiple.
 */
export type TreeViewData<D = IIndexKeyAny> = D & {
  itemId: string;
  childItems?: Array<TreeViewData<D>>;
};

/**
 * A simple list version of the TreeViewData.
 */
export type TreeViewDataList<D = IIndexKeyAny> = Array<TreeViewData<D>>;

/**
 * This is an expansion of the TreeViewData to work when it is in a "flattened" structure instead of
 * a list. It has the same base requirements as the TreeViewData, but also requires an additional
 * `parentId` to help link nodes together.
 */
export type FlattenedTreeViewData<D = IIndexKeyAny> = TreeViewData<D> & {
  parentId: string | null;
};

/**
 * This is the flattened tree view's data structure.
 */
export interface IFlattenedTree<D = IIndexKeyAny> {
  [key: string]: FlattenedTreeViewData<D>;
}

/**
 * A simple list version of the FlattenedTreeViewData.
 */
export type FlattenedTreeViewDataList<D = IIndexKeyAny> = Array<FlattenedTreeViewData<D>>;

export type FlattenedTreeViewSort<D> = (
  data: FlattenedTreeViewDataList<D>
) => FlattenedTreeViewDataList<D>;

export interface ITreeViewBaseProps<D, R> {
  /**
   * The id for the tree view. This is required as it will be passes as a prop to the `treeViewRenderer`.
   */
  id: string;

  /**
   * An optional style that will get passed down to the `treeViewRenderer`.
   */
  style?: React.CSSProperties;

  /**
   * An optional style that will get merged and passed down to the `treeViewRenderer`.
   */
  className?: string;

  /**
   * An optional label string that describes this tree. Either this or the `aria-labelledby` prop are
   * required for a11y.
   */
  "aria-label"?: string;

  /**
   * An optional id that points to an element that labels this tree. Either this or the `aria-label`
   * prop are required for a11y.
   */
  "aria-labelledby"?: string;

  /**
   * A list of data that should be transformed into a tree view.
   */
  data: Array<TreeViewData<D>>;

  /**
   * A function that will render the entire tree view. This should mostly remain the default implementation
   * of passing down to the `List` component, but it can be changed to something else if you need more flexibility
   * or functionality.
   */
  treeViewRenderer?: treeViewRenderer<R>;

  /**
   * A function that will render a specific tree item. The default implementation _should_ probably be good enough
   * for most use cases, but this can be updated if you need additional functionality.
   */
  treeItemRenderer?: treeItemRenderer<D, R>;

  /**
   * Boolean if the TreeView can have multiple treeitems selected.
   */
  multiSelect?: boolean;

  /**
   * Boolean if focusing using any of the provided keyboard navigation shortcuts should also select the item. This
   * should most likely be `false` at all times.
   */
  selectOnFocus?: boolean;

  /**
   * Boolean if `TreeItem`s that have nested child items (groups) can no longer be selected. This is enabled by
   * default to make selection visibility easier on the user.
   */
  disableGroupSelection?: boolean;

  /**
   * Boolean if the functionality for opening all siblings at the same level when the asterisk (`*`) key is pressed
   * should be disabled.
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
   */
  searchResetTime?: number;

  /**
   * A function to extract the searchable text within a treeitem. The default behavior is to just run
   * `treeItem.textContent` on each tree item. If there is a `FontIcon` component from react-md (or really just an
   * element with `.rmd-icon--font` on it as a child of the tree item), the treeitem will be cloned without
   * the `FontIcon` and then run `clonedTreeItem.textContent`. See `disableFontIconTextCheck` for some
   * more details.
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
   */
  disableFontIconTextCheck?: boolean;

  /**
   * The function that should be called when a new tree item is selected. The callback function should
   * be used to update the `selectedId` prop to the provided `itemId`.
   */
  onItemSelect?: onItemSelect;

  /**
   * The function that should be called when a tree item's expansion value changes. The callback function
   * should be used to update the `expandedIds` prop to include or remove the provided `itemId`.
   */
  onItemExpandedChange?: onItemExpandedChange;

  /**
   * This function will only be called when the `disableSiblingExpansion` prop is not enabled and the user
   * presses the asterisk (*) key on a TreeItem to attempt to expand all sibling treeitems at the same level
   * and within the same group.
   */
  onMultipleItemExpansion?: MultipleIdHandler;

  /**
   * This function will be called when the `multiSelect` prop is enabled and a user has multi-selected items via
   * the keyboard.
   */
  onMultipleItemSelection?: MultipleIdHandler;

  /**
   * An optional expander icon that should be used for tree items that have nested items.
   */
  expanderIcon?: React.ReactElement<any>;
}

export interface ITreeViewIdsProps {
  /**
   * A list of tree item ids that are currently selected.
   */
  selectedIds: string[];

  /**
   * A list of tree item ids that are currently expanded.
   */
  expandedIds: string[];
}

export interface ITreeViewProps<D = IIndexKeyAny, R = IIndexKeyAny>
  extends Omit<IListProps, "id">,
    ITreeViewBaseProps<D, R>,
    ITreeViewIdsProps {
  onItemSelect: onItemSelect;
  onItemExpandedChange: onItemExpandedChange;
}

export type TreeViewWithMultiSelectHandlers<D = IIndexKeyAny, R = IIndexKeyAny> = ITreeViewProps<
  D,
  R
> & {
  onMultipleItemExpansion: MultipleIdHandler;
  onMultipleItemSelection: MultipleIdHandler;
};

export interface ITreeViewDefaultProps<D = IIndexKeyAny, R = IIndexKeyAny> {
  multiSelect: boolean;
  selectOnFocus: boolean;
  disableGroupSelection: boolean;
  disableSiblingExpansion: boolean;
  searchResetTime: number;
  treeViewRenderer: treeViewRenderer<R>;
  treeItemRenderer: treeItemRenderer<D, R>;
  extractTextContent: TextExtractor;
  disableFontIconTextCheck: boolean;
  expanderIcon: React.ReactElement<any>;
}

export type TreeViewWithDefaultProps<D = IIndexKeyAny, R = IIndexKeyAny> = ITreeViewProps<D, R> &
  ITreeViewDefaultProps<D, R>;

/**
 * The function that should render the tree view that is really just a Stateless Functional Component.
 * This should take in the base `ITreeViewInjectedProps` and render the tree. By default, this will
 * include all the html attributes for the `HTMLOListElement` or `HTMLUListElement`, but can be updated
 * to provide a type or interface for the remaining keys. The default is to allow any key passed down
 * just so it isn't super hard to get something rendered.
 */
export type treeViewRenderer<R = IIndexKeyAny> = (
  props: ITreeViewInjectedProps & IListProps
) => React.ReactNode;

/**
 * The function that should render each tree item that appears within the tree view. It will provide
 * the current TreeViewData and the `ITreeViewItemInjectedPropsWithKey` so that you can render items fairly
 * dynamically.
 */
export type treeItemRenderer<D = IIndexKeyAny, R = IIndexKeyAny> = (
  itemProps: ITreeViewItemInjectedPropsWithKey,
  item: TreeViewData<D>,
  treeProps: ITreeViewProps<D, R>
) => React.ReactNode;

/**
 * The "base" injected props for the TreeView's renderer. These props should be applied to your
 * list element to get the desired keyboard behavior and rendering.
 */
export interface ITreeViewInjectedProps extends React.HTMLAttributes<TreeViewElement> {
  id: string;
  className: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  role: "treeview";
  onClick: (event: React.MouseEvent<TreeViewElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<TreeViewElement>) => void;
  children: React.ReactNode;
}

/**
 * The "base" injected props for the TreeItem's renderer.
 */
export interface ITreeViewItemInjectedProps {
  /**
   * The current depth that the tree item is being rendered at. This will be a number starting from `1`
   * since it should be directly mapped to `"aria-posinset"`.
   */
  depth: number;

  /**
   * The current tree item's index within its list at the provided depth. This will be a number starting from
   * `1` since it should be directly mapped to `"aria-posinset"`.
   */
  itemIndex: number;

  /**
   * The current total list size for the tree item at the provided depth. This should be mapped directly into
   * `"aria-setsize"`.
   */
  listSize: number;

  /**
   * Boolean if the tree item is currently selected.
   */
  selected: boolean;

  /**
   * Boolean if the tree item is expanded. When this is true, it should add `aria-expanded="true"` to the
   * tree item.
   */
  expanded: boolean;

  /**
   * A function to call that will make the parent TreeView update its cache of tree items. This should be called
   * each time the tree item is mounted, or right before it is unmounted.
   */
  updateTreeItems: () => void;

  /**
   * This function will only be provided when the tree item has child tree items. This function should only be called
   * within the exported `TreeGroup` component or in a component that has the `role="group"` for accessibility.
   */
  renderChildItems?: () => React.ReactNode;
}

export interface ITreeViewItemInjectedPropsWithKey extends ITreeViewItemInjectedProps {
  /**
   * The key that should be applied to the react element.
   */
  key: string;
}

export type onItemSelect = (itemId: string) => void;
export type onItemExpandedChange = (itemId: string, expanded: boolean) => void;
export type MultipleIdHandler = (itemIds: string[]) => void;
