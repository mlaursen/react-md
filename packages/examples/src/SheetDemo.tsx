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
import {
  useFocusTrap,
  useScrollLock,
  useKeyboardFocusContext,
} from "@react-md/wia-aria";

const SheetDemo: FunctionComponent = () => {
  const [activeId, setActiveId] = useState("menu-item-1");
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<SheetPosition>("bottom");

  const show = (position: SheetPosition, first: boolean = true) => () => {
    setPosition(position);
    setVisible(true);
    setActiveId("menu-item-1");
  };

  const handleKeyDown = (position: SheetPosition) => (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const { key } = event;
    if (key === "ArrowUp") {
      event.preventDefault();
      show(position, false)();
    } else if (key === "ArrowDown") {
      event.preventDefault();
      show(position)();
    }
  };

  const hide = () => setVisible(false);
  const toggle = () => setVisible(prevVisible => !prevVisible);
  const { setFocusedId } = useKeyboardFocusContext();

  const [sheetEl, setSheetEl] = useState<Maybe<HTMLElement>>(null);
  useFocusTrap({
    container: sheetEl,
    onFocus: el => {
      if (el && el.id) {
        setFocusedId(el.id);
        setActiveId(el.id);
      }
    },
    incrementKeys: ["ArrowDown"],
    decrementKeys: ["ArrowUp"],
  });
  useScrollLock(visible);

  return (
    <TextContainer>
      <Text type="headline-3">Sheet Demo</Text>
      <div className="flex-grid flex-grid--spaced">
        <Button
          id="show-sheet-top"
          onClick={show("top")}
          onKeyDown={handleKeyDown("top")}
          themeType="contained"
          theme="secondary"
        >
          Show Sheet Top
        </Button>
        <Button
          id="show-sheet-right"
          onClick={show("right")}
          onKeyDown={handleKeyDown("right")}
          themeType="contained"
          theme="secondary"
        >
          Show Sheet Right
        </Button>
        <Button
          id="show-sheet-"
          onClick={show("bottom")}
          onKeyDown={handleKeyDown("bottom")}
          themeType="contained"
          theme="secondary"
        >
          Show Sheet Bottom
        </Button>
        <Button
          id="show-sheet-left"
          onClick={show("left")}
          onKeyDown={handleKeyDown("left")}
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
          aria-activedescendant={activeId}
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
              tabIndex={-1}
            >
              Share
            </ListItem>
            <ListItem
              id="menu-item-2"
              role="menuitem"
              leftIcon={<LinkSVGIcon />}
              tabIndex={-1}
            >
              Get Link
            </ListItem>
            <ListItem
              id="menu-item-3"
              role="menuitem"
              leftIcon={<EditSVGIcon />}
              tabIndex={-1}
            >
              Edit Name
            </ListItem>
            <ListItem
              id="menu-item-4"
              role="menuitem"
              leftIcon={<DeleteSVGIcon />}
              className="rmd-theme-error"
              tabIndex={-1}
            >
              Delete Collection
            </ListItem>
            <Divider />
            <ListItem
              id="menu-item-close"
              role="menuitem"
              leftIcon={<CloseSVGIcon />}
              tabIndex={-1}
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
