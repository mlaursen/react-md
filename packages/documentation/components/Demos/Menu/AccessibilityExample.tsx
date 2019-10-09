import React, { FC, useMemo } from "react";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { DropdownMenu } from "@react-md/menu";
import { useToggle } from "@react-md/utils";

import people from "constants/people";
import Container from "./Container";

const AccessibilityExample: FC = () => {
  const [visible, show, hide] = useToggle(false);
  const items = useMemo(
    () => people.map(name => ({ children: name, onClick: show })),
    [show]
  );

  return (
    <Container>
      <DropdownMenu id="accessibility-menu-1" items={items}>
        Dropdown
      </DropdownMenu>
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
