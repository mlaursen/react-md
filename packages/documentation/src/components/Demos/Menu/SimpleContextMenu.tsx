import type { ReactElement } from "react";
import { TextArea } from "@react-md/form";
import {
  ContentCopySVGIcon,
  ContentCutSVGIcon,
  ContentPasteSVGIcon,
} from "@react-md/material-icons";
import { Menu, MenuItem, useContextMenu } from "@react-md/menu";

export default function SimpleContextMenu(): ReactElement {
  // Note: You can also provide options to this hook like a custom `baseId` or
  // `menuLabel`.
  const { menuRef, menuProps, onContextMenu } = useContextMenu();
  return (
    <>
      <TextArea
        id="simple-context-menu-area"
        onContextMenu={onContextMenu}
        placeholder="Right click me!"
      />
      <Menu {...menuProps} ref={menuRef}>
        <MenuItem leftAddon={<ContentCutSVGIcon />}>Cut</MenuItem>
        <MenuItem leftAddon={<ContentCopySVGIcon />}>Copy</MenuItem>
        <MenuItem leftAddon={<ContentPasteSVGIcon />}>Paste</MenuItem>
      </Menu>
    </>
  );
}
