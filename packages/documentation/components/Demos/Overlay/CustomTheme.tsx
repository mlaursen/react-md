import React, { FunctionComponent, Fragment } from "react";
import { Button } from "@react-md/button";
import { Overlay } from "@react-md/overlay";

import "./custom-theme.scss";
import useToggle from "./useToggle";
import { List, ListItem } from "@react-md/list";

const CustomTheme: FunctionComponent = () => {
  const { visible, toggle, hide } = useToggle();
  return (
    <Fragment>
      <Button
        id="custom-theme-button"
        themeType="outline"
        theme="clear"
        onClick={toggle}
      >
        Show Overlay
      </Button>
      <Overlay
        id="custom-theme-overlay"
        onRequestClose={hide}
        visible={visible}
        className="custom-theme-overlay"
      >
        <List className="custom-theme-overlay__list">
          {Array.from(new Array(10)).map((_, i) => (
            <ListItem id={`item-${i}`} key={i}>
              {`Item ${i + 1}`}
            </ListItem>
          ))}
        </List>
      </Overlay>
    </Fragment>
  );
};

export default CustomTheme;
