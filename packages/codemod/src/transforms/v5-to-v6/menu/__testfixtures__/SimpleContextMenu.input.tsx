import ContentCopyIcon from "@react-md/material-icons/ContentCopyIcon";
import ContentCutIcon from "@react-md/material-icons/ContentCutIcon";
import ContentPasteIcon from "@react-md/material-icons/ContentPasteIcon";
import type { ReactElement } from "react";
import { Menu, MenuItem, TextArea, useContextMenu } from "react-md";

export default function SimpleContextMenu(): ReactElement {
  const { menuRef, menuProps, onContextMenu } = useContextMenu();
  return (
    <>
      <TextArea
        id="simple-context-menu-area"
        onContextMenu={onContextMenu}
        placeholder="Right click me!"
      />
      <Menu {...menuProps} ref={menuRef}>
        <MenuItem leftAddon={<ContentCutIcon />}>Cut</MenuItem>
        <MenuItem leftAddon={<ContentCopyIcon />}>Copy</MenuItem>
        <MenuItem leftAddon={<ContentPasteIcon />}>Paste</MenuItem>
      </Menu>
    </>
  );
}

