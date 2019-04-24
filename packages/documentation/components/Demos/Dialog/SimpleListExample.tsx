import React, { FunctionComponent, Fragment, useState } from "react";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@react-md/dialog";
import { Text } from "@react-md/typography";
import { useToggle } from "@react-md/utils";
import { List, ListItem } from "@react-md/list";

import "./simple-list-example.scss";

const SimpleExample: FunctionComponent = () => {
  const { toggled, toggle, enable, disable } = useToggle();
  const [clicked, setClicked] = useState("none");
  const handleClick = (event: React.MouseEvent<HTMLLIElement>) =>
    setClicked(event.currentTarget.id);
  return (
    <Fragment>
      <Button id="dialog-toggle-1" onClick={enable}>
        Show Dialog
      </Button>
      <Text type="subtitle-1" noMargin>
        Last Clicked Item:
      </Text>
      <Text component="pre">
        <output>{clicked}</output>
      </Text>
      <Dialog
        id="dialog-1"
        visible={toggled}
        onRequestClose={disable}
        aria-labelledby="dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="dialog-title">Example</DialogTitle>
        </DialogHeader>
        <List className="simple-dialog-list" onClick={disable}>
          <ListItem id="dialog-item-1" onClick={handleClick}>
            This is the first item
          </ListItem>
          <ListItem id="dialog-item-2" onClick={handleClick}>
            This is the second item
          </ListItem>
          <ListItem id="dialog-item-3" onClick={handleClick}>
            This is the third item
          </ListItem>
          <ListItem id="dialog-item-4" onClick={handleClick}>
            This is the fourth item
          </ListItem>
        </List>
      </Dialog>
    </Fragment>
  );
};

export default SimpleExample;
