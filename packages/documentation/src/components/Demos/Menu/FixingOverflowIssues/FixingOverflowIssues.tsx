import React, { FC } from "react";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { DropdownMenu } from "@react-md/menu";
import { useToggle } from "@react-md/utils";

import "./FixingOverflowIssues.scss";
import InaccessibleMenu from "./InaccessibleMenu";

const ITEMS = Array.from(new Array(20), (_, i) => `Item ${i + 1}`);

const FixingOverflowIssues: FC = () => {
  const [visible, show, hide] = useToggle(false);
  return (
    <>
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
    </>
  );
};

export default FixingOverflowIssues;
