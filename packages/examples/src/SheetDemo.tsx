import React, { FunctionComponent, useState, useRef } from "react";
import { Button } from "@react-md/button";
import { Sheet, SheetPosition } from "@react-md/sheet";
import { TextContainer, Text } from "@react-md/typography";
import { AppBar, AppBarAction } from "@react-md/app-bar";
import {
  CloseSVGIcon,
  ShareSVGIcon,
  LinkSVGIcon,
  EditSVGIcon,
  DeleteSVGIcon,
} from "@react-md/material-icons";
import { List, ListItem } from "@react-md/list";
import { Divider } from "@react-md/divider";
import { Maybe } from "@react-md/utils";
import { useFocusTrap, useScrollLock } from "@react-md/wia-aria";

const SheetDemo: FunctionComponent = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<SheetPosition>("bottom");

  const show = (position: SheetPosition) => () => {
    setPosition(position);
    setVisible(true);
  };

  const hide = () => setVisible(false);
  const toggle = () => setVisible(prevVisible => !prevVisible);

  const [sheetEl, setSheetEl] = useState<Maybe<HTMLElement>>(null);
  useFocusTrap({ container: sheetEl });
  useScrollLock(visible);

  return (
    <TextContainer>
      <Text type="headline-3">Sheet Demo</Text>
      <div className="flex-grid flex-grid--spaced">
        <Button
          id="show-sheet-top"
          onClick={show("top")}
          themeType="contained"
          theme="secondary"
        >
          Show Sheet Top
        </Button>
        <Button
          id="show-sheet-right"
          onClick={show("right")}
          themeType="contained"
          theme="secondary"
        >
          Show Sheet Right
        </Button>
        <Button
          id="show-sheet-"
          onClick={show("bottom")}
          themeType="contained"
          theme="secondary"
        >
          Show Sheet Bottom
        </Button>
        <Button
          id="show-sheet-left"
          onClick={show("left")}
          themeType="contained"
          theme="secondary"
        >
          Show Sheet Left
        </Button>
        <Sheet
          id="sheet-1"
          visible={visible}
          position={position}
          onRequestClose={hide}
          ref={setSheetEl}
          portal
          role="menu"
        >
          <List
            onClick={event => {
              if (event.target !== event.currentTarget) {
                setVisible(false);
              }
            }}
          >
            <ListItem
              id="menu-item-1"
              role="menuitem"
              leftIcon={<ShareSVGIcon />}
              disabled
            >
              Share
            </ListItem>
            <ListItem
              id="menu-item-2"
              role="menuitem"
              leftIcon={<LinkSVGIcon />}
            >
              Get Link
            </ListItem>
            <ListItem
              id="menu-item-3"
              role="menuitem"
              leftIcon={<EditSVGIcon />}
            >
              Edit Name
            </ListItem>
            <ListItem
              id="menu-item-4"
              role="menuitem"
              leftIcon={<DeleteSVGIcon />}
              className="rmd-theme-error"
            >
              Delete Collection
            </ListItem>
            <Divider />
            <ListItem
              id="menu-item-close"
              role="menuitem"
              leftIcon={<CloseSVGIcon />}
            >
              Close
            </ListItem>
          </List>
        </Sheet>
      </div>
    </TextContainer>
  );
};

export default SheetDemo;
