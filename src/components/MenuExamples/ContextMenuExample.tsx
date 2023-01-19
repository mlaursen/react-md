import { Menu, MenuItem, useContextMenu } from "@react-md/core";
import { TextArea } from "@react-md/form";
import ContentCopyIcon from "@react-md/material-icons/ContentCopyIcon";
import ContentCutIcon from "@react-md/material-icons/ContentCutIcon";
import ContentPasteIcon from "@react-md/material-icons/ContentPasteIcon";
import type { ReactElement } from "react";

export function ContextMenuExample(): ReactElement {
  const { menuProps, onContextMenu } = useContextMenu();
  return (
    <>
      <TextArea
        id="simple-context-menu-area"
        onContextMenu={onContextMenu}
        placeholder="Right click me!"
      />
      <Menu {...menuProps}>
        <MenuItem leftAddon={<ContentCutIcon />}>Cut</MenuItem>
        <MenuItem leftAddon={<ContentCopyIcon />}>Copy</MenuItem>
        <MenuItem leftAddon={<ContentPasteIcon />}>Paste</MenuItem>
      </Menu>
    </>
  );
}
