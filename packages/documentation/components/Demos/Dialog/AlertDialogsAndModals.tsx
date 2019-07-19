import React, { FC, Fragment, useState } from "react";
import { Button } from "@react-md/button";
import { Dialog, DialogContent, DialogFooter } from "@react-md/dialog";
import { Text } from "@react-md/typography";

import "./AlertDialogsAndModals.scss";

const DRAFT = `This is some initial text to show in the draft area.
When you click on "Reset", a dialog will ask you if you want to discard the
draft. When you click on "Submit", a modal confirmation dialog will ask you
if you really want to submit this.
`.replace(/\r?\n/g, " ");

const AlertDialogsAndModals: FC = () => {
  const [state, setState] = useState({ visible: false, modal: false });
  const hide = (): void => {
    setState(prevState => ({ ...prevState, visible: false }));
  };
  const show = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setState({
      visible: true,
      modal: event.currentTarget.id === "draft-submit",
    });
  };

  const { visible, modal } = state;

  return (
    <Fragment>
      <form
        id="draft-form"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <textarea
          id="draft-area"
          className="dialog-draft"
          defaultValue={DRAFT}
        />
        <DialogFooter>
          <Button
            id="draft-discard"
            onClick={show}
            type="reset"
            theme="warning"
          >
            Reset
          </Button>
          <Button id="draft-submit" onClick={show} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </form>
      <Dialog
        id="draft-dialog"
        role="alertdialog"
        modal={modal}
        visible={visible}
        onRequestClose={hide}
        aria-labelledby="dialog-title"
      >
        <DialogContent>
          <Text
            id="dialog-title"
            type="subtitle-1"
            margin="none"
            color="secondary"
          >
            {!modal ? "Discard draft?" : "Are you sure?"}
          </Text>
        </DialogContent>
        <DialogFooter>
          <Button id="dialog-cancel" onClick={hide}>
            Cancel
          </Button>
          <Button id="dialog-discard" onClick={hide}>
            {!modal ? "Discard" : "Submit"}
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default AlertDialogsAndModals;
