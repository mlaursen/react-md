import React, { FC, Fragment } from "react";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@react-md/dialog";
import { DropdownMenu } from "@react-md/menu";
import { useToggle } from "@react-md/utils";

import "./fixing-overflow-issues.scss";
import InaccessibleMenu from "./InaccessibleMenu";

const ITEMS = Array.from(new Array(20), (_, i) => `Item ${i + 1}`);

const FixingOverflowIssues: FC = () => {
  const { toggled: visible, enable: show, disable: hide } = useToggle();
  return (
    <Fragment>
      <Button
        id="overflow-dialog-button"
        onClick={show}
        themeType="contained"
        theme="primary"
      >
        Show Dialog
      </Button>
      <Dialog
        id="overflow-dialog"
        visible={visible}
        onRequestClose={hide}
        aria-labelledby="overflow-dialog-title"
      >
        <DialogHeader>
          <DialogTitle>Overflow Dialog</DialogTitle>
        </DialogHeader>
        <DialogContent className="overflow-dialog-content">
          <InaccessibleMenu items={ITEMS} />
          <DropdownMenu
            id="overflow-menu"
            items={ITEMS}
            theme="secondary"
            themeType="outline"
          >
            Dropdown
          </DropdownMenu>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default FixingOverflowIssues;
