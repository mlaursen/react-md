"use client";
import {
  // BELOW_INNER_LEFT_ANCHOR,
  Menu,
  MenuItem,
  TextArea,
  useContextMenu,
} from "@react-md/core";
import ContentCopyOutlinedIcon from "@react-md/material-icons/ContentCopyOutlinedIcon";
import ContentCutOutlinedIcon from "@react-md/material-icons/ContentCutOutlinedIcon";
import ContentPasteOutlinedIcon from "@react-md/material-icons/ContentPasteOutlinedIcon";
import { type ReactElement } from "react";

export default function ContextMenuExample(): ReactElement {
  const { menuProps, onContextMenu } = useContextMenu();
  // const { menuProps, onContextMenu } = useContextMenu({
  //   // these are the default values
  //   anchor: BELOW_INNER_LEFT_ANCHOR,
  //   menuLabel: "Context Menu",
  //   preventScroll: true,
  //
  //   // do something custom with the context menu event
  //   onContextMenu(event) {
  //   },
  // });

  return (
    <>
      <TextArea
        id="simple-context-menu-area"
        onContextMenu={onContextMenu}
        placeholder="Right click me!"
      />
      <Menu {...menuProps}>
        <MenuItem leftAddon={<ContentCutOutlinedIcon />}>Cut</MenuItem>
        <MenuItem leftAddon={<ContentCopyOutlinedIcon />}>Copy</MenuItem>
        <MenuItem leftAddon={<ContentPasteOutlinedIcon />}>Paste</MenuItem>
      </Menu>
    </>
  );
}
