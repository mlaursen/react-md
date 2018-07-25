/* tslint:disable */
import * as React from "react";
import { Link } from "react-router-dom";
import { List, ListLink } from "@react-md/list";
import { TreeView, ITreeView, ITreeViewData, ITreeViewItem } from "@react-md/tree-view";

import "./navigation.scss";
import NavigationItem from "./NavigationItem";

const routes: ITreeViewData[] = [
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

export default class Navigation extends React.Component<{}, {}> {
  public render() {
    return (
      <TreeView
        id="navigation"
        className="navigation"
        data={routes}
        treeViewRenderer={this.treeViewRenderer}
        treeItemRenderer={this.treeItemRenderer}
      />
    );
  }

  private treeViewRenderer = (props: ITreeView) => <List {...props} />;

  private treeItemRenderer = (props: ITreeViewItem) => <NavigationItem {...props} />;
}
