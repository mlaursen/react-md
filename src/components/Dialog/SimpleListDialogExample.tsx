import { Button } from "@react-md/button";
import { useToggle } from "@react-md/core";
import { Dialog, DialogHeader, DialogTitle } from "@react-md/dialog";
import { List, ListItem } from "@react-md/list";
import type { ReactElement } from "react";

import styles from "./SimpleListDialogExample.module.scss";

export default function SimpleListDialogExample(): ReactElement {
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
        aria-labelledby="dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="dialog-title">Example</DialogTitle>
        </DialogHeader>
        <List className={styles.list} onClick={hideDialog}>
          <ListItem id="dialog-item-1">This is the first item</ListItem>
          <ListItem id="dialog-item-2">This is the second item</ListItem>
          <ListItem id="dialog-item-3">This is the third item</ListItem>
          <ListItem id="dialog-item-4">This is the fourth item</ListItem>
        </List>
      </Dialog>
    </>
  );
}
