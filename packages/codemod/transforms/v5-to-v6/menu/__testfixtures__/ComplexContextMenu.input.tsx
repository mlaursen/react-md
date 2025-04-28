import ContentCopyIcon from "@react-md/material-icons/ContentCopyIcon";
import ContentCutIcon from "@react-md/material-icons/ContentCutIcon";
import ContentPasteIcon from "@react-md/material-icons/ContentPasteIcon";
import type { ReactElement } from "react";
import { Menu, MenuItem, TextArea, TOP_RIGHT_ANCHOR, useContextMenu } from "react-md";

export default function ComplexContextMenu(): ReactElement {
  const onEntering = (): void => {
    // entering
  };
  const {
    menuRef,
    menuNodeRef,
    menuProps,
    onContextMenu,
    setCoords,
    visible,
    setVisible,
  } = useContextMenu({
    anchor: TOP_RIGHT_ANCHOR,
    baseId: "context-menu",
    closeOnResize: true,
    closeOnScroll: true,
    disableFocusOnMount: true,
    disableFocusOnUnmount: true,
    getFixedPositionOptions: () => ({}),
    horizontal: false,
    menuLabel: "Context Menu",
    menuitem: false,
    onContextMenu(event) {
      // onContextMenu
    },
    onEnter() {
      // enter
    },
    onEntering,
    onEntered: () => {
      // entered
    },
    onExited: () => {
      // exited
    },
    onFixedPositionResize: (event) => {
      // resized
    },
    onFixedPositionScroll: (event, data) => {
      // scroll
    },
    preventScroll: true,
    style: {
      background: "orange",
    },
  });

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


