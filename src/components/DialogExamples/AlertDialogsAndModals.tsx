import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  TextArea,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useId, useState } from "react";

import styles from "./AlertDialogsAndModals.module.scss";

const DRAFT = `This is some initial text to show in the draft area.
When you click on "Reset", a dialog will ask you if you want to discard the
draft. When you click on "Submit", a modal confirmation dialog will ask you
if you really want to submit this.
`.replace(/\r?\n/g, " ");

export function AlertDialogsAndModals(): ReactElement {
  const titleId = useId();
  const [state, setState] = useState({ visible: false, modal: false });
  const hide = (): void => {
    setState((prevState) => ({ ...prevState, visible: false }));
  };
  const show = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setState({
      visible: true,
      modal: event.currentTarget.type === "submit",
    });
  };

  const { visible, modal } = state;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextArea
          defaultValue={DRAFT}
          className={styles.textarea}
          resize="none"
        />
        <DialogFooter>
          <Button onClick={show} type="reset" theme="warning">
            Reset
          </Button>
          <Button onClick={show} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </form>
      <Dialog
        role="alertdialog"
        modal={modal}
        visible={visible}
        onRequestClose={hide}
        aria-labelledby={titleId}
      >
        <DialogContent>
          <DialogTitle id={titleId}>
            {!modal ? "Discard draft?" : "Are you sure?"}
          </DialogTitle>
        </DialogContent>
        <DialogFooter>
          <Button onClick={hide}>Cancel</Button>
          <Button onClick={hide} theme={modal ? "primary" : "error"}>
            {!modal ? "Discard" : "Submit"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
