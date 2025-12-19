"use client";

import { useLayoutTree } from "@react-md/core/layout/useLayoutTree";
import { Tree } from "@react-md/core/tree/Tree";
import { type TreeData } from "@react-md/core/tree/types";
import ExitToAppIcon from "@react-md/material-icons/ExitToAppIcon";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import { cnb } from "cnbuilder";
import { usePathname } from "next/navigation.js";
import { type ReactElement, useMemo } from "react";

import { LinkUnstyled } from "@/components/LinkUnstyled.js";
import { pascalCase } from "@/utils/strings.js";

import { LayoutIcon } from "./LayoutIcon.js";
import { NavigationTypeIcon } from "./NavigationTypeIcon.js";
import { LAYOUT_TYPES, type LayoutType } from "./layouts.js";
import { NAVIGATION_TYPES } from "./navTypes.js";

const navTypeParam = `?navType=tree`;

export interface ExampleTreeNavigationProps {
  layout: LayoutType;
}

export function ExampleTreeNavigation(
  props: ExampleTreeNavigationProps
): ReactElement {
  const { layout } = props;

  const pathname = usePathname();

  const navItems = useMemo<TreeData>(() => {
    const homeHref = `/layout-example/${layout}`;
    const page1Href = `${homeHref}/page-1`;
    const page2Href = `${homeHref}/page-2`;
    const layouts: TreeData = {};
    const navigators: TreeData = {};
    for (const layoutType of LAYOUT_TYPES) {
      const itemId = `layouts/${layoutType}`;
      layouts[itemId] = {
        itemId,
        href: `/layout-example/${layoutType}${navTypeParam}`,
        parentId: "layouts",
        children: pascalCase(layoutType, " "),
        leftAddon: <LayoutIcon layout={layoutType} />,
        contentClassName: cnb(
          layout === layoutType && "rmd-tree-item__content--selected"
        ),
      };
    }
    for (const type of NAVIGATION_TYPES) {
      const itemId = `navigations/${type}`;
      navigators[itemId] = {
        itemId,
        href: `${homeHref}?navType=${type}`,
        parentId: "navigators",
        children: pascalCase(type, " "),
        leftAddon: <NavigationTypeIcon navType={type} />,
        contentClassName: cnb(
          type === "tree" && "rmd-tree-item__content--selected"
        ),
      };
    }
    return {
      pages: {
        itemId: "pages",
        parentId: null,
        children: "Pages",
      },
      [homeHref]: {
        itemId: homeHref,
        parentId: "pages",
        href: `${homeHref}${navTypeParam}`,
        children: "Home",
        leftAddon: <HomeIcon />,
      },
      [page1Href]: {
        itemId: page1Href,
        parentId: "pages",
        href: `${page1Href}${navTypeParam}`,
        children: "Page 1",
        leftAddon: <StarIcon />,
      },
      [page2Href]: {
        itemId: page2Href,
        parentId: "pages",
        href: `${page2Href}${navTypeParam}`,
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
  }, [layout]);

  const tree = useLayoutTree({
    navItems,
    pathname,
    defaultExpandedIds: ["layouts", "pages", "navigators"],
  });

  return (
    <Tree aria-label="Navigation" {...tree} linkComponent={LinkUnstyled} />
  );
}
