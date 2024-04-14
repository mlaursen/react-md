"use client";
import { Button } from "@react-md/core/button/Button";
import { cssUtils } from "@react-md/core/cssUtils";
import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import { Overlay } from "@react-md/core/overlay/Overlay";
import { ScrollLock } from "@react-md/core/scroll/ScrollLock";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

export default function OverlayWithContentExample(): ReactElement {
  const { toggled, enable, disable } = useToggle();
  return (
    <>
      <Button onClick={enable}>Show</Button>
      <Overlay
        visible={toggled}
        onClick={disable}
        align="start"
        justify="space-around"
      >
        <ScrollLock />
        <List className={cssUtils({ backgroundColor: "surface" })}>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
        <List className={cssUtils({ backgroundColor: "surface" })}>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </Overlay>
    </>
  );
}
