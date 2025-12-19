"use client";

import { Divider } from "@react-md/core/divider/Divider";
import { List } from "@react-md/core/list/List";
import { ListSubheader } from "@react-md/core/list/ListSubheader";
import ExitToAppIcon from "@react-md/material-icons/ExitToAppIcon";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import { usePathname } from "next/navigation.js";
import { type ReactElement } from "react";

import { pascalCase } from "@/utils/strings.js";

import styles from "./ExampleListNavigation.module.scss";
import { LayoutIcon } from "./LayoutIcon.js";
import { NavigationTypeIcon } from "./NavigationTypeIcon.js";
import { SimpleNavItem } from "./SimpleNavItem.js";
import { LAYOUT_TYPES, type LayoutType } from "./layouts.js";
import { NAVIGATION_TYPES } from "./navTypes.js";

const navTypeParam = `?navType=list`;

export interface ExampleListNavigationProps {
  layout: LayoutType;
}

export function ExampleListNavigation(
  props: ExampleListNavigationProps
): ReactElement {
  const { layout } = props;

  const pathname = usePathname();

  return (
    <List className={styles.container}>
      <SimpleNavItem
        href={`/layout-example/${layout}${navTypeParam}`}
        leftAddon={<HomeIcon />}
      >
        Home
      </SimpleNavItem>
      <SimpleNavItem
        href={`/layout-example/${layout}/page-1${navTypeParam}`}
        leftAddon={<StarIcon />}
      >
        Page 1
      </SimpleNavItem>
      <SimpleNavItem
        href={`/layout-example/${layout}/page-2${navTypeParam}`}
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
          href={`/layout-example/${layoutType}${navTypeParam}`}
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
          active={navType === "list"}
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
