import React, { useState, Fragment } from "react";
import { theme } from "@react-md/button";
import { TextContainer, Text } from "@react-md/typography";
import {
  MenuButton,
  Menu,
  MenuItem,
  MenuItemCheckbox,
} from "@react-md/wia-aria";
import { useEventListener } from "@react-md/utils";

import styles from "./menu.module.scss";

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
  const [visible, setVisible] = useState(false);
  const [appSize, setSize] = useState<IAppSize>(getCurrentAppSize());
  useEventListener("resize", () => setSize(getCurrentAppSize()));

  return (
    <TextContainer>
      <MenuButton
        id="menu-button-1"
        menuId="menu-1"
        onRequestShow={() => setVisible(!visible)}
        visible={visible}
        className={theme({
          theme: "primary",
          themeType: "outline",
        })}
      >
        Hello
      </MenuButton>
      {visible && (
        <Menu
          id="menu-1"
          onRequestHide={() => setVisible(false)}
          className={styles.menu}
        >
          {Array.from(new Array(5)).map((_, i) => (
            <MenuItem
              id={`item-${i + 1}`}
              key={i}
              className={styles.item}
            >{`Item ${i + 1}`}</MenuItem>
          ))}
          <MenuItemCheckbox id="item-6" className={styles.item}>
            Look at me!
          </MenuItemCheckbox>
        </Menu>
      )}
      <Text type={appSize.isPhone ? "headline-6" : "headline-3"}>
        <pre>{JSON.stringify(appSize, null, 2)}</pre>
      </Text>
    </TextContainer>
  );
};

export default App;
