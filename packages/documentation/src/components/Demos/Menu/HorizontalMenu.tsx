import React, { FC } from "react";
import { DropdownMenu, MenuItem } from "@react-md/menu";
import {
  ContentCopySVGIcon,
  ContentCutSVGIcon,
  ContentPasteSVGIcon,
} from "@react-md/material-icons";

const HorizontalMenu: FC = () => (
  <DropdownMenu
    id="horizontal-menu-example"
    items={[
      <MenuItem leftIcon={<ContentCopySVGIcon />}>Copy</MenuItem>,
      <MenuItem leftIcon={<ContentCutSVGIcon />}>Cut</MenuItem>,
      <MenuItem leftIcon={<ContentPasteSVGIcon />}>Paste</MenuItem>,
    ]}
    horizontal
  >
    Dropdown
  </DropdownMenu>
);

export default HorizontalMenu;
