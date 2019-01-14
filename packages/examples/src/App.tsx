import React, { useState, Fragment } from "react";
import { theme } from "@react-md/button";
import { TextContainer } from "@react-md/typography";
import {
  MenuButton,
  Menu,
  MenuItem,
  MenuItemCheckbox,
} from "@react-md/wia-aria";

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <TextContainer>
      <MenuButton
        id="menu-button-1"
        menuId="menu-1"
        onRequestShow={() => setVisible(!visible)}
        visible={visible}
        className={theme({ theme: "primary", themeType: "outline" })}
      >
        Hello
      </MenuButton>
      {visible && (
        <Menu id="menu-1" onRequestHide={() => setVisible(false)}>
          {Array.from(new Array(5)).map((_, i) => (
            <MenuItem id={`item-${i + 1}`} key={i}>{`Item ${i + 1}`}</MenuItem>
          ))}
          <MenuItemCheckbox id="item-6">Look at me!</MenuItemCheckbox>
        </Menu>
      )}
    </TextContainer>
  );
};

export default App;
