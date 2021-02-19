import {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  MutableRefObject,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import {
  ListItemChildrenProps,
  ListProps,
  SimpleListItemProps,
} from "@react-md/list";

export type TreeItemId = string;
export type ExpandedIds = readonly TreeItemId[];
export type SelectedIds = readonly TreeItemId[];

export interface TreeItemIds {
  /**
   * The unique identifier for an item within the tree. This is used to be able
   * to link tree items together with parent items as well as selected/expanded
   * logic.
   */
  itemId: TreeItemId;

  /**
   * This id is used to be able to link tree items together with children and
   * parents. If the `parentId` is set to `null`, the tree item will appear at
   * the root of the tree. Otherwise, the tree item will appear as a child of
   * the referenced tree item by `itemId`
   */
  parentId: null | TreeItemId;
}

export interface BaseTreeItem extends TreeItemIds, ListItemChildrenProps {
  /**
   * Boolean if the provided item is a custom element and will not be rendered
   * in a `TreeItem` component. This is useful if you want to be able to render
   * `Divider` or `ListSubheader` components within a tree since they _should_
   * be able to be rendered without any of the tree functionality.
   */
  isCustom?: boolean;
}

/**
 * This is just a type I use internally for handling tree items with unknown
 * keys.
 *
 * @internal
 */
export interface UnknownTreeItem extends BaseTreeItem {
  [key: string]: unknown;
}

/**
 * This type represents the data that can be handled by the `Tree` component.
 * This is really just a Map of `itemId -> item` for quick lookups for the logic
 * within the tree.
 */
export type TreeData<T extends BaseTreeItem> = Record<TreeItemId, T>;

/**
 * A function to call that will sort the items within the tree for each unique
 * `parentId`. If you have a tree like:
 *
 * ```
 * a
 * ├── a1
 * b
 * ├── b1
 * ├── b2
 * │   └── b2.1
 * c
 * ├── c1
 * ├── c2
 * └── c3
 * ```
 *
 * This function will be called with:
 *
 * - `[a1]`
 * - `[b2.1]`
 * - `[b1, b2]`
 * - `[c1, c2, c3]`
 * - `[a, b, c]`
 */
export type TreeItemSorter<T extends BaseTreeItem> = (items: T[]) => T[];

/**
 * A render function that allows you to add additional functionality to or
 * custom components within the tree.
 */
export type TreeItemRenderer<T extends BaseTreeItem> = (
  providedProps: ProvidedTreeItemProps,
  item: T & { visibleIndex: number },
  treeProps: ProvidedTreeProps
) => ReactElement | null;

/**
 * A function to get additional props to pass to each tree item. It will be
 * provided the current item and the "states" of the item merged together.
 *
 * Note: It is generally recommended to use the `itemRenderer` instead for
 * additional functionality as you will have more control. This prop is more for
 * applying custom styles or display data on the item.
 */
export type GetItemProps<T extends TreeItemIds> = (
  item: T & TreeItemStates
) => ConfigurableTreeItemProps | undefined;

export interface TreeItemExpansionIcon {
  /**
   * The icon to show within each item within the tree that helps show that
   * there are child items.
   *
   * NOTE: This will override the `rightAddon` prop if defined on each item by
   * default so they can't be used. If the `expanderLeft` prop is enabled, the
   * `leftAddon` will be overridden instead.
   */
  expanderIcon?: ReactNode;

  /**
   * Boolean if the expander icon should appear to the left instead of the
   * right.
   */
  expanderLeft?: boolean;
}

export interface TreeItemExpansion {
  /**
   * The list of expanded ids within the tree. These ids should reference
   * `itemId`s for tree items.
   */
  expandedIds: ExpandedIds;

  /**
   * A function to call that will update the `expandedIds` to collapse or expand
   * a clicked item.
   */
  onItemExpansion: (itemId: TreeItemId, expanded: boolean) => void;

  /**
   * A function to call when the user presses the asterisk key (*) that will
   * expand all tree items at the same level as the currently focused item.
   */
  onMultiItemExpansion: (itemIds: ExpandedIds) => void;
}

export interface TreeItemSelection {
  /**
   * Boolean if multiple items within the tree can be selected at once.
   */
  multiSelect?: boolean;

  /**
   * The list of selected ids within the tree. If you only want to allow a
   * single item to be selected at a time within a tree, keep this as either an
   * empty list (no selections) or a single `itemId`.
   */
  selectedIds: SelectedIds;

  /**
   * A function to call that will update the `selectedIds` to include `itemId`
   * of the newly selected tree item. This will be triggered when:
   *
   * - the user clicks a tree item with mouse or touch
   * - user presses the space or enter key while keyboard focusing a tree item
   *
   * Note: If you are using the `useTreeItemSelection` hook, this will always
   * cause the `selectedIds` to be a list of just the selected `itemId` unless
   * the `multiSelect` (second argument) is enabled.
   */
  onItemSelect: (itemId: TreeItemId) => void;

  /**
   * A function to  call that will update the `selectedIds` for "batch"
   * selection updates. This will always be called with a unique list of
   * `itemId`s that contained the previous `itemId`s including the new
   * `itemId`s. This will only be called when the `multiSelect` prop has been
   * enabled and:
   *
   * - the user `Shift + Click`s items within the tree
   * - triggers "select-to" keyboard functionality with `Control+Shift+Home` or
   *   `Control+Shift+End`
   */
  onMultiItemSelect: (itemIds: SelectedIds) => void;
}

export interface TreeItemStates {
  /**
   * Boolean if the tree item is currently selected.
   */
  selected: boolean;

  /**
   * Boolean if the tree item is expanded. When this is true, it should add
   * `aria-expanded="true"` to the tree item.
   */
  expanded: boolean;

  /**
   * Boolean if the tree item is the current keyboard focus.
   */
  focused: boolean;
}

export interface TreeItemProps
  extends HTMLAttributes<HTMLLIElement>,
    TreeItemStates,
    TreeItemExpansionIcon,
    ListItemChildrenProps,
    Pick<SimpleListItemProps, "threeLines" | "height"> {
  /**
   * A DOM id for the tree item. This is required for a11y since this id should
   * reflect the `aria-activedescendant` value on the base `Tree` component to
   * show current keyboard focus.
   */
  id: string;

  /**
   * The current depth that the tree item is being rendered at. This will be a
   * number starting from `1` since it should be directly mapped to
   * `"aria-posinset"`.
   */
  depth: number;

  /**
   * The current tree item's index within its list at the provided depth. This
   * will be a number starting from `1` since it should be directly mapped to
   * `"aria-posinset"`.
   */
  itemIndex: number;

  /**
   * The current total list size for the tree item at the provided depth. This
   * should be mapped directly into `"aria-setsize"`.
   */
  listSize: number;

  /**
   * This function will only be provided when the tree item has child tree
   * items. This function should only be called within the exported `TreeGroup`
   * component or in a component that has the `role="group"` for accessibility.
   */
  renderChildItems?: () => ReactNode;

  /**
   * An optional `style` to apply to the surrounding `<li>` element for the tree
   * item. The `style` prop is actually passed to the `contentComponent` element
   * instead since you normally don't want to apply styles to the surrounding
   * element.
   */
  liStyle?: CSSProperties;

  /**
   * An optional `className` to apply to the surrounding `<li>` element for the
   * tree item. The `className` prop is actually passed to the
   * `contentComponent` element instead since you normally don't want to apply
   * styles to the surrounding element.
   */
  liClassName?: string;

  /**
   * An optional ref to apply to the content of the tree item.
   */
  liRef?: Ref<HTMLLIElement>;

  /**
   * Boolean if the `TreeItem` is a link component which changes up how the
   * accessibility attributes are applied to the DOM. The default behavior is to
   * check if the `contentComponent` is to consider it a link if it is not a
   * string (custom component) or the string: `"a"`. Since this might cause some
   * false-positives, you can set this flag instead which will always be used
   * instead.
   */
  isLink?: boolean;

  /**
   * The component to render the item's content in. This should normally stay as
   * the default `"span"` element, but if you'd like to make a navigation tree,
   * this can be set as a `Link` component from a routing library.
   *
   * Example:
   * ```
   * <TreeItem href="#" contentComponent="a" />
   *
   * <TreeItem to="/example-url" contentComponent={Link} exact />
   * ```
   */
  contentComponent?: ElementType;

  /**
   * Boolean if the tree item is read only. Not sure why this was added though
   * since `<li>` elements don't support `readOnly`.
   */
  readOnly?: boolean;

  /**
   * Boolean if the tree item is disabled which will prevent it from being
   * interactable. It will still be "keyboard focusable" while disabled, but
   * clicking or selecting won't work.
   */
  disabled?: boolean;
}

export interface TreeItemWithContentComponentProps extends TreeItemProps {
  /**
   * Since I allow the `contentComponent` prop for handling rendering `<a>` tags
   * from other routing libraries, I unfortunately need an index key so that
   * those props can be passed down correctly.
   */
  [key: string]: unknown;
}

export type ConfigurableTreeItemProps = Omit<
  TreeItemProps,
  | "id"
  | "depth"
  | "itemIndex"
  | "listSize"
  | "selected"
  | "expanded"
  | "focused"
  | "renderChildItems"
> & { children?: ReactNode };

type TreeItemKeys =
  | "id"
  | "depth"
  | "itemIndex"
  | "listSize"
  | "selected"
  | "expanded"
  | "focused"
  | "renderChildItems";

export interface ProvidedTreeItemProps
  extends Pick<TreeItemProps, TreeItemKeys> {
  /**
   * React `key`s aren't really "props", but it will be provided to each
   * `TreeItem` automatically.
   */
  key: string;

  /**
   * A ref that **must** be passed down to each `TreeItem` so that keyboard
   * accessibility works.  This will be omitted when the `isCustom` key is
   * enabled on the item.
   */
  liRef?: MutableRefObject<HTMLLIElement | null>;

  /**
   * A click handler that allows for the item to be selected or expanded. This
   * will be omitted when the `isCustom` key is enabled on the item.
   */
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}

export interface TreeProps<T extends BaseTreeItem = UnknownTreeItem>
  extends ListProps,
    TreeItemExpansionIcon,
    TreeItemExpansion,
    TreeItemSelection {
  /**
   * The id for the tree element. This is required for a lot of accessibility features.
   */
  id: string;

  /**
   * An optional label string that describes this tree. Either this or the
   * `aria-labelledby` prop are required for a11y.
   */
  "aria-label"?: string;

  /**
   * An optional id that points to an element that labels this tree. Either this
   * or the `aria-label` prop are required for a11y.
   */
  "aria-labelledby"?: string;

  /**
   * The data to render within the tree.
   */
  data: TreeData<T>;

  /**
   * An optional id to use to determine the root items within the tree. You'll
   * most likely want to keep this as the default of `null`, but it can also be
   * used if you have a different identifier for root items.
   */
  rootId?: null | TreeItemId;

  /**
   * @see TreeItemSorter
   */
  sort?: TreeItemSorter<T>;

  /**
   * A function that gets called to render each `TreeItem` within the tree. This
   * can be overridden if you need to add additional functionality around the
   * `TreeItem` (such as drag and drop). The default behavior is to extract the
   * `ListItem` props:
   *
   * - `leftAddon`
   * - `leftAddonType`
   * - `leftAddonPosition`
   * - `rightAddon`
   * - `rightAddonType`
   * - `rightAddonPosition`
   * - `children`
   * - `to` / `href`
   * - `isLink`
   *
   * and try to render as a `TreeItem` with those props. It will also override
   * the `expanderLeft` and `expanderIcon` on the `TreeItem` with whatever was
   * provided to the `Tree` component.
   */
  itemRenderer?: TreeItemRenderer<T>;

  /**
   * The key to use to extract a renderable label from each tree item. This will
   * be displayed in the DOM as the `children` in each tree item.
   */
  labelKey?: string;

  /**
   * The key to use to extract a text string from each tree item. This is used
   * for keyboard accessibility and being able to "search" the tree for items
   * starting with the typed letters.
   */
  valueKey?: string;

  /**
   * A function to extract the renderable label from each tree item. The default
   * behavior will be to just return `item[labelKey]`.
   */
  getItemLabel?: (item: T, labelKey: string) => ReactNode;

  /**
   * A function to extract the text string from each tree item. The default
   * behavior will be to return the `item[valueKey]` and stringify it.
   */
  getItemValue?: (item: T, valueKey: string) => string;

  /**
   * @see GetItemProps
   */
  getItemProps?: GetItemProps<T>;

  /**
   * The component to use for any treeitem that has a `to`, `href`, or `isLink`
   * attribute. This is a nice way to be able to update treeitems to be links
   * instead of storing the `contentComponent` in the tree's data.
   */
  linkComponent?: ElementType;
}

export type ProvidedTreeProps = Pick<TreeProps, "linkComponent" | "id"> &
  Required<
    Pick<
      TreeProps,
      | "rootId"
      | "multiSelect"
      | "labelKey"
      | "valueKey"
      | "getItemLabel"
      | "getItemValue"
      | "getItemProps"
      | "expanderLeft"
      | "expanderIcon"
    >
  >;
