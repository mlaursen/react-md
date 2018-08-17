import * as React from "react";
import { ILazyKey, FlattenedTreeViewData, FlattenedTreeViewDataList } from "./types";

export interface IFlattenedTreeViewData<D = ILazyKey> {
  [key: string]: FlattenedTreeViewData<D>;
}

export interface IFlattenedTreeViewProps<D = ILazyKey> {
  /**
   * The root id to use for the flattened tree. Every item that has a `parentId` set
   * to this value will be displayed at the top level.
   *
   * @docgen
   */
  rootId?: string | null;

  /**
   * A flattened tree view data object to convert into a `FlattenedTreeViewDataList`.
   *
   * @docgen
   */
  data: IFlattenedTreeViewData<D>;

  /**
   * A children callback function that will be provided a list of `FlattenedTreeViewData` and
   * should eventually be passed into the `TreeView` component as the `data` prop.
   *
   * @docgen
   */
  children: (data: FlattenedTreeViewDataList<D>) => React.ReactNode;

  /**
   * An optional function that will sort the data at each level. It should take in a `FlattenedTreeViewDataList`
   * and return a sorted `FlattenedTreeViewDataList`.
   *
   * @docgen
   */
  sort?: (data: FlattenedTreeViewDataList<D>) => FlattenedTreeViewDataList<D>;
}

export interface IFlattenedTreeViewDefaultProps {
  rootId: null;
}

export type FlattedTreeViewWithDefaultProps<D = ILazyKey> = IFlattenedTreeViewProps<D> & IFlattenedTreeViewDefaultProps;

/**
 * The `FlattenedTreeView` component is a pretty performant component used to rendering a flattened data structure
 * into the required nested lists data structure of the `TreeView` component.
 */
export default class FlattenedTreeView<D = ILazyKey> extends React.Component<IFlattenedTreeViewProps<D>, {}> {
  public shouldComponentUpdate(nextProps: IFlattenedTreeViewProps<D>) {
    return (
      this.props.data !== nextProps.data || this.props.rootId !== nextProps.rootId || this.props.sort !== nextProps.sort
    );
  }

  public render() {
    const { children, data, rootId } = this.props;

    return children(this.buildTree(null, Object.values(data)) || []);
  }

  private buildTree = (parentId: string | null, list: FlattenedTreeViewDataList<D>) => {
    const childTreeItems = [];
    let i = list.length;
    while (i > 0) {
      i -= 1;
      if (list[i] && list[i].parentId === parentId) {
        const [item] = list.splice(i, 1);
        childTreeItems.unshift(item);
      }
    }

    if (!childTreeItems.length) {
      return undefined;
    }

    childTreeItems.forEach(treeItem => {
      treeItem.childItems = this.buildTree(treeItem.itemId, list);
    });

    if (this.props.sort) {
      return this.props.sort(childTreeItems);
    }

    return childTreeItems;
  };
}
