import * as React from "react";
import { ILazyKey, FlattenedTreeViewData, FlattenedTreeViewDataList } from "./types";

export interface IFlattenedTreeViewData<D = ILazyKey> {
  [key: string]: FlattenedTreeViewData<D>;
}

export interface IFlattenedTreeViewProps<D = ILazyKey> {
  rootId?: string | null;
  data: IFlattenedTreeViewData<D>;
  children: (data: FlattenedTreeViewDataList<D>) => React.ReactNode;
  sort?: (data: FlattenedTreeViewDataList<D>) => FlattenedTreeViewDataList<D>;
}

export interface IFlattenedTreeViewDefaultProps {
  rootId: null;
}

export type FlattedTreeViewWithDefaultProps<D = ILazyKey> = IFlattenedTreeViewProps<D> & IFlattenedTreeViewDefaultProps;

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
