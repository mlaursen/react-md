import * as React from "react";
import { kebabCase } from "lodash";
import * as Router from "react-router";
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

export interface IRouteWithLink {
  to?: string;
  href?: string;
  linkComponent?: React.ReactType<any>;
  leftIcon?: React.ReactElement<any>;
  children?: React.ReactNode;
}

export type Route = TreeViewData<IRouteWithLink>;
export type RouteList = TreeViewDataList<IRouteWithLink>;

function createRoute(path: string, name: string, icon?: React.ReactElement<any>, childItems?: RouteList): Route {
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

function createPackage(name: string, { examples = true, propTypes = true, sassdoc = true } = {}): Route {
  const basePath = `/packages/${name === "a11y" ? name : kebabCase(name)}`;
  const childItems = [];
  if (examples) {
    childItems.push(createRoute(`${basePath}/examples`, "Examples"));
  }

  if (propTypes) {
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

export const routes: RouteList = [
  createRoute("/", "Home", <HomeSVGIcon />),
  createRoute("/getting-started", "Getting Started", <InfoOutlineSVGIcon />, [
    createRoute("/installation", "Installation"),
    createRoute("/updating-create-react-app", "Updating create-react-app"),
  ]),
  {
    itemId: "/packages",
    children: "Packages",
    leftIcon: <BuildSVGIcon />,
    childItems: [
      createPackage("a11y"),
      createPackage("app-bar"),
      createPackage("button"),
      createPackage("elevation", { examples: false, propTypes: false }),
      createPackage("icon"),
      createPackage("list"),
      createPackage("listeners", { sassdoc: false }),
      createPackage("material-icons", { sassdoc: false, propTypes: false }),
      createPackage("overlay"),
      createPackage("portal", { sassdoc: false }),
      createPackage("sheet"),
      createPackage("states"),
      createPackage("theme", { propTypes: false }),
      createPackage("tooltip"),
      createPackage("transition"),
      createPackage("tree-view"),
      createPackage("typography"),
    ],
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

function reduceValid(list: string[], { to, childItems }: Route) {
  if (to) {
    list.push(to);
  }

  if (childItems) {
    [].push.apply(list, childItems.reduce(reduceValid, []));
  }

  return list;
}

const validRoutes = routes.reduce(reduceValid, []);

export default routes;
