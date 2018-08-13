import * as React from "react";
import { Link } from "react-router-dom";
import { HomeSVGIcon, InfoOutlineSVGIcon, BuildSVGIcon, WarningSVGIcon } from "@react-md/material-icons";
import { TreeView, TreeViewControls, FlattenedTree, FlattenedTreeView } from "@react-md/tree-view";

import "./navigation.scss";

const flattenedRoutes = {
  "app-bars": {
    itemId: "app-bars",
    parentId: "components",
    to: "/components/app-bar",
    children: "App Bar",
    linkComponent: Link,
  },
  home: {
    itemId: "home",
    parentId: null,
    children: "Home",
    leftIcon: <HomeSVGIcon />,
    to: "/",
    linkComponent: Link,
  },
  "discover-more": {
    itemId: "discover-more",
    parentId: null,
    children: "Discover More",
    leftIcon: <InfoOutlineSVGIcon />,
  },
  components: {
    itemId: "components",
    parentId: null,
    children: "Component",
    leftIcon: <BuildSVGIcon />,
  },
  buttons: {
    itemId: "buttons",
    parentId: "components",
    children: "Button",
    to: "/components/button",
    linkComponent: Link,
  },
  links: {
    itemId: "links",
    parentId: "components",
    children: "Link",
    linkComponent: Link,
    to: "/components/link",
  },
  portals: {
    itemId: "portals",
    parentId: "components",
    children: "Portal",
    linkComponent: Link,
    to: "/components/portal",
  },
  "tree-views": {
    itemId: "tree-views",
    parentId: "components",
    children: "Tree View",
    linkComponent: Link,
    to: "/components/tree-view",
  },
  "whats-new": {
    itemId: "whats-new",
    parentId: "discover-more",
    children: "What's New",
    linkComponent: Link,
    to: "/discover-more/whats-new",
  },
  "upgrade-guides": {
    itemId: "upgrade-guides",
    parentId: "discover-more",
    children: "Upgrade Guides",
  },
  "upgrade-v2.0.0": {
    itemId: "upgrade-v2.0.0",
    parentId: "upgrade-guides",
    children: "v2.0.0",
    linkComponent: Link,
    to: "/discover-more/upgrade-guides/v2.0.0",
  },
  "upgrade-v1.0.0": {
    itemId: "upgrade-v1.0.0",
    parentId: "upgrade-guides",
    children: "v1.0.0",
    linkComponent: Link,
    to: "/discover-more/upgrade-guides/v1.0.0",
  },
} as FlattenedTree;

const Navigation: React.SFC<{}> = () => (
  <FlattenedTreeView data={flattenedRoutes}>
    {data => (
      <TreeViewControls id="navigation" className="navigation" data={data}>
        {props => <TreeView {...props} dense={true} />}
      </TreeViewControls>
    )}
  </FlattenedTreeView>
);

export default Navigation;
