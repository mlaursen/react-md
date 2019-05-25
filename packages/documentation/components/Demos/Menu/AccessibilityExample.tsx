import React, { FC } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@react-md/dialog";
import { DropdownMenu } from "@react-md/menu";
import Container from "./Container";
import { useToggle } from "@react-md/utils";
import { Button } from "@react-md/button";

const AccessibilityExample: FC = () => {
  const { toggled: visible, enable: show, disable: hide } = useToggle();
  return (
    <Container>
      <DropdownMenu
        id="accessibility-menu-1"
        menuLabelledby="accessibility-menu-1"
        items={["Share", "Open", "Rename", "Make a copy", "Move To"]}
        onItemClick={show}
      >
        Options...
      </DropdownMenu>
      {/* need to look into fixing this keyboard flow */}
      <Dialog
        id="confirmation-dialog"
        aria-labelledby="cofirmation-dialog-title"
        visible={visible}
        onRequestClose={hide}
      >
        <DialogHeader>
          <DialogTitle id="confirmation-dialog-title">Confirm</DialogTitle>
        </DialogHeader>
        <DialogContent>Are you sure?</DialogContent>
        <DialogFooter>
          <Button id="confirmation-dialog-cancel" theme="clear" onClick={hide}>
            Cancel
          </Button>
          <Button
            id="confirmation-dialog-confirm"
            theme="secondary"
            onClick={hide}
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </Container>
  );
};

export default AccessibilityExample;
