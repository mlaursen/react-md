/* tslint:disable */
import * as React from "react";
import { List, ListItemText } from "@react-md/list";
import { TreeView, ITreeView, ITreeViewItem } from "@react-md/tree-view";
import { KeyboardClickable } from "@react-md/a11y";
import { Collapse } from "@react-md/transition";

export interface INavigationExampleProps {}

export interface INavigationExampleState {
  expandedIds: string[];
}

const data = [
  {
    itemId: "item-1",
    children: [
      {
        itemId: "item-1-1",
      },
      {
        itemId: "item-1-2",
      },
    ],
  },
  {
    itemId: "item-2",
    children: [
      {
        itemId: "item-2-1",
        children: [{ itemId: "item-2-1-1" }],
      },
      {
        itemId: "item-2-2",
      },
      { itemId: "item-2-3" },
      { itemId: "item-2-4", children: [{ itemId: "item-2-4-1" }, { itemId: "item-2-4-2" }] },
    ],
  },
];

export default class NavigationExample extends React.Component<INavigationExampleProps, INavigationExampleState> {
  constructor(props: INavigationExampleProps) {
    super(props);

    this.state = { expandedIds: [] };
  }

  public render() {
    return (
      <TreeView
        id="example-tree-view"
        data={data}
        expandedIds={this.state.expandedIds}
        treeItemRenderer={this.renderTreeItem}
        treeViewRenderer={this.renderTreeView}
        onItemExpandedChange={this.handleItemClick}
        onSiblingExpansion={this.handleSiblingExpansion}
      />
    );
  }

  private handleSiblingExpansion = (expandedIds: string[]) => {
    this.setState({ expandedIds });
  };

  private handleItemClick = (itemId: string, expanded: boolean) => {
    const expandedIds = this.state.expandedIds.slice();
    const i = expandedIds.indexOf(itemId);
    if (expanded && i === -1) {
      expandedIds.push(itemId);
    } else if (!expanded && i !== -1) {
      expandedIds.splice(i, 1);
    }

    if (expandedIds.length !== this.state.expandedIds.length) {
      this.setState({ expandedIds });
    }
  };

  private renderTreeItem = ({
    key,
    item,
    expanded,
    selected,
    renderChildren,
    onItemExpandedChange,
    onItemSelect,
    ...props
  }: ITreeViewItem) => {
    let group;
    if (renderChildren) {
      group = (
        <Collapse collapsed={!expanded}>
          {({ refCallback, ...props }) => (
            <List role="group" {...props} ref={refCallback}>
              {renderChildren()}
            </List>
          )}
        </Collapse>
      );
    }

    return (
      <li key={key} role="none">
        <div
          {...props}
          onClick={() => {
            onItemExpandedChange(item.itemId, !expanded);
            onItemSelect(item.itemId);
          }}
        >
          <ListItemText>Item {item.itemId}</ListItemText>
        </div>
        {group}
      </li>
    );
  };
  private renderTreeView = ({ refCallback, ...props }: ITreeView) => <List ref={refCallback} {...props} />;
}
