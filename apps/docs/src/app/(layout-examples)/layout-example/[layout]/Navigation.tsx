import { pascalCase } from "@/utils/strings.js";
import { cssUtils } from "@react-md/core/cssUtils";
import { Divider } from "@react-md/core/divider/Divider";
import { List } from "@react-md/core/list/List";
import { ListSubheader } from "@react-md/core/list/ListSubheader";
import HomeIcon from "@react-md/material-icons/HomeIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import ExitToAppIcon from "node_modules/@react-md/material-icons/src/ExitToAppIcon.jsx";
import FavoriteIcon from "node_modules/@react-md/material-icons/src/FavoriteIcon.jsx";
import { type ReactElement } from "react";
import { LayoutIcon } from "./LayoutIcon.jsx";
import { SimpleNavItem } from "./SimpleNavItem.jsx";
import { LAYOUT_TYPES, type LayoutType } from "./layouts.js";

export interface NavigationProps {
  layout: LayoutType;
}

export function Navigation(props: NavigationProps): ReactElement {
  const { layout } = props;

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
      <SimpleNavItem
        href={`/getting-started/layout#${layout}-navigation-layout`}
        leftAddon={<ExitToAppIcon />}
      >
        Back to layout docs
      </SimpleNavItem>
    </List>
  );
}
