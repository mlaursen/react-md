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

import Home from "components/Home";
import GettingStarted from "components/GettingStarted";
import A11y from "components/packages/A11y";
import AppBar from "components/packages/AppBar";
import Button from "components/packages/Button";
import Elevation from "components/packages/Elevation";
import Icon from "components/packages/Icon";
import List from "components/packages/List";
import Listeners from "components/packages/Listeners";
import MaterialIcons from "components/packages/MaterialIcons";
import Overlay from "components/packages/Overlay";
import Portal from "components/packages/Portal";
import Sheet from "components/packages/Sheet";
import States from "components/packages/States";
import Theme from "components/packages/Theme";
import Tooltip from "components/packages/Tooltip";
import Transition from "components/packages/Transition";
import TreeView from "components/packages/TreeView";
import Typography from "components/packages/Typography";

const googleLogo = require("./googleLogo.svg");
const reactLogo = require("./reactLogo.svg");

export interface IRouteWithLink {
  to?: string;
  href?: string;
  linkComponent?: React.ReactType;
  routeComponent?: RouteComponent;
  leftIcon?: React.ReactElement<any>;
  children?: React.ReactNode;
}

export type Route = TreeViewData<IRouteWithLink>;
export type RouteList = TreeViewDataList<IRouteWithLink>;
export type RouteComponent =
  | React.ComponentClass<Router.RouteComponentProps<void>>
  | React.StatelessComponent<Router.RouteComponentProps<void>>;

export interface IRouteConfig {
  path: string;
  component: RouteComponent;
  exact: boolean;
}

function createRoute(
  path: string,
  name: string,
  icon?: React.ReactElement<any>,
  routeComponent?: RouteComponent,
  childItems?: RouteList
): Route {
  if (!childItems) {
    return {
      itemId: path,
      children: name,
      to: path,
      linkComponent: Link,
      routeComponent,
      leftIcon: icon,
    };
  }

  return {
    itemId: path,
    children: name,
    leftIcon: icon,
    routeComponent,
    childItems: childItems.map(({ itemId, to, ...remaining }) => ({
      itemId: `${path}${itemId}`,
      to: `${path}${itemId}`,
      ...remaining,
    })),
  };
}

function createPackage(
  name: string,
  routeComponent: RouteComponent,
  { examples = true, propTypes = true, sassdoc = true } = {}
): Route {
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
    routeComponent,
    childItems,
  };
}

export const routes: RouteList = [
  createRoute("/", "Home", <HomeSVGIcon />, Home),
  createRoute("/getting-started", "Getting Started", <InfoOutlineSVGIcon />, GettingStarted, [
    createRoute("/installation", "Installation"),
    createRoute("/updating-create-react-app", "Updating create-react-app"),
  ]),
  {
    itemId: "/packages",
    children: "Packages",
    leftIcon: <BuildSVGIcon />,
    childItems: [
      createPackage("a11y", A11y),
      createPackage("app-bar", AppBar),
      createPackage("button", Button),
      createPackage("elevation", Elevation, { examples: false, propTypes: false }),
      createPackage("icon", Icon),
      createPackage("list", List),
      createPackage("listeners", Listeners, { sassdoc: false }),
      createPackage("material-icons", MaterialIcons, { sassdoc: false, propTypes: false }),
      createPackage("overlay", Overlay),
      createPackage("portal", Portal, { sassdoc: false }),
      createPackage("sheet", Sheet),
      createPackage("states", States),
      createPackage("theme", Theme, { propTypes: false }),
      createPackage("tooltip", Tooltip),
      createPackage("transition", Transition),
      createPackage("tree-view", TreeView),
      createPackage("typography", Typography),
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

function reduceConfig(list: IRouteConfig[], { to, childItems, itemId, routeComponent }: Route) {
  if (routeComponent) {
    list.push({ path: itemId, component: routeComponent, exact: itemId === "/" });
  }

  if (childItems) {
    [].push.apply(list, childItems.reduce(reduceConfig, []));
  }

  return list;
}

export const routesConfig = routes.reduce(reduceConfig, []);

export default routes;
