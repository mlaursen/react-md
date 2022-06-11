import { Button } from "@react-md/button";
import { Typography } from "@react-md/core";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Sheet,
} from "@react-md/dialog";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

const sheet = false;

export default function DialogPage(): ReactElement {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const rootNode = document.body.firstElementChild;
    if (!rootNode || !(rootNode instanceof HTMLElement)) {
      return;
    }

    rootNode.style.height = "100%";

    return () => {
      rootNode.style.height = "";
    };
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "calc(100% - 3.5rem)",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={() => setVisible(true)}>Show</Button>
        <Dialog
          visible={visible && !sheet}
          onRequestClose={() => setVisible(false)}
          aria-label="Dialog"
          type="full-page"
        >
          <DialogHeader>
            <DialogTitle>Simple Dialog</DialogTitle>
          </DialogHeader>
          <DialogContent>This is some text in a dialog.</DialogContent>
          <DialogFooter>
            <Button onClick={() => setVisible(false)}>Close</Button>
          </DialogFooter>
        </Dialog>
        <Sheet
          visible={visible && sheet}
          aria-label="Sheet"
          onRequestClose={() => setVisible(false)}
        >
          <DialogHeader>
            <DialogTitle>Hello</DialogTitle>
          </DialogHeader>
          <DialogContent>Content</DialogContent>
          <DialogFooter>
            <Button>Footer</Button>
          </DialogFooter>
        </Sheet>
      </div>
      <Typography>Hello, world!</Typography>
    </>
  );
}
