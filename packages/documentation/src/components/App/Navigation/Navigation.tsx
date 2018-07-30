import * as React from "react";
import { Link } from "react-router-dom";
import { HomeSVGIcon, InfoOutlineSVGIcon, BuildSVGIcon } from "@react-md/material-icons";
import {
  TreeView,
  TreeViewControls,
  ITreeItemData,
  FlattenedTreeView,
  IFlattenedTreeViewData,
} from "@react-md/tree-view";

import "./navigation.scss";

const routes: ITreeItemData[] = [
  {
    itemId: "/",
    children: "Home",
    link: true,
    leftIcon: <HomeSVGIcon />,
  },
  {
    itemId: "/discover-more",
    children: "Discover More",
    leftIcon: <InfoOutlineSVGIcon />,
    childItems: [
      {
        itemId: "/discover-more/whats-new",
        children: "What's New",
        link: true,
      },
      {
        itemId: "/discover-more/upgrade-guides",
        children: "Upgrade Guides",
        childItems: [
          {
            itemId: "/discover-more/upgrade-guides/v1.0.0",
            children: "v1.0.0",
            link: true,
          },
          {
            itemId: "/discover-more/upgrade-guides/v2.0.0",
            children: "v2.0.0",
            link: true,
          },
        ],
      },
    ],
  },
  {
    itemId: "/components",
    children: "Components",
    leftIcon: <BuildSVGIcon />,
    childItems: [
      {
        itemId: "/components/button",
        children: "Button",
        link: true,
      },
      {
        itemId: "/components/link",
        children: "Link",
        link: true,
      },
      {
        itemId: "/components/tree-view",
        children: "Tree View",
        link: true,
      },
    ],
  },
];

const flattenedRoutes = {
  home: {
    itemId: "home",
    parentId: null,
    children: "Home",
    leftIcon: <HomeSVGIcon />,
    to: "/",
    link: true,
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
    link: true,
  },
  links: {
    itemId: "links",
    parentId: "components",
    children: "Link",
    link: true,
    to: "/components/link",
  },
  "tree-views": {
    itemId: "tree-views",
    parentId: "components",
    children: "Tree View",
    link: true,
    to: "/components/tree-view",
  },
  "whats-new": {
    itemId: "whats-new",
    parentId: "discover-more",
    children: "What's New",
    link: true,
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
    link: true,
    to: "/discover-more/upgrade-guides/v2.0.0",
  },
  "upgrade-v1.0.0": {
    itemId: "upgrade-v1.0.0",
    parentId: "upgrade-guides",
    children: "v1.0.0",
    link: true,
    to: "/discover-more/upgrade-guides/v1.0.0",
  },
} as IFlattenedTreeViewData;

const Navigation: React.SFC<{}> = () => (
  <FlattenedTreeView data={flattenedRoutes}>
    {data => (
      <TreeViewControls id="navigation" className="navigation" data={data} linkComponent={Link}>
        {props => <TreeView {...props} dense={true} />}
      </TreeViewControls>
    )}
  </FlattenedTreeView>
);

export default Navigation;
