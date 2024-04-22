"use client";
import { pascalCase } from "@/utils/strings.js";
import { cssUtils } from "@react-md/core/cssUtils";
import { Divider } from "@react-md/core/divider/Divider";
import { List } from "@react-md/core/list/List";
import { ListSubheader } from "@react-md/core/list/ListSubheader";
import ExitToAppIcon from "@react-md/material-icons/ExitToAppIcon";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import { usePathname } from "next/navigation.js";
import { type ReactElement } from "react";
import { LayoutIcon } from "./LayoutIcon.js";
import { NavigationTypeIcon } from "./NavigationTypeIcon.jsx";
import { SimpleNavItem } from "./SimpleNavItem.js";
import { LAYOUT_TYPES, type LayoutType } from "./layouts.js";
import { NAVIGATION_TYPES } from "./navTypes.js";
import { useNavType } from "./useNavType.js";

export interface ExampleListNavigationProps {
  layout: LayoutType;
}

export function ExampleListNavigation(
  props: ExampleListNavigationProps
): ReactElement {
  const { layout } = props;
  const pathname = usePathname();
  const currentNavType = useNavType();

  return (
    <List className={cssUtils({ textOverflow: "ellipsis" })}>
      <SimpleNavItem
        href={`/layout-example/${layout}`}
        leftAddon={<HomeIcon />}
      >
        Home
      </SimpleNavItem>
      <SimpleNavItem
        href={`/layout-example/${layout}/page-1`}
        leftAddon={<StarIcon />}
      >
        Page 1
      </SimpleNavItem>
      <SimpleNavItem
        href={`/layout-example/${layout}/page-2`}
        leftAddon={<FavoriteIcon />}
      >
        Page 2
      </SimpleNavItem>
      <Divider />
      <ListSubheader>Layout Types</ListSubheader>
      {LAYOUT_TYPES.map((layoutType) => (
        <SimpleNavItem
          key={layoutType}
          active={layout === layoutType}
          href={`/layout-example/${layoutType}`}
          leftAddon={<LayoutIcon layout={layoutType} />}
        >
          {pascalCase(layoutType, " ")}
        </SimpleNavItem>
      ))}
      <Divider />
      <ListSubheader>Navigation Types</ListSubheader>
      {NAVIGATION_TYPES.map((navType) => (
        <SimpleNavItem
          key={navType}
          href={`${pathname}?navType=${navType}`}
          active={navType === currentNavType}
          leftAddon={<NavigationTypeIcon navType={navType} />}
        >
          {pascalCase(navType, " ")}
        </SimpleNavItem>
      ))}
      <Divider />
      <SimpleNavItem
        href={`/getting-started/layout#${layout}-navigation-layout`}
        leftAddon={<ExitToAppIcon />}
      >
        Back to layout docs
      </SimpleNavItem>
    </List>
  );
}
