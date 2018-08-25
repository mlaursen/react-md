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
  [key: string]: FlattenedTreeViewData<D>
}

/**
 * A simple list version of the FlattenedTreeViewData.
 */
export type FlattenedTreeViewDataList<D = IIndexKeyAny> = Array<FlattenedTreeViewData<D>>;

/**
 * The function that should render the tree view that is really just a Stateless Functional Component.
 * This should take in the base `ITreeViewInjectedProps` and render the tree. By default, this will
 * include all the html attributes for the `HTMLOListElement` or `HTMLUListElement`, but can be updated
 * to provide a type or interface for the remaining keys. The default is to allow any key passed down
 * just so it isn't super hard to get something rendered.
 */
export type treeViewRenderer<R = IIndexKeyAny> = (props: ITreeViewInjectedProps & R) => React.ReactNode;

/**
 * The function that should render each tree item that appears within the tree view. It will provide
 * the current TreeViewData and the `ITreeViewItemInjectedPropsWithKey` so that you can render items fairly
 * dynamically.
 */
export type treeItemRenderer<D = IIndexKeyAny> = (
  item: TreeViewData<D>,
  props: ITreeViewItemInjectedPropsWithKey
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
