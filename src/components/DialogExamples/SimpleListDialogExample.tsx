import { Button } from "@react-md/button";
import { useToggle } from "@react-md/core";
import { Dialog, DialogHeader, DialogTitle } from "@react-md/dialog";
import { List, ListItem } from "@react-md/list";
import type { ReactElement } from "react";
import { useId } from "react";

import styles from "./SimpleListDialogExample.module.scss";

export function SimpleListDialogExample(): ReactElement {
  const titleId = useId();
  const {
    toggled: visible,
    enable: showDialog,
    disable: hideDialog,
  } = useToggle(false);
  return (
    <>
      <Button onClick={showDialog}>Show</Button>
      <Dialog
        visible={visible}
        onRequestClose={hideDialog}
        aria-labelledby={titleId}
      >
        <DialogHeader>
          <DialogTitle id={titleId}>Example</DialogTitle>
        </DialogHeader>
        <List className={styles.list} onClick={hideDialog}>
          <ListItem>This is the first item</ListItem>
          <ListItem>This is the second item</ListItem>
          <ListItem>This is the third item</ListItem>
          <ListItem>This is the fourth item</ListItem>
        </List>
      </Dialog>
    </>
  );
}
