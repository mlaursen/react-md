import React, { FC, useRef, useEffect } from "react";
import { Button } from "@react-md/button";
import { bem } from "@react-md/theme";
import { useToggle } from "@react-md/utils";
import { List } from "@react-md/list";
import { MenuItem } from "@react-md/menu";

import "./inaccessible-menu.scss";
import { TextIconSpacing, IconRotator } from "@react-md/icon";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";

const block = bem("inaccessible-menu");

// sorry -- too lazy to fully implement a11y and functionality just for a "broken" demo
const InaccessibleMenu: FC<{ items: string[] }> = ({ items }) => {
  const { toggled: visible, disable, toggle } = useToggle();
  const menu = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!visible) {
      return;
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target || !menu.current || !menu.current.contains(target)) {
        disable();
      }
    };
    window.addEventListener("click", closeOnOutsideClick);

    return () => {
      window.removeEventListener("click", closeOnOutsideClick);
    };
  }, [visible]);

  return (
    <div className={block()}>
      <Button
        id="inaccessible-menu-button"
        themeType="outline"
        onClick={toggle}
        theme="error"
      >
        <TextIconSpacing
          icon={
            <IconRotator rotated={visible}>
              <ArrowDropDownSVGIcon />
            </IconRotator>
          }
          iconAfter
        >
          Relative
        </TextIconSpacing>
      </Button>
      {visible && (
        <div
          role="menu"
          id="inacceesible-menu"
          className={block("menu")}
          aria-label="Menu"
          onClick={disable}
        >
          <List>
            {items.map(item => (
              <MenuItem key={item}>{item}</MenuItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default InaccessibleMenu;
