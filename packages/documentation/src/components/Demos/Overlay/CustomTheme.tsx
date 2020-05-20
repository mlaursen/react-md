import React, { FC } from "react";
import { Button } from "@react-md/button";
import { List, ListItem } from "@react-md/list";
import { Overlay } from "@react-md/overlay";
import { useToggle } from "@react-md/utils";

import styles from "./CustomTheme.module.scss";

const CustomTheme: FC = () => {
  const [toggled, , disable, toggle] = useToggle(false);
  return (
    <>
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
        onRequestClose={disable}
        visible={toggled}
        className={styles.overlay}
      >
        <List className={styles.list}>
          {Array.from({ length: 10 }).map((_, i) => (
            <ListItem id={`item-${i}`} key={i}>
              {`Item ${i + 1}`}
            </ListItem>
          ))}
        </List>
      </Overlay>
    </>
  );
};

export default CustomTheme;
