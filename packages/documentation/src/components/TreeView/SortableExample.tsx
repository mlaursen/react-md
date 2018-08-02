import * as React from "react";
import { SortableContainer, SortableElement, arrayMove, SortEnd, SortableHandle } from "react-sortable-hoc";
import { DragHandleSVGIcon } from "@react-md/material-icons";
import { List } from "@react-md/list";
import {
  IFlattenedTreeViewData,
  FlattenedTreeView,
  TreeView,
  TreeViewControls,
  ITreeViewInjectedProps,
  ITreeViewItemInjectedProps,
  TreeViewData,
  TreeViewDataList,
  DefaultTreeItemRenderer,
  IDefaultTreeItemRendererProps,
  ITreeGroupProps,
  TreeGroup,
  TreeItem,
  ITreeItemProps,
} from "@react-md/tree-view";

import "./sortable-example.scss";

const DragHandle = SortableHandle(() => <DragHandleSVGIcon />);
const SortableList = SortableContainer(props => <List {...props} />);
const SortableTreeItem = SortableElement<IDefaultTreeItemRendererProps>(DefaultTreeItemRenderer);

const defaultData: TreeViewDataList = Array.from(new Array(49)).map((_, i) => ({
  itemId: `item-${i + 1}`,
  index: i,
  children: `Item ${i + 1}`,
  childItems:
    i % 8 === 0 || i % 9 === 0
      ? Array.from(new Array(4)).map((__, j) => ({
          itemId: `item-${i + 1}-${j + 1}`,
          index: j,
          children: `Item ${i + 1} ${j + 1}`,
        }))
      : undefined,
}));

export interface ISortableExampleState {
  data: TreeViewDataList;
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

  private handleSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    this.setState({ data: arrayMove(this.state.data, oldIndex, newIndex) }, () => {
      if (this.treeView.current) {
        this.treeView.current.updateTreeItems();
      }
    });
  };

  private treeViewRenderer = (props: ITreeViewInjectedProps) => (
    <SortableList {...props} onSortEnd={this.handleSortEnd} transitionDuration={150} useDragHandle={true} />
  );

  private treeItemRenderer = (item: TreeViewData, props: ITreeViewItemInjectedProps) => (
    <SortableTreeItem
      {...props}
      index={props.itemIndex}
      leftIcon={<DragHandle />}
      forceIconWrap={true}
    >
      {item.children}
    </SortableTreeItem>
  );
}
