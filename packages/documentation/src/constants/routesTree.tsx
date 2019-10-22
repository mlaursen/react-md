/* eslint-disable @typescript-eslint/no-use-before-define, import/prefer-default-export */
import React, { ReactNode } from "react";
import { LayoutNavigationTree } from "@react-md/layout";
import {
  BuildSVGIcon,
  ColorLensSVGIcon,
  HomeSVGIcon,
  InfoOutlineSVGIcon,
} from "@react-md/material-icons";

import LinkUnstyled from "components/LinkUnstyled";
import MaterialDesignSVGIcon from "icons/MaterialDesignSVGIcon";
import ReactSVGIcon from "icons/ReactSVGIcon";
import { toTitle } from "utils/toTitle";

interface ChildRouteConfig {
  path: string;
  children: ReactNode;
  childRoutes?: ChildRouteConfig[];
}

interface RouteConfig {
  icon?: ReactNode;
  childRoutes?: ChildRouteConfig[];
  parentPath?: string | null;
}

export const routesTree: LayoutNavigationTree = {};

/**
 * A small helper function to create a child route from the base `createRoute`
 * function. This is really used so that the parent pathnames can be prepended
 * the the provided child route's path.
 */
function createChildRoute(
  childRoute: ChildRouteConfig,
  parentPath: string
): void {
  const { path, children, childRoutes } = childRoute;
  createRoute(path, children, { childRoutes, parentPath });
}

/**
 * Creates a route in the `routesTree` from the provided configuration. When
 * child routes are provided, they will also be inserted into the tree with
 * the parentId set automatically to the current route path and will be
 * updated to be prepended with the current route path.
 *
 * This will render as an expandable tree item when there are no child routes,
 * otherwise it will render as a link tree item.
 */
function createRoute(
  path: string,
  children: ReactNode,
  config: RouteConfig
): void {
  const { icon, childRoutes = [], parentPath = null } = config;
  const href = `${parentPath || ""}${path}`;
  routesTree[href] = {
    itemId: href,
    parentId: parentPath,
    children,
    leftIcon: icon,
    href: childRoutes.length ? undefined : href,
    contentComponent: childRoutes.length ? undefined : LinkUnstyled,
  };

  childRoutes.forEach(childRoute => createChildRoute(childRoute, href));
}

interface PackageRouteConfig {
  install?: boolean;
  api?: boolean;
  demos?: boolean;
  sassdoc?: boolean;
}

function createPackageRoute(
  name: string,
  config: PackageRouteConfig = {}
): ChildRouteConfig {
  const { install = true, api = true, demos = true, sassdoc = true } = config;

  const childRoutes: ChildRouteConfig[] = [];
  if (demos) {
    childRoutes.push({
      path: "/demos",
      children: "Demos",
    });
  }

  if (install) {
    childRoutes.push({
      path: "/installation",
      children: "Installation",
    });
  }

  if (api) {
    childRoutes.push({
      path: "/api",
      children: "API",
    });
  }

  if (sassdoc) {
    childRoutes.push({
      path: "/sassdoc",
      children: "SassDoc",
    });
  }

  return {
    path: `/${name}`,
    children: toTitle(name),
    childRoutes,
  };
}

/**
 * Creates a divider in the tree.
 */
function createDivider(index: number, parentId: string | null = null): void {
  const itemId = `divider-${index}`;
  routesTree[itemId] = {
    itemId,
    parentId,
    children: null,
    divider: true,
    isCustom: true,
  };
}

/**
 * Creates a subheader in the tree.
 */
function createSubheader(
  itemId: string,
  children: ReactNode,
  parentId: string | null = null
): void {
  routesTree[itemId] = {
    itemId,
    parentId,
    children,
    isCustom: true,
    subheader: true,
  };
}

/**
 * Creates an external route in the tree that will open the link
 * in an external tab.
 */
function createExternalRoute(
  href: string,
  children: ReactNode,
  icon?: ReactNode
): void {
  routesTree[href] = {
    itemId: href,
    parentId: null,
    children,
    href,
    rel: "noopener noreferrer",
    target: "_blank",
    leftIcon: icon,
    contentComponent: LinkUnstyled,
  };
}

createRoute("/", "Home", { icon: <HomeSVGIcon /> });
createRoute("/getting-started", "Getting Started", {
  icon: <InfoOutlineSVGIcon />,
  childRoutes: [
    { path: "/quick-start", children: "Quick Start" },
    { path: "/installation", children: "Installation" },
    {
      path: "/updating-create-react-app",
      children: "Updating create-react-app",
    },
    { path: "/with-v1", children: "With v1" },
  ],
});
createRoute("/customization", "Customization", {
  icon: <ColorLensSVGIcon />,
  childRoutes: [
    { path: "/color-palette", children: "Color Palette" },
    { path: "/theme-builder", children: "Theme Builder" },
    { path: "/overriding-defaults", children: "Overriding Defaults" },
    { path: "/creating-dynamic-themes", children: "Creating Dynamic Themes" },
  ],
});
createRoute("/packages", "Packages", {
  icon: <BuildSVGIcon />,
  childRoutes: [
    createPackageRoute("alert"),
    createPackageRoute("app-bar"),
    createPackageRoute("autocomplete"),
    createPackageRoute("avatar"),
    createPackageRoute("badge"),
    createPackageRoute("button"),
    createPackageRoute("card"),
    createPackageRoute("chip"),
    createPackageRoute("dialog"),
    createPackageRoute("divider"),
    createPackageRoute("elevation", { api: false }),
    createPackageRoute("form"),
    createPackageRoute("icon"),
    createPackageRoute("layout", { demos: false }),
    createPackageRoute("link"),
    createPackageRoute("list"),
    createPackageRoute("material-icons", { sassdoc: false }),
    createPackageRoute("media"),
    createPackageRoute("menu"),
    createPackageRoute("overlay"),
    createPackageRoute("portal"),
    createPackageRoute("progress"),
    createPackageRoute("states"),
    createPackageRoute("sheet"),
    createPackageRoute("table"),
    createPackageRoute("theme"),
    createPackageRoute("tooltip"),
    createPackageRoute("transition"),
    createPackageRoute("tree"),
    createPackageRoute("typography"),
    createPackageRoute("utils"),
  ],
});
createDivider(0);
createSubheader("references", "References");
createExternalRoute("https://reactjs.org", "React", <ReactSVGIcon />);
createExternalRoute(
  "https://material.io/design",
  "Material Design",
  <MaterialDesignSVGIcon />
);
