import React from "react";
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
import createIdGenerator from "utils/createIdGenerator";
import { toTitle } from "utils/toTitle";

import { PACKAGE_NAMES, SCSS_PACKAGES, TYPESCRIPT_PACKAGES } from "./packages";
import {
  RouteNavItem,
  NavItem,
  DividerNavItem,
  SubheaderNavItem,
} from "./meta/types";

const uuid = createIdGenerator("nav");

const getPackageRoutes = (name: string): RouteNavItem[] => {
  const routes: RouteNavItem[] = [];

  routes.push({
    href: "/demos",
    children: "Demos",
  });

  routes.push({
    href: "/installation",
    children: "Installation",
  });

  if (TYPESCRIPT_PACKAGES.includes(name)) {
    routes.push({
      href: "/api",
      children: "API",
    });
  }

  if (SCSS_PACKAGES.includes(name)) {
    routes.push({
      href: "/sassdoc",
      children: "SassDoc",
    });
  }

  routes.push({
    href: "/changelog",
    children: "Changelog",
  });

  return routes;
};

const routes: NavItem[] = [
  {
    href: "/",
    children: "Home",
    leftAddon: <HomeSVGIcon />,
  },
  {
    href: "/guides",
    children: "Guides",
    leftAddon: <DescriptionSVGIcon />,
    routes: [
      {
        href: "/installation",
        children: "Installation",
      },
      {
        href: "/scoped-packages",
        children: "Scoped Packages",
      },
      {
        href: "/creating-a-new-app",
        children: "Creating a New App",
      },
      {
        href: "/configuring-your-layout",
        children: "Configuring Your Layout",
      },
      {
        href: "/customizing-your-theme",
        children: "Customizing Your Theme",
      },
      {
        href: "/including-styles-without-webpack",
        children: "Including Styles without Webpack",
      },
      {
        href: "/using-the-sass-exports",
        children: "Using the Sass Exports",
      },
      {
        href: "/advanced-installation",
        children: "Advanced Installation",
      },
      {
        href: "/working-with-v1",
        children: "Working with v1",
      },
      {
        href: "/contributing",
        children: "Contributing",
      },
    ],
  },
  {
    href: "/colors-and-theming",
    children: "Colors and Theming",
    leftAddon: <ColorLensSVGIcon />,
    routes: [
      {
        href: "/color-palette",
        children: "Color Palette",
      },
      {
        href: "/theme-builder",
        children: "Theme Builder",
      },
      {
        href: "/overriding-defaults",
        children: "Overriding Defaults",
      },
      {
        href: "/creating-dynamic-themes",
        children: "Creating Dynamic Themes",
      },
    ],
  },
  {
    href: "/packages",
    children: "Packages",
    leftAddon: <BuildSVGIcon />,
    routes: PACKAGE_NAMES.map((name) => ({
      href: `/${name}`,
      children: toTitle(name),
      routes: getPackageRoutes(name),
    })),
  },
  {
    href: "/about",
    children: "About",
    leftAddon: <InfoOutlineSVGIcon />,
  },
  { divider: true },
  { subheader: true, children: "References" },
  {
    href: "https://reactjs.org",
    children: "React",
    leftAddon: <ReactSVGIcon />,
  },
  {
    href: "https://material.io/design",
    children: "Material Design",
    leftAddon: <MaterialDesignSVGIcon />,
  },
];

const isDivider = (navItem: NavItem): navItem is DividerNavItem =>
  (navItem as DividerNavItem).divider === true;

const isSubheader = (navItem: NavItem): navItem is SubheaderNavItem =>
  (navItem as SubheaderNavItem).subheader === true;

function createNavItem(
  tree: LayoutNavigationTree,
  navItem: NavItem,
  parentHref?: string
): LayoutNavigationTree {
  if (isDivider(navItem)) {
    const itemId = uuid();
    tree[itemId] = {
      itemId,
      parentId: navItem.parentId || parentHref || null,
      divider: true,
      isCustom: true,
    };

    return tree;
  }

  if (isSubheader(navItem)) {
    const itemId = uuid();
    tree[itemId] = {
      itemId,
      parentId: navItem.parentId || parentHref || null,
      children: navItem.children,
      subheader: true,
      isCustom: true,
    };

    return tree;
  }

  if (!navItem.href.startsWith("/")) {
    const itemId = navItem.href;
    tree[itemId] = {
      ...navItem,
      itemId,
      parentId: parentHref || null,
    };

    return tree;
  }

  const { href: currentItemId, routes = [], ...item } = navItem;
  const itemId = `${parentHref || ""}${currentItemId}`;
  const lastSlashIndex = itemId.lastIndexOf("/");

  let as: string | undefined;
  let href: string | undefined = itemId;
  let parentId: string | null = null;
  if (lastSlashIndex > 0) {
    parentId = itemId.slice(0, lastSlashIndex);
  }

  // don't want to render as a link when there are child routes
  if (routes.length) {
    as = undefined;
    href = undefined;
  } else if (parentId && parentId.startsWith("/guides")) {
    as = itemId;
    href = `${parentId}/[id]`;
  } else if (
    parentHref &&
    itemId.startsWith("/packages") &&
    !itemId.endsWith("/demos")
  ) {
    // section _should_ be api|demo|sassdoc|installation
    const [, , section] = itemId.substring(1).split("/");
    as = href;
    href = `/packages/[id]${section ? `/${section}` : ""}`;
  }

  tree[itemId] = {
    ...item,
    as,
    href,
    itemId,
    parentId,
  };

  routes.forEach((childRoute) => {
    createNavItem(tree, childRoute, itemId);
  });

  return tree;
}

export default routes.reduce<LayoutNavigationTree>(
  (tree, route) => createNavItem(tree, route),
  {}
);
