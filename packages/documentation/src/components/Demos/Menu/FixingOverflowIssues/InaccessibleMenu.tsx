/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus */
import React, { FC, useEffect, useRef } from "react";
import { Button } from "@react-md/button";
import { IconRotator, TextIconSpacing } from "@react-md/icon";
import { List } from "@react-md/list";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import { MenuItem } from "@react-md/menu";
import { useToggle } from "@react-md/utils";

import styles from "./InaccessibleMenu.module.scss";

// sorry -- too lazy to fully implement a11y and functionality just for a "broken" demo
const InaccessibleMenu: FC<{ items: string[] }> = ({ items }) => {
  const [visible, , disable, toggle] = useToggle(false);
  const menu = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!visible) {
      return;
    }

    const closeOnOutsideClick = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (!target || !menu.current || !menu.current.contains(target)) {
        disable();
      }
    };
    window.addEventListener("click", closeOnOutsideClick);

    return () => {
      window.removeEventListener("click", closeOnOutsideClick);
    };
  }, [visible, disable]);

  return (
    <div className={styles.container}>
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
          className={styles.menu}
          aria-label="Menu"
          onClick={disable}
        >
          <List>
            {items.map((item) => (
              <MenuItem key={item}>{item}</MenuItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default InaccessibleMenu;
