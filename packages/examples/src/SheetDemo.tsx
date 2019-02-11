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
import { List, ListItem, SimpleListItem } from "@react-md/list";
import { Divider } from "@react-md/divider";
import {
  Maybe,
  positionRelativeTo,
  VerticalPosition,
  HorizontalPosition,
} from "@react-md/utils";
import {
  useScrollLock,
  KeyboardFocusChangeEvent,
  // useActiveDescendantState,
  // useFocusSwap,
} from "@react-md/wia-aria";
import { useRelativePositioningStyle } from "@react-md/transition";
import SheetList from "./SheetList";

import "./sheet.scss";

// const hackStyle = (node: HTMLElement) => {
//   const style = positionRelativeTo(
//     document.getElementById("show-sheet-left"),
//     node
//   );

//   if (!style) {
//     return;
//   }

//   Object.entries(style).forEach(([property, value]) => {
//     if (typeof value === "number") {
//       value = `${value}px`;
//     }
//     // @ts-ignore
//     node.style[property] = value;
//   });
// };

const SheetDemo: FunctionComponent = () => {
  // const [activeId, setActiveId] = useState("menu-item-1");
  const ref = useRef<Maybe<HTMLButtonElement>>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<SheetPosition>("bottom");
  const [focusFirst, setFocusfirst] = useState(true);

  let horizontalPosition: HorizontalPosition | undefined;
  let verticalPosition: VerticalPosition | undefined;
  switch (position) {
    case "left":
      horizontalPosition = "inner left";
      break;
    case "right":
      horizontalPosition = "inner right";
      break;
    case "top":
      verticalPosition = "above";
      break;
    case "bottom":
      verticalPosition = "below";
      break;
  }
  const styleProps = useRelativePositioningStyle({
    fixedTo: ref.current,
    horizontalPosition,
    verticalPosition,
  });

  const show = (position: SheetPosition, first: boolean = true) => (
    event:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    ref.current = event.currentTarget;
    setPosition(position);
    setVisible(true);
    setFocusfirst(first);
  };

  const handleKeyDown = (position: SheetPosition) => (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const { key } = event;
    if (key === "ArrowUp") {
      event.preventDefault();
      show(position, false)(event);
    } else if (key === "ArrowDown") {
      event.preventDefault();
      show(position)(event);
    }
  };

  const hide = () => setVisible(false);
  const toggle = () => setVisible(prevVisible => !prevVisible);
  useScrollLock(visible);

  // const { containerProps, setActiveId } = useActiveDescendantState({
  //   // search: true,
  //   defaultActiveId: "",
  //   // incrementKeys: ["ArrowDown"],
  //   // decrementKeys: ["ArrowUp"],
  //   // jumpToFirstKeys: ["Home"],
  //   // jumpToLastKeys: ["End"],
  //   onKeyDown: event => {
  //     if (event.key === "Tab" || event.key === "Escape") {
  //       event.stopPropagation();
  //       hide();
  //     }
  //   },
  // });

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
          position="calculated"
          overlayClassName="rmd-overlay--sheet"
          classNames={{
            appear: "rmd-menu--enter",
            appearActive: "rmd-menu--enter-active",
            enter: "rmd-menu--enter",
            enterActive: "rmd-menu--enter-active",
            exit: "rmd-menu--exit",
            exitActive: "rmd-menu--exit-active",
          }}
          onRequestClose={hide}
          {...styleProps}
          onClick={event => {
            const target = event.target as HTMLElement;
            if (!target || target === event.currentTarget) {
              return;
            }

            window.requestAnimationFrame(hide);
          }}
        >
          <SheetList />
        </Sheet>
      </div>
    </TextContainer>
  );
};

export default SheetDemo;
