import * as React from "react";
import { SortableContainer, SortableElement, arrayMove, SortEnd, SortableHandle } from "react-sortable-hoc";
import { DragHandleSVGIcon } from "@react-md/material-icons";
import { List } from "@react-md/list";
import {
  IFlattenedTreeViewData,
  FlattenedTreeView,
  TreeView,
  TreeViewControls,
  TreeItem,
  ITreeView,
  ITreeViewItem,
  ITreeItemData,
} from "@react-md/tree-view";

import "./sortable-example.scss";

const DragHandle = SortableHandle(() => <DragHandleSVGIcon />);
const SortableTreeItem = SortableElement(TreeItem);
const SortableList = SortableContainer(props => <List {...props} />);

const defaultData: ITreeItemData[] = Array.from(new Array(49)).map((_, i) => ({
  itemId: `item-${i + 1}`,
  index: i,
  children: `Item ${i + 1}`,
}));

export interface ISortableExampleState {
  data: ITreeItemData[];
}

export default class SortableExample extends React.Component<{}, ISortableExampleState> {
  private treeView: React.RefObject<TreeView>;
  constructor(props: {}) {
    super(props);

    this.state = {
      data: defaultData,
    };
    this.treeView = React.createRef();
  }

  public render() {
    return (
      <TreeViewControls
        data={this.state.data}
        id="sortable-tree-view"
        aria-label="Sortable tree view"
        className="sortable-tree-view"
        treeViewRenderer={this.treeViewRenderer}
        treeItemRenderer={this.treeItemRenderer}
      >
        {props => <TreeView {...props} ref={this.treeView} />}
      </TreeViewControls>
    );
  }

  private getIndex = (itemId: string) => {
    const { data } = this.state;
    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];
      if (item.itemId === itemId) {
        return i;
      }
    }

    return -1;
  };

  private handleSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    this.setState({ data: arrayMove(this.state.data, oldIndex, newIndex) }, () => {
      if (this.treeView.current) {
        this.treeView.current.updateTreeItems();
      }
    });
  };

  private treeViewRenderer = (props: ITreeView) => (
    <SortableList {...props} onSortEnd={this.handleSortEnd} transitionDuration={150} useDragHandle={true} />
  );
  private treeItemRenderer = (props: ITreeViewItem) => (
    <SortableTreeItem {...props} index={this.getIndex(props.itemId)} leftIcon={<DragHandle />} forceIconWrap={true} />
  );
}
