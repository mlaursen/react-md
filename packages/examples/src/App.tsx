import React, { useState, Fragment, useEffect } from "react";
import { Button } from "@react-md/button";
import { TextContainer, Text } from "@react-md/typography";
import {
  useTouchDetectionClassNameToggle,
  PreventColorPollution,
} from "@react-md/states";
import { KeyboardTracker } from "@react-md/wia-aria";
import { useEventListener } from "@react-md/utils";

import styles from "./menu.module.scss";
import { MenuButton, Menu, MenuItem } from "./components/menus";

export interface IAppSize {
  [key: string]: boolean;
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortraitPhone: boolean;
  isLandscapePhone: boolean;
  isPortraitTablet: boolean;
  isLandscapeTablet: boolean;
  isDesktopPhone: boolean;
  isDesktopTablet: boolean;
}

function getCurrentAppSize(): IAppSize {
  const tabletMinWidth = 768;
  const desktopMinWidth = 1025;
  const phoneMedia = `screen and (max-width: ${tabletMinWidth - 1}px)`;
  // tslint:disable-next-line:max-line-length
  const tabletMedia = `screen and (min-width: ${tabletMinWidth}px) and (max-width: ${desktopMinWidth - 1}px)`; // prettier-ignore
  const desktopMedia = `screen and (min-width: ${desktopMinWidth}px)`;

  const matchesTablet = window.matchMedia(tabletMedia).matches;

  const portrait = window.innerHeight > window.innerWidth;
  const isDesktop = window.matchMedia(desktopMedia).matches;
  const isTablet = !isDesktop && matchesTablet;
  const isPhone = !isDesktop && !isTablet;
  const isPortraitPhone = isPhone && portrait;
  const isLandscapePhone = isPhone && !portrait;
  const isPortraitTablet = isTablet && portrait;
  const isLandscapeTablet = isTablet && !portrait;
  const isDesktopPhone = isDesktop && window.matchMedia(phoneMedia).matches;
  const isDesktopTablet = isDesktop && matchesTablet;
  return {
    isPhone,
    isTablet,
    isDesktop,
    isPortraitPhone,
    isLandscapePhone,
    isPortraitTablet,
    isLandscapeTablet,
    isDesktopPhone,
    isDesktopTablet,
  };
}

function updateAppSize(oldSize: IAppSize, setSize: (size: IAppSize) => void) {
  const nextSize = getCurrentAppSize();
  if (Object.keys(oldSize).some(key => oldSize[key] !== nextSize[key])) {
    setSize(nextSize);
  }
}

const App = () => {
  const [
    { visible, isVisibleByKeyboard, defaultFocusFirst },
    setVisible,
  ] = useState({
    visible: false,
    isVisibleByKeyboard: false,
    defaultFocusFirst: true,
  });
  const [appSize, setSize] = useState<IAppSize>(getCurrentAppSize());
  useEventListener("resize", () => setSize(getCurrentAppSize()));
  useTouchDetectionClassNameToggle();

  return (
    <PreventColorPollution>
      <KeyboardTracker>
        <TextContainer>
          <Text type="headline-4">App</Text>
          <MenuButton
            id="menu-button-1"
            menuId="menu-1"
            onRequestShow={(defaultFocusFirst, isVisibleByKeyboard) =>
              setVisible({
                visible: true,
                isVisibleByKeyboard,
                defaultFocusFirst,
              })
            }
            visible={visible}
            theme="primary"
            themeType="contained"
          >
            Hello, world!
          </MenuButton>
          {visible && (
            <Menu
              id="menu-1"
              isVisibleByKeyboard={isVisibleByKeyboard}
              defaultFocusFirst={defaultFocusFirst}
              onRequestHide={() =>
                setVisible({
                  visible: false,
                  isVisibleByKeyboard: false,
                  defaultFocusFirst: true,
                })
              }
            >
              {Array.from(new Array(10)).map((_, i) => (
                <MenuItem
                  id={`item-${i + 1}`}
                  key={i}
                  onClick={() => console.log(`Clicked item ${i + 1}`)}
                >
                  {`Item ${i + 1}`}
                </MenuItem>
              ))}
            </Menu>
          )}
          <Button id="yolo" themeType="contained" theme="secondary">
            Yolo
          </Button>
          <Button id="yolo-2" themeType="contained" theme="secondary" disabled>
            Yolo
          </Button>
          <Button id="hello-2">Hello, World!</Button>
          <Text type="body-1" component="section">
            <pre>{JSON.stringify(appSize, null, 2)}</pre>
          </Text>
        </TextContainer>
      </KeyboardTracker>
    </PreventColorPollution>
  );
};

export default App;
