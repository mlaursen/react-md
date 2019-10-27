/* eslint-disable @typescript-eslint/no-use-before-define, import/prefer-default-export */
import React, { ReactNode } from "react";
import { LayoutNavigationTree } from "@react-md/layout";
import {
  BuildSVGIcon,
  ColorLensSVGIcon,
  DescriptionSVGIcon,
  HomeSVGIcon,
  InfoOutlineSVGIcon,
} from "@react-md/material-icons";

import MaterialDesignSVGIcon from "icons/MaterialDesignSVGIcon";
import ReactSVGIcon from "icons/ReactSVGIcon";
import { toTitle } from "utils/toTitle";

interface ChildRouteConfig {
  as?: string;
  path: string;
  icon?: ReactNode;
  children: ReactNode;
  childRoutes?: ChildRouteConfig[];
}

interface RouteConfig {
  as?: string;
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
  const { as, path, children, childRoutes, icon } = childRoute;
  createRoute(path, children, { childRoutes, parentPath, icon, as });
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
  const nextPath = `${parentPath || ""}${path}`;

  let as: string | undefined;
  let href: string | undefined;
  let itemId = nextPath;
  if (!childRoutes.length) {
    href = itemId;
    if (config.as) {
      as = `${parentPath || ""}${config.as}`;
      itemId = as;
    }
  }

  routesTree[itemId] = {
    itemId,
    parentId: parentPath,
    children,
    leftIcon: icon,
    as,
    href,
  };

  childRoutes.forEach(childRoute => createChildRoute(childRoute, nextPath));
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
  };
}

createRoute("/", "Home", { icon: <HomeSVGIcon /> });
createRoute("/about", "About", { icon: <InfoOutlineSVGIcon /> });
createRoute("/guides", "Guides", {
  icon: <DescriptionSVGIcon />,
  childRoutes: [
    { path: "/[id]", as: "/installation", children: "Installation" },
    { path: "/[id]", as: "/scoped-packages", children: "Scoped Packages" },
    {
      path: "/[id]",
      as: "/creating-a-new-app",
      children: "Creating a New App",
    },
    {
      path: "/[id]",
      as: "/configuring-your-layout",
      children: "Configuring Your Layout",
    },
    {
      path: "/[id]",
      as: "/customizing-your-theme",
      children: "Customizing Your Theme",
    },
    {
      path: "/[id]",
      as: "/including-styles-without-webpack",
      children: "Including Styles without Webpack",
    },
    {
      path: "/[id]",
      as: "/using-the-sass-exports",
      children: "Using the Sass Exports",
    },
    {
      path: "/[id]",
      as: "/advanced-installation",
      children: "Advanced Installation",
    },
    { path: "/[id]", as: "/working-with-v1", children: "Working with v1" },
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
