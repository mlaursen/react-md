import type {
  LayoutNavigationItem,
  LayoutNavigationTree,
} from "@react-md/layout";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import type { ReactNode } from "react";

const createRoute = (
  pathname: string,
  children: ReactNode,
  leftAddon: ReactNode | undefined = undefined,
  parentId: string | null = null
): LayoutNavigationItem => ({
  itemId: pathname,
  parentId,
  href: pathname,
  children,
  leftAddon,
});

const routes = [
  createRoute("/", "Home", <HomeIcon />),
  createRoute("/app-bar", "App Bar"),
  createRoute("/avatar", "Avatar"),
  createRoute("/box", "Box"),
  createRoute("/button", "Button"),
  createRoute("/box-shadow", "Box Shadow"),
  createRoute("/dialog", "Dialog"),
  createRoute("/divider", "Divider"),
  createRoute("/link", "Link"),
  createRoute("/list", "List"),
  createRoute("/list", "List"),
  createRoute("/material-icons", "Material Icons"),
  createRoute("/progress", "Progress"),
  createRoute("/transition", "Transition"),
  createRoute("/tree", "Tree"),
  createRoute("/typography", "Typography"),
  { divider: true, itemId: "divider-1", parentId: null },
  createRoute("/coverage/lcov-report/index.html", "Test Coverage"),
  createRoute("/docs/index.html", "Typedoc"),
  { divider: true, itemId: "divider-2", parentId: null },
  {
    subheader: true,
    itemId: "subheader-1",
    parentId: null,
    children: "References",
  },
];

export const navItems = routes.reduce<LayoutNavigationTree>((tree, route) => {
  tree[route.itemId] = route;

  return tree;
}, {});
