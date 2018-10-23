import * as React from "react";
import {
  IIndexKeyAny,
  FlattenedTreeViewData,
  FlattenedTreeViewDataList,
  FlattenedTreeViewSort,
} from "./types";
import buildTree from "./utils/buildTree";

export interface IFlattenedTreeViewData<D = IIndexKeyAny> {
  [key: string]: FlattenedTreeViewData<D>;
}

export interface IFlattenedTreeViewProps<D = IIndexKeyAny> {
  /**
   * The root id to use for the flattened tree. Every item that has a `parentId` set
   * to this value will be displayed at the top level.
   */
  rootId?: string | null;

  /**
   * A flattened tree view data object to convert into a `FlattenedTreeViewDataList`.
   */
  data: IFlattenedTreeViewData<D>;

  /**
   * A children callback function that will be provided a list of `FlattenedTreeViewData` and
   * should eventually be passed into the `TreeView` component as the `data` prop.
   */
  children: (data: FlattenedTreeViewDataList<D>) => React.ReactNode;

  /**
   * An optional function that will sort the data at each level. It should take in a `FlattenedTreeViewDataList`
   * and return a sorted `FlattenedTreeViewDataList`.
   */
  sort?: FlattenedTreeViewSort<D>;
}

export interface IFlattenedTreeViewDefaultProps {
  rootId: null;
}

export type FlattenedTreeViewWithDefaultProps<D = IIndexKeyAny> = IFlattenedTreeViewProps<D> &
  IFlattenedTreeViewDefaultProps;

/**
 * The `FlattenedTreeView` component is a pretty performant component used to rendering a flattened data structure
 * into the required nested lists data structure of the `TreeView` component.
 */
export default class FlattenedTreeView<D = IIndexKeyAny> extends React.Component<
  IFlattenedTreeViewProps<D>
> {
  public static defaultProps: IFlattenedTreeViewDefaultProps = {
    rootId: null,
  };

  public shouldComponentUpdate(nextProps: IFlattenedTreeViewProps<D>) {
    return (
      this.props.data !== nextProps.data ||
      this.props.rootId !== nextProps.rootId ||
      this.props.sort !== nextProps.sort
    );
  }

  public render() {
    const { children, data, rootId, sort } = this.props as FlattenedTreeViewWithDefaultProps<D>;

    return children(buildTree(rootId, Object.values(data), sort) || []);
  }
}
