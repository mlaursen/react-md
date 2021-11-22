// keys aren't required for the dropdown menu items
/* eslint-disable react/jsx-key */
import { ReactElement } from "react";
import { DropdownMenu, MenuItem } from "@react-md/menu";
import {
  ContentCopySVGIcon,
  ContentCutSVGIcon,
  ContentPasteSVGIcon,
} from "@react-md/material-icons";

export default function HorizontalMenu(): ReactElement {
  return (
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
}
