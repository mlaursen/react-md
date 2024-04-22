"use client";
import { LinkUnstyled } from "@/components/LinkUnstyled.jsx";
import { pascalCase } from "@/utils/strings.js";
import { useLayoutTree } from "@react-md/core/layout/useLayoutTree";
import { Tree } from "@react-md/core/tree/Tree";
import { type TreeData } from "@react-md/core/tree/types";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import { cnb } from "cnbuilder";
import { usePathname } from "next/navigation.js";
import { useMemo, type ReactElement } from "react";
import { LAYOUT_TYPES, type LayoutType } from "./layouts.js";
import { NAVIGATION_TYPES } from "./navTypes.js";
import { useNavType } from "./useNavType.js";
import ExitToAppIcon from "@react-md/material-icons/ExitToAppIcon";
import { LayoutIcon } from "./LayoutIcon.jsx";
import { NavigationTypeIcon } from "./NavigationTypeIcon.jsx";

export interface ExampleTreeNavigationProps {
  layout: LayoutType;
}

export function ExampleTreeNavigation(
  props: ExampleTreeNavigationProps
): ReactElement {
  const { layout } = props;

  const navType = useNavType();
  const pathname = usePathname();

  const navItems = useMemo<TreeData>(() => {
    const homeHref = `/layout-example/${layout}`;
    const page1Href = `${homeHref}/page-1`;
    const page2Href = `${homeHref}/page-2`;
    const layouts: TreeData = {};
    const navigators: TreeData = {};
    LAYOUT_TYPES.forEach((layoutType) => {
      const itemId = `layouts/${layoutType}`;
      layouts[itemId] = {
        itemId,
        href: `/layout-example/${layoutType}?navType=${navType}`,
        parentId: "layouts",
        children: pascalCase(layoutType, " "),
        leftAddon: <LayoutIcon layout={layoutType} />,
        contentClassName: cnb(
          layout === layoutType && "rmd-tree-item__content--selected"
        ),
      };
    });
    NAVIGATION_TYPES.forEach((type) => {
      const itemId = `navigations/${type}`;
      navigators[itemId] = {
        itemId,
        href: `${homeHref}?navType=${type}`,
        parentId: "navigators",
        children: pascalCase(type, " "),
        leftAddon: <NavigationTypeIcon navType={type} />,
        contentClassName: cnb(
          type === navType && "rmd-tree-item__content--selected"
        ),
      };
    });
    return {
      pages: {
        itemId: "pages",
        parentId: null,
        children: "Pages",
      },
      [homeHref]: {
        itemId: homeHref,
        parentId: "pages",
        href: `${homeHref}?navType=${navType}`,
        children: "Home",
        leftAddon: <HomeIcon />,
      },
      [page1Href]: {
        itemId: page1Href,
        parentId: "pages",
        href: `${page1Href}?navType=${navType}`,
        children: "Page 1",
        leftAddon: <StarIcon />,
      },
      [page2Href]: {
        itemId: page2Href,
        parentId: "pages",
        href: `${page2Href}?navType=${navType}`,
        children: "Page 2",
        leftAddon: <FavoriteIcon />,
      },
      layouts: {
        itemId: "layouts",
        parentId: null,
        children: "Layout Types",
      },
      ...layouts,
      navigators: {
        itemId: "navigators",
        parentId: null,
        children: "Navigation Types",
      },
      ...navigators,
      exit: {
        itemId: "exit",
        parentId: null,
        href: `/getting-started/layout#${layout}-navigation-layout`,
        children: "Back to layout docs",
        leftAddon: <ExitToAppIcon />,
      },
    } satisfies TreeData;
  }, [layout, navType]);

  const tree = useLayoutTree({
    navItems,
    pathname,
    defaultExpandedIds: ["layouts", "pages", "navigators"],
  });

  return (
    <Tree aria-label="Navigation" {...tree} linkComponent={LinkUnstyled} />
  );
}
