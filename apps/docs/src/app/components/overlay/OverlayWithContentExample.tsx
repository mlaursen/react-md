"use client";
import {
  Button,
  List,
  ListItem,
  Overlay,
  ScrollLock,
  cssUtils,
  useToggle,
} from "@react-md/core";
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
