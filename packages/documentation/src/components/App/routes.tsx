import * as React from "react";
import { kebabCase } from "lodash";
import { Link } from "react-router-dom";
import { FlattenedTree, TreeViewDataList, TreeViewData } from "@react-md/tree-view";
import { HomeSVGIcon, InfoOutlineSVGIcon, BuildSVGIcon, WarningSVGIcon } from "@react-md/material-icons";

function createRoute(path: string, name: string, icon?: React.ReactElement<any>): TreeViewData {
  return {
    itemId: path,
    children: name,
    to: path,
    linkComponent: Link,
    leftIcon: icon,
  };
}

function createPackage(name: string, { examples = true, proptypes = true, sassdoc = true } = {}): TreeViewData {
  const basePath = `/packages/${name === "a11y" ? name : kebabCase(name)}`;
  const childItems = [createRoute(`${basePath}/installation`, "Installation")];
  if (examples) {
    childItems.push(createRoute(`${basePath}/examples`, "Examples"));
  }

  if (proptypes) {
    childItems.push(createRoute(`${basePath}/proptypes`, "Prop Types"));
  }

  if (sassdoc) {
    childItems.push(createRoute(`${basePath}/sassdoc`, "SassDoc"));
  }

  return {
    itemId: basePath,
    children: name,
    childItems,
  };
}

const routes: TreeViewDataList = [
  createRoute("/", "Home", <HomeSVGIcon />),
  {
    itemId: "/packages",
    children: "Packages",
    leftIcon: <BuildSVGIcon />,
    childItems: [createPackage("a11y"), createPackage("app-bar"), createPackage("button")],
  },
];

export default routes;
