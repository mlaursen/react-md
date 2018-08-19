import * as React from "react";
import { kebabCase } from "lodash";
import { Link } from "react-router-dom";
import { FlattenedTree, TreeViewDataList, TreeViewData } from "@react-md/tree-view";
import {
  HomeSVGIcon,
  InfoOutlineSVGIcon,
  BuildSVGIcon,
  WarningSVGIcon,
  AccessibilitySVGIcon,
} from "@react-md/material-icons";

const googleLogo = require("./googleLogo.svg");
const reactLogo = require("./reactLogo.svg");

function createRoute(
  path: string,
  name: string,
  icon?: React.ReactElement<any>,
  childItems?: TreeViewDataList
): TreeViewData {
  if (!childItems) {
    return {
      itemId: path,
      children: name,
      to: path,
      linkComponent: Link,
      leftIcon: icon,
    };
  }

  return {
    itemId: path,
    children: name,
    leftIcon: icon,
    childItems: childItems.map(({ itemId, to, ...remaining }) => ({
      itemId: `${path}${itemId}`,
      to: `${path}${itemId}`,
      ...remaining,
    })),
  };
}

function createPackage(name: string, { examples = true, proptypes = true, sassdoc = true } = {}): TreeViewData {
  const basePath = `/packages/${name === "a11y" ? name : kebabCase(name)}`;
  const childItems = [];
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
    children: `@react-md/${name}`,
    childItems,
  };
}

const routes: TreeViewDataList = [
  createRoute("/", "Home", <HomeSVGIcon />),
  createRoute("/getting-started", "Getting Started", <InfoOutlineSVGIcon />, [
    createRoute("/installation", "Installation"),
    createRoute("/updating-create-react-app", "Updating create-react-app"),
  ]),
  {
    itemId: "/packages",
    children: "Packages",
    leftIcon: <BuildSVGIcon />,
    childItems: [createPackage("a11y"), createPackage("app-bar"), createPackage("button")],
  },
  {
    itemId: "divider",
  },
  {
    itemId: "subheader",
    children: "References",
  },
  {
    itemId: "react",
    children: "React",
    leftIcon: <img className="rmd-avatar" src={reactLogo} alt="" role="presentation" />,
    href: "https://facebook.github.io/react/",
    linkComponent: "a",
  },
  {
    itemId: "material-design",
    children: "Material Design",
    leftIcon: <img className="rmd-avatar" src={googleLogo} alt="" role="presentation" />,
    href: "https://www.google.com/design/spec/material-design/introduction.html",
    linkComponent: "a",
  },
  {
    itemId: "material-icons",
    children: "Material Icons",
    leftIcon: <img className="rmd-avatar" src={googleLogo} alt="" role="presentation" />,
    href: "https://design.google.com/icons/",
    linkComponent: "a",
  },
  {
    itemId: "constrast-checker",
    children: "Contrast Checker",
    leftIcon: <AccessibilitySVGIcon />,
    href: "http://webaim.org/resources/contrastchecker/",
    linkComponent: "a",
  },
];

export default routes;
