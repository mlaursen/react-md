import type {
  LayoutNavigationItem,
  LayoutNavigationTree,
} from "@react-md/layout";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import type { ReactNode } from "react";
import MaterialDesignIcon from "../MaterialDesignIcon";
import ReactIcon from "../ReactIcon";

interface RouteOptions {
  name: ReactNode;
  href?: string | null;
  pathname: string;
  parentId?: string | null;
  leftAddon?: ReactNode;

  routes?: RouteOptions[];
}

function createRoute(
  options: Omit<RouteOptions, "routes">
): LayoutNavigationItem {
  const {
    name,
    pathname,
    href = pathname,
    leftAddon,
    parentId = null,
  } = options;

  return {
    href: !href ? undefined : href,
    itemId: pathname,
    parentId,
    children: name,
    leftAddon,
  };
}

function createRoutes(options: RouteOptions): readonly LayoutNavigationItem[] {
  const { name, pathname, leftAddon, parentId = null, routes = [] } = options;
  return [
    createRoute({
      name,
      href: routes.length ? null : pathname,
      pathname,
      leftAddon,
      parentId,
    }),
    ...routes.flatMap((route) =>
      createRoutes({
        parentId: pathname,
        ...route,
        pathname: `${pathname}${route.pathname}`,
      })
    ),
  ];
}

const routes: readonly LayoutNavigationItem[] = [
  createRoute({
    name: "Home",
    pathname: "/",
    leftAddon: <HomeIcon />,
  }),
  ...createRoutes({
    name: "Form",
    pathname: "/form",
    routes: [
      { name: "TextField", pathname: "/textfield" },
      { name: "Password", pathname: "/password" },
      { name: "TextArea", pathname: "/textarea" },
      { name: "Select", pathname: "/select" },
      { name: "FileInput", pathname: "/fileinput" },
      { name: "Checkbox", pathname: "/checkbox" },
      { name: "Radio", pathname: "/radio" },
      { name: "Switch", pathname: "/switch" },
    ],
  }),
  createRoute({ name: "Box", pathname: "/box" }),
  createRoute({ name: "Typography", pathname: "/typography" }),
  createRoute({ name: "Button", pathname: "/button" }),
  createRoute({ name: "Chip", pathname: "/chip" }),
  createRoute({ name: "Material Icons", pathname: "/material-icons" }),

  createRoute({ name: "Menu", pathname: "/menu" }),

  createRoute({ name: "List", pathname: "/list" }),
  createRoute({ name: "App Bar", pathname: "/app-bar" }),
  createRoute({ name: "Card", pathname: "/card" }),
  createRoute({ name: "Dialog", pathname: "/dialog" }),
  createRoute({ name: "Link", pathname: "/link" }),
  createRoute({ name: "Avatar", pathname: "/avatar" }),
  createRoute({ name: "Progress", pathname: "/progress" }),

  createRoute({ name: "Box Shadow", pathname: "/box-shadow" }),
  createRoute({ name: "Divider", pathname: "/divider" }),

  ...createRoutes({
    name: "Transition",
    pathname: "/transition",
    routes: [
      { name: "Collapse", pathname: "/collapse" },
      {
        name: "Skeleton Placeholder",
        pathname: "/skeleton-placeholder",
      },
      { name: "Carousel", pathname: "/carousel" },
      { name: "Scale", pathname: "/scale" },
      { name: "Cross Fade", pathname: "/cross-fade" },
      { name: "Slide", pathname: "/slide" },
      { name: "useCSSTransition", pathname: "/use-css-transition" },
      { name: "useTransition", pathname: "/use-transition" },
    ],
  }),

  createRoute({ name: "Table", pathname: "/table" }),
  createRoute({ name: "Tabs", pathname: "/tabs" }),
  createRoute({ name: "Tooltip", pathname: "/tooltip" }),
  createRoute({ name: "Tree", pathname: "/tree" }),
  createRoute({ name: "Visual Media", pathname: "/visual-media" }),

  ...createRoutes({
    name: "Utils",
    pathname: "/utils",
    routes: [
      { name: "bem", pathname: "/bem" },
      { name: "alphaNumericSort", pathname: "/alpha-numeric-sort" },
      { name: "useAppSize", pathname: "/use-app-size" },
      { name: "useToggle", pathname: "/use-toggle" },
      { name: "useFixedPositioning", pathname: "/use-fixed-positioning" },
      { name: "useLocalStorage", pathname: "/use-local-storage" },
      { name: "useHtmlClassName", pathname: "/use-html-class-name" },
      {
        name: "useIntersectionObserver",
        pathname: "/use-intersection-observer",
      },
      { name: "useResizeObserver", pathname: "/use-resize-observer" },
      { name: "useMediaQuery", pathname: "/use-media-query" },
      { name: "useFocusContainer", pathname: "/use-focus-container" },
      { name: "useHoverMode", pathname: "/use-hover-mode" },
      { name: "useCSSVariables", pathname: "/use-css-variables" },
      { name: "loop", pathname: "/loop" },
      { name: "randomInt", pathname: "/random-int" },
      { name: "getScrollbarWidth", pathname: "/get-scrollbar-width" },
    ],
  }),

  { divider: true, itemId: "divider-1", parentId: null },
  createRoute({
    name: "Test Coverage",
    pathname: "/coverage/lcov-report/index.html",
  }),
  createRoute({ name: "Typedoc", pathname: "/docs/index.html" }),
  { divider: true, itemId: "divider-2", parentId: null },
  {
    subheader: true,
    itemId: "subheader-1",
    parentId: null,
    children: "References",
  },
  createRoute({
    name: "React",
    pathname: "https://reactjs.org",
    leftAddon: <ReactIcon />,
  }),
  createRoute({
    name: "Material Design",
    pathname: "https://material.io/design",
    leftAddon: <MaterialDesignIcon />,
  }),
];

export const navItems = routes.reduce<LayoutNavigationTree>((tree, route) => {
  tree[route.itemId] = route;

  return tree;
}, {});
