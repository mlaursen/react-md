"use client";

import { TextArea } from "@react-md/core/form/TextArea";
import {
  // BELOW_INNER_LEFT_ANCHOR,
  Menu,
} from "@react-md/core/menu/Menu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { useContextMenu } from "@react-md/core/menu/useContextMenu";
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
      <TextArea onContextMenu={onContextMenu} placeholder="Right click me!" />
      <Menu {...menuProps}>
        <MenuItem leftAddon={<ContentCutOutlinedIcon />}>Cut</MenuItem>
        <MenuItem leftAddon={<ContentCopyOutlinedIcon />}>Copy</MenuItem>
        <MenuItem leftAddon={<ContentPasteOutlinedIcon />}>Paste</MenuItem>
      </Menu>
    </>
  );
}
