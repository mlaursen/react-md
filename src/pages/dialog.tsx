import { Button } from "@react-md/button";
import { Box, Typography } from "@react-md/core";
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
  const [visible, setVisible] = useState(true);
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

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  // const [boop, setBoop] = useState(false);
  // useEffect(() => {
  //   if (!visible) {
  //     return;
  //   }
  //   const interval = window.setInterval(() => {
  //     setBoop((prev) => !prev);
  //   }, 1000);
  //   return () => {
  //     window.clearInterval(interval);
  //   };
  // }, [visible]);
  return (
    <>
      <Box
        justifyContent="center"
        alignItems="center"
        style={{ height: "calc(100% - 3.5rem)" }}
      >
        <Button onClick={() => setVisible(true)}>Show</Button>
      </Box>
      <Dialog
        visible={visible && !sheet}
        onRequestClose={() => setVisible(false)}
        aria-label="Dialog"
        // type="full-page"
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
      {/* added to test scroll lock behavior */}
      <Typography>Hello, world!</Typography>
    </>
  );
}
