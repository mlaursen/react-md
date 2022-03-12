import type { ReactElement, ReactNode } from "react";
import { AppBar, useActionClassName } from "@react-md/app-bar";
import { TextIconSpacing } from "@react-md/icon";
import {
  AppsSVGIcon,
  SaveSVGIcon,
  SchoolSVGIcon,
  SdCardSVGIcon,
  ShoppingBasketSVGIcon,
  ShopSVGIcon,
  ShowChartSVGIcon,
  SpaSVGIcon,
  StorageSVGIcon,
  SubwaySVGIcon,
} from "@react-md/material-icons";
import { DropdownMenu, MenuItem, MenuItemSeparator } from "@react-md/menu";

import styles from "./DropdownMenuGrid.module.scss";

interface GridItemProps {
  icon: ReactNode;
  children: ReactNode;
}

function GridMenuItem({ children, icon }: GridItemProps): ReactElement {
  return (
    <MenuItem className={styles.item} textChildren={false}>
      <TextIconSpacing stacked icon={icon}>
        {children}
      </TextIconSpacing>
    </MenuItem>
  );
}

export default function DropdownMenuGrid(): ReactElement {
  return (
    <AppBar>
      <DropdownMenu
        id="grid-like-menu"
        aria-label="Apps"
        buttonType="icon"
        buttonChildren={<AppsSVGIcon />}
        renderAsSheet="phone"
        listClassName={styles.grid}
        className={useActionClassName({ first: true, last: true })}
      >
        <GridMenuItem icon={<ShopSVGIcon />}>App One</GridMenuItem>
        <GridMenuItem icon={<ShowChartSVGIcon />}>App Two</GridMenuItem>
        <GridMenuItem icon={<ShoppingBasketSVGIcon />}>App Three</GridMenuItem>
        <GridMenuItem icon={<SpaSVGIcon />}>App Four</GridMenuItem>
        <GridMenuItem icon={<SchoolSVGIcon />}>App Five</GridMenuItem>
        <GridMenuItem icon={<SaveSVGIcon />}>App Six</GridMenuItem>
        <GridMenuItem icon={<SdCardSVGIcon />}>App Seven</GridMenuItem>
        <GridMenuItem icon={<SubwaySVGIcon />}>App Eight</GridMenuItem>
        <GridMenuItem icon={<StorageSVGIcon />}>App Nine</GridMenuItem>
        <MenuItemSeparator className={styles.separator} />
        <MenuItem className={styles.all}>View All</MenuItem>
      </DropdownMenu>
    </AppBar>
  );
}
