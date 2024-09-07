"use client";
import { Button } from "@react-md/core/button/Button";
import { Dialog } from "@react-md/core/dialog/Dialog";
import { DialogContent } from "@react-md/core/dialog/DialogContent";
import { DialogFooter } from "@react-md/core/dialog/DialogFooter";
import { DialogHeader } from "@react-md/core/dialog/DialogHeader";
import { DialogTitle } from "@react-md/core/dialog/DialogTitle";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

export default function NestedDialogsExample(): ReactElement {
  const { toggle, toggled } = useToggle();
  return <InfiniteDialog key={`${toggled}`} depth={0} closeAll={toggle} />;
}

interface InfiniteDialogProps {
  depth: number;
  closeAll(): void;
}

function InfiniteDialog(props: InfiniteDialogProps): ReactElement {
  const { depth, closeAll } = props;
  const { enable: show, disable: hide, toggled: visible } = useToggle();

  return (
    <>
      <Button onClick={show}>Show</Button>
      <Dialog aria-label="Dialog" visible={visible} onRequestClose={hide}>
        <DialogHeader>
          <DialogTitle>Dialog Depth {depth}</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <InfiniteDialog depth={depth + 1} closeAll={closeAll} />
        </DialogContent>
        <DialogFooter>
          <Button theme="error" onClick={closeAll}>
            Close All
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
