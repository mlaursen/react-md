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
      <MenuItem leftAddon={<ContentCopySVGIcon />}>Copy</MenuItem>,
      <MenuItem leftAddon={<ContentCutSVGIcon />}>Cut</MenuItem>,
      <MenuItem leftAddon={<ContentPasteSVGIcon />}>Paste</MenuItem>,
    ]}
    horizontal
  >
    Dropdown
  </DropdownMenu>
);

export default HorizontalMenu;
