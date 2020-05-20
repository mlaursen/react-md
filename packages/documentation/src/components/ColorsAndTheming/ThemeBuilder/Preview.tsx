import React, { FC, useRef } from "react";
import { AppBar, AppBarNav, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { List, ListItem } from "@react-md/list";
import { MenuSVGIcon, FavoriteSVGIcon } from "@react-md/material-icons";
import { Sheet } from "@react-md/sheet";
import { Text } from "@react-md/typography";
import { useToggle, GridCell } from "@react-md/utils";

import styles from "./Preview.module.scss";

const Preview: FC = () => {
  const [visible, show, hide] = useToggle(false);
  const container = useRef<HTMLDivElement | null>(null);

  return (
    <GridCell clone>
      <div className={styles.container} ref={container}>
        <AppBar theme="primary">
          <AppBarNav id="theme-preview-nav" onClick={show} aria-label="Menu">
            <MenuSVGIcon />
          </AppBarNav>
          <AppBarTitle id="theme-preview-title">Theme Preview</AppBarTitle>
        </AppBar>
        <Sheet
          id="theme-preview-sheet"
          aria-labelledby="theme-preview-title"
          visible={visible}
          onRequestClose={hide}
          portalInto={() => container.current}
          disableScrollLock
        >
          <List>
            {Array.from({ length: 5 }, (_, i) => (
              <ListItem key={i}>{`Item ${i + 1}`}</ListItem>
            ))}
          </List>
        </Sheet>
        <div className={styles.content}>
          <Text type="headline-4" margin="bottom">
            Look at this
          </Text>
          <Button themeType="contained" theme="primary">
            Primary Button
          </Button>
          <Button
            aria-label="Favorite"
            theme="secondary"
            themeType="contained"
            buttonType="icon"
            className={styles.fab}
          >
            <FavoriteSVGIcon />
          </Button>
        </div>
      </div>
    </GridCell>
  );
};

export default Preview;
