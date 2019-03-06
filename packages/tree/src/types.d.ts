import {
  CSSProperties,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import { IListProps } from "@react-md/list";
import { Omit } from "@react-md/utils";

/**
 * The valid HTML Element for the tree view. Only really used for event listeners.
 */
export type TreeElement = HTMLUListElement | HTMLOListElement;

/**
 * A really simple interface that can be used with another interface to allow any key.
 * It's really just a fallback until I can figure out better typing, but it is also a
 * "reasonable" default.
 */
export interface IAnyRecord {
  [key: string]: any;
}

/**
 * This is the data that should be supplied to a tree view. The "base" requirements are just
 * to have an `itemId`, but it can also have `childItems` which is a list of more TreeData
 * that should be rendered as a child group. Finally, any valid key is allowed by default, but
 * a specific type or interface can be supplied to get better typing. This allows for "easier"
 * data manipulation and rendering if you want to have a single lookup instead of multiple.
 */
export type TreeData<D = IAnyRecord> = D & {
  itemId: string;
  childItems?: TreeData<D>[];
};

/**
 * A simple list version of the TreeData.
 */
export type TreeDataList<D = IAnyRecord> = TreeData<D>[];

/**
 * This is an expansion of the TreeData to work when it is in a "flattened" structure instead of
 * a list. It has the same base requirements as the TreeData, but also requires an additional
 * `parentId` to help link nodes together.
 */
export type FlattenedTreeData<D = IAnyRecord> = TreeData<D> & {
  parentId: string | null;
};

/**
 * This is the flattened tree view's data structure.
 */
export interface IFlattenedTree<D = IAnyRecord> {
  [key: string]: FlattenedTreeData<D>;
}

/**
 * A simple list version of the FlattenedTreeData.
 */
export type FlattenedTreeDataList<D = IAnyRecord> = FlattenedTreeData<D>[];

/**
 * The sort function for a flattened tree view.
 */
export type FlattenedTreeSort<D> = (
  data: FlattenedTreeDataList<D>
) => FlattenedTreeDataList<D>;

/**
 * The "base" injected props for the Tree's renderer. These props should be applied to your
 * list element to get the desired keyboard behavior and rendering.
 */
export interface ITreeInjectedProps
  extends Omit<HTMLAttributes<TreeElement>, "onClick" | "onKeyDown">,
    Required<Pick<HTMLAttributes<TreeElement>, "onClick" | "onKeyDown">> {
  id: string;
  className: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  role: string;
  children: ReactNode;
}

export interface ITreeBaseProps<D = IAnyRecord> {
  /**
   * The id for the tree view. This is required as it will be passes as a prop to the `treeViewRenderer`.
   */
  id: string;

  /**
   * An optional style that will get passed down to the `treeViewRenderer`.
   */
  style?: CSSProperties;

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
  data: TreeDataList<D>;

  /**
   * A function that will render the entire tree view. This should mostly remain the default implementation
   * of passing down to the `List` component, but it can be changed to something else if you need more flexibility
   * or functionality.
   */
  treeRenderer?: TreeRenderer;

  /**
   * A function that will render a specific tree item. The default implementation _should_ probably be good enough
   * for most use cases, but this can be updated if you need additional functionality.
   */
  itemRenderer?: TreeItemRenderer<D>;

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
  onItemSelect?: OnItemSelect;

  /**
   * The function that should be called when a tree item's expansion value changes. The callback function
   * should be used to update the `expandedIds` prop to include or remove the provided `itemId`.
   */
  onItemExpandedChange?: OnItemExpandedChange;

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
}

export interface ITreeIdsProps {
  /**
   * A list of tree item ids that are currently selected.
   */
  selectedIds: string[];

  /**
   * A list of tree item ids that are currently expanded.
   */
  expandedIds: string[];
}

export interface ITreeProps<D = IAnyRecord>
  extends Omit<IListProps, "id">,
    Omit<ITreeBaseProps<D>, "onItemSelect" | "onItemExpandedChange">,
    Required<Pick<ITreeBaseProps<D>, "onItemSelect" | "onItemExpandedChange">>,
    ITreeIdsProps {
  /**
   * The id for the tree. This is required for a11y.
   */
  id: string;

  /**
   * This is a function that is used to generate an `id` attribute for each tree item since
   * the tree component handles keyboard navigation through the `aria-activedescendant` prop.
   * The default implementation will create an id like:
   *
   * ```
   * const id = `${treeId}-item${prefix}-${itemIndex}`;
   * ```
   */
  getItemId?: GetItemId;

  /**
   * The default active id within the tree. This will be for the keyboard focus behavior
   */
  defaultActiveId?: string;

  /**
   * An optional expander icon that should be used for tree items that have nested items.
   */
  expanderIcon?: ReactElement<any>;

  /**
   * Boolean if the expander icon should appear before or after the content in
   * the tree item.
   */
  expanderLeft?: boolean;
}

/**
 * The function that should render the tree view that is really just a Stateless Functional Component.
 * This should take in the base `ITreeInjectedProps` and render the tree. By default, this will
 * include all the html attributes for the `HTMLOListElement` or `HTMLUListElement`, but can be updated
 * to provide a type or interface for the remaining keys. The default is to allow any key passed down
 * just so it isn't super hard to get something rendered.
 */
export type TreeRenderer = (
  props: ITreeInjectedProps & IListProps & { ref?: Ref<TreeElement> }
) => ReactElement<any> | null;

export interface ITreeItemA11yProps {
  /**
   * An optional aria-expanded attribute to apply to the tree item. This should only be provided
   * as the value "true" and only if it is currently expanded. It should be `undefined` otherwise.
   */
  "aria-expanded": "true" | "false" | boolean;

  /**
   * The current level (depth) for the tree item.
   */
  "aria-level": number;

  /**
   * The tree item's current position within the parent treeview or a sub-group. This should be
   * a number starting from `1`.
   */
  "aria-posinset": number;

  /**
   * The size of the treeview or sub-group that the tree item is in. This should be a number
   * starting from `1`.
   */
  "aria-setsize": number;

  /**
   * The tabindex for the tree item. When working with a single-selection tree view,
   * **only 1 treeitem** can have a tab index of `0` while all other treeitems should have a tab
   * index of `-1`.
   *
   * It is generally recommended to keep this prop `undefined` and let the `selected` prop handle
   * setting the correct `tabIndex` instead. However, you can manually override the built-in
   * behavior by setting this to valid number.
   */
  tabIndex: 0 | -1;
}

/**
 * The "base" injected props for the TreeItem's renderer.
 */
export interface ITreeItemInjectedProps {
  /**
   * The id for the tree item. This is injected and required for a11y since the tree component handles
   * keyboard movement with the `aria-activedescendant` tag.
   */
  id: string;

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
   * Boolean if the tree item is the current keyboard focus.
   */
  focused: boolean;

  /**
   * This function will only be provided when the tree item has child tree items. This function should only be called
   * within the exported `TreeGroup` component or in a component that has the `role="group"` for accessibility.
   */
  renderChildItems?: () => ReactNode;
}

export type TreeItemRenderer<D = IAnyRecord> = (
  props: ITreeItemInjectedProps & { key: string },
  item: TreeData<D>,
  treeProps: ITreeProps<D>
) => ReactNode;

export type OnItemSelect = (itemId: string) => void;
export type OnItemExpandedChange = (itemId: string, expanded: boolean) => void;
export type MultipleIdHandler = (itemIds: string[]) => void;
export type GetItemId = (props: {
  treeId: string;
  itemId: string;
  itemIndex: number;
  prefix: string;
}) => string;
