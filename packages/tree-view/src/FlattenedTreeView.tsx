import * as React from "react";
import { ITreeItemData } from "./TreeItem";

export interface IFlattedTreeViewItemData extends ITreeItemData {
  parentId: string | null;
}

export interface IFlattenedTreeViewData {
  [key: string]: IFlattedTreeViewItemData;
}

export interface IFlattenedTreeViewProps {
  rootId?: string | null;
  data: IFlattenedTreeViewData;
  children: (data: ITreeItemData[]) => React.ReactNode;
  sort?: (data: ITreeItemData[]) => ITreeItemData[];
}

export interface IFlattenedTreeViewDefaultProps {
  rootId: null;
}

export type FlattedTreeViewWithDefaultProps = IFlattenedTreeViewProps & IFlattenedTreeViewDefaultProps;

export default class FlattenedTreeView extends React.Component<IFlattenedTreeViewProps, {}> {
  public shouldComponentUpdate(nextProps: IFlattenedTreeViewProps) {
    return (
      this.props.data !== nextProps.data || this.props.rootId !== nextProps.rootId || this.props.sort !== nextProps.sort
    );
  }

  public render() {
    const { children, data, rootId } = this.props;
    return children(this.buildTree(null, Object.values(data)) || []);
  }

  private buildTree = (parentId: string | null, list: ITreeItemData[]) => {
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
