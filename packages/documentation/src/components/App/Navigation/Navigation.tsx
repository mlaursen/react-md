/* tslint:disable */
import * as React from "react";
import { Link } from "react-router-dom";
import { List, ListLink } from "@react-md/list";
import { TreeView, ITreeView, ITreeItemData, ITreeViewItem } from "@react-md/tree-view";

import "./navigation.scss";
import NavigationItem from "./NavigationItem";

const routes: ITreeItemData[] = [
  {
    itemId: "/",
    name: "Home",
  },
  {
    itemId: "/components",
    name: "Components",
    children: [
      {
        itemId: "/components/button",
        name: "Button",
      },
      {
        itemId: "/components/link",
        name: "Link",
      },
      {
        itemId: "/components/tree-view",
        name: "Tree View",
      },
    ],
  },
];

export interface INavigationState {
  expandedIds: string[];
  selectedId: string;
}

export default class Navigation extends React.Component<{}, INavigationState> {
  constructor(props: {}) {
    super(props);

    this.state = { expandedIds: [], selectedId: routes[0].itemId };
  }

  public render() {
    return (
      <TreeView
        id="navigation"
        className="navigation"
        data={routes}
        expandedIds={this.state.expandedIds}
        selectedId={this.state.selectedId}
        onItemSelect={this.handleItemSelect}
        onItemExpandedChange={this.handleItemExpandedChange}
        onSiblingExpansion={this.handleSiblingExpansion}
      />
    );
  }

  private handleItemSelect = (itemId: string) => {
    this.setState({ selectedId: itemId });
  };

  private handleItemExpandedChange = (itemId: string, expanded: boolean) => {
  };

  private handleSiblingExpansion = (expandedIds: string[]) => {
  };

  private treeViewRenderer = (props: ITreeView) => <List {...props} />;

  private treeItemRenderer = (props: ITreeViewItem) => <NavigationItem {...props} />;
}
