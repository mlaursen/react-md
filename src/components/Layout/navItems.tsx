import type {
  LayoutNavigationItem,
  LayoutNavigationTree,
} from "@react-md/layout";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import type { ReactNode } from "react";
import MaterialDesignIcon from "../MaterialDesignIcon";
import ReactIcon from "../ReactIcon";

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

const routes: readonly LayoutNavigationItem[] = [
  createRoute("/", "Home", <HomeIcon />),
  {
    itemId: "form",
    parentId: null,
    children: "Form",
  },
  createRoute("/textfield", "TextField", null, "form"),
  createRoute("/password", "Password", null, "form"),
  createRoute("/textarea", "TextArea", null, "form"),
  createRoute("/select", "Select", null, "form"),
  createRoute("/checkbox", "Checkbox", null, "form"),
  createRoute("/radio", "Radio", null, "form"),
  createRoute("/switch", "Switch", null, "form"),
  createRoute("/fileinput", "FileInput", null, "form"),
  createRoute("/app-bar", "App Bar"),
  createRoute("/avatar", "Avatar"),
  createRoute("/box", "Box"),
  createRoute("/button", "Button"),
  createRoute("/box-shadow", "Box Shadow"),
  createRoute("/card", "Card"),
  createRoute("/dialog", "Dialog"),
  createRoute("/divider", "Divider"),
  createRoute("/link", "Link"),
  createRoute("/list", "List"),
  createRoute("/list", "List"),
  createRoute("/material-icons", "Material Icons"),
  createRoute("/menu", "Menu"),
  createRoute("/progress", "Progress"),
  createRoute("/transition", "Transition"),
  createRoute("/table", "Table"),
  createRoute("/tabs", "Tabs"),
  createRoute("/tree", "Tree"),
  createRoute("/typography", "Typography"),
  createRoute("/visual-media", "Visual Media"),
  {
    itemId: "hooks",
    parentId: null,
    children: "Hooks",
  },
  createRoute(
    "/use-intersection-observer",
    "useIntersectionObserver",
    null,
    "hooks"
  ),
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
  createRoute("https://reactjs.org", "React", <ReactIcon />),
  createRoute(
    "https://material.io/design",
    "Material Design",
    <MaterialDesignIcon />
  ),
];

export const navItems = routes.reduce<LayoutNavigationTree>((tree, route) => {
  tree[route.itemId] = route;

  return tree;
}, {});
