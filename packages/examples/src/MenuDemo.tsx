import React, { FunctionComponent, useState } from "react";
import { MenuButton, MenuItem, Menu } from "./components/menus";
import { TextContainer, Text } from "@react-md/typography";

const MenuDemo: FunctionComponent = () => {
  const [visible, setVisible] = useState(false);
  const [isVisibleByKeyboard, setVisibleByKeyboard] = useState(false);
  const [defaultFocusFirst, setDefaultFocusFirst] = useState(true);

  return (
    <TextContainer>
      <Text type="headline-3">Menu Demo</Text>
      <MenuButton
        id="menu-button-1"
        menuId="menu-1"
        onRequestShow={(defaultFocusFirst, isVisibleByKeyboard) => {
          setVisible(true);
          setVisibleByKeyboard(isVisibleByKeyboard);
          setDefaultFocusFirst(defaultFocusFirst);
        }}
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
          onRequestHide={() => {
            setVisible(false);
            setVisibleByKeyboard(false);
            setDefaultFocusFirst(true);
          }}
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
    </TextContainer>
  );
};

export default MenuDemo;
