// TODO: The `useContextMenu` no longer supports the `onFixedPositionScroll` callback
// TODO: The `useContextMenu` no longer supports the `onFixedPositionResize` callback
// TODO: The `useContextMenu` no longer returns `setCoords`. Manually provide an `initialX` and `initialY` to the `Menu` instead
// TODO: The `useContextMenu` no longer returns `menuNodeRef` and must be implemented manually
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
    menuProps,
    onContextMenu,
    visible,
    setVisible
  } = useContextMenu({
    anchor: TOP_RIGHT_ANCHOR,
    menuLabel: "Context Menu",

    onContextMenu(event) {
      // onContextMenu
    },

    preventScroll: true
  });

  return (
    <>
      <TextArea
        id="simple-context-menu-area"
        onContextMenu={onContextMenu}
        placeholder="Right click me!"
      />
      <Menu
        {...menuProps}
        id="context-menu"
        closeOnResize={true}
        closeOnScroll={true}
        getFixedPositionOptions={() => ({})}
        horizontal={false}
        onEnter={() => {
          // enter
        }}
        onEntering={onEntering}
        onEntered={() => {
          // entered
        }}
        onExited={() => {
          // exited
        }}
        style={{
          background: "orange"
        }}
        isFocusTypeDisabled={type => {
          if (type === "mount") {
            return true;
          }

          if (type === "unmount") {
            return true;
          }

          return false;
        }}>
        <MenuItem leftAddon={<ContentCutIcon />}>Cut</MenuItem>
        <MenuItem leftAddon={<ContentCopyIcon />}>Copy</MenuItem>
        <MenuItem leftAddon={<ContentPasteIcon />}>Paste</MenuItem>
      </Menu>
    </>
  );
}


