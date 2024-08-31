"use client";
import { LinkUnstyled } from "@/components/LinkUnstyled.jsx";
import { pascalCase } from "@/utils/strings.js";
import { Navigation } from "@react-md/core/navigation/Navigation";
import { type NavigationItem } from "@react-md/core/navigation/types";
import { useNavigationExpansion } from "@react-md/core/navigation/useNavigationExpansion";
import ExitToAppIcon from "@react-md/material-icons/ExitToAppIcon";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import { usePathname } from "next/navigation.js";
import { useMemo, type ReactElement } from "react";
import { LayoutIcon } from "./LayoutIcon.jsx";
import { NavigationTypeIcon } from "./NavigationTypeIcon.jsx";
import { LAYOUT_TYPES, type LayoutType } from "./layouts.js";
import { NAVIGATION_TYPES } from "./navTypes.js";

const navTypeParam = "?navType=core";

export interface ExampleCoreNavigationProps {
  layout: LayoutType;
}

export function ExampleCoreNavigation(
  props: ExampleCoreNavigationProps
): ReactElement {
  const { layout } = props;

  const pathname = usePathname();
  const items = useMemo<readonly NavigationItem[]>(
    () => [
      {
        type: "route",
        href: `/layout-example/${layout}${navTypeParam}`,
        children: "Home",
        beforeAddon: <HomeIcon />,
      },
      {
        type: "route",
        href: `/layout-example/${layout}/page-1${navTypeParam}`,
        children: "Page 1",
        beforeAddon: <StarIcon />,
      },
      {
        type: "route",
        href: `/layout-example/${layout}/page-2${navTypeParam}`,
        children: "Page 2",
        beforeAddon: <FavoriteIcon />,
      },
      {
        type: "divider",
      },
      {
        type: "route",
        href: "",
        children: "Layout Types",
        items: LAYOUT_TYPES.map((layoutType) => ({
          type: "route",
          href: `/layout-example/${layoutType}${navTypeParam}`,
          active: layout === layoutType,
          children: pascalCase(layoutType, " "),
          beforeAddon: <LayoutIcon layout={layoutType} />,
        })),
      },
      {
        type: "divider",
      },
      {
        type: "route",
        href: "",
        children: "Navigation Types",
        items: NAVIGATION_TYPES.map((navType) => ({
          type: "route",
          href: `${pathname}?navType=${navType}`,
          active: navType === "core",
          children: pascalCase(navType, " "),
          beforeAddon: <NavigationTypeIcon navType={navType} />,
        })),
      },
      {
        type: "divider",
      },
      {
        type: "route",
        href: `/getting-started/layout#${layout}-navigation-layout`,
        children: "Back to layout docs",
        beforeAddon: <ExitToAppIcon />,
      },
    ],
    [layout, pathname]
  );
  const { data } = useNavigationExpansion({
    pathname: `${pathname}${navTypeParam}`,
    linkComponent: LinkUnstyled,
  });

  return <Navigation items={items} data={data} />;
}
