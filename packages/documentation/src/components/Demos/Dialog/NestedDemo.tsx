import type { ReactElement } from "react";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@react-md/dialog";
import { Typography } from "@react-md/typography";
import { useToggle } from "@react-md/utils";

interface NestedDemoProps {
  depth: number;
}

/**
 * This demo will recursively call itself until there have been 3 dialogs created
 * and then stop.
 */
export default function NestedDemo({
  depth,
}: NestedDemoProps): ReactElement | null {
  const [visible, enable, disable] = useToggle(false);
  if (depth >= 3) {
    return null;
  }

  const depthPath = Array.from({ length: depth + 1 })
    .map((_, i) => i)
    .join("-");

  const dialogId = `nested-demo-dialog-${depthPath}`;
  return (
    <>
      <Button id={`nested-demo-button-${depthPath}`} onClick={enable}>
        Show Next Dialog
      </Button>
      <Dialog
        id={dialogId}
        visible={visible}
        onRequestClose={disable}
        aria-labelledby={`${dialogId}-title`}
      >
        <DialogHeader>
          <DialogTitle id={`${dialogId}-title`}>
            Dialog at depth {depth}
          </DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Typography>This is some content within the dialog.</Typography>
          <NestedDemo depth={depth + 1} />
        </DialogContent>
        <DialogFooter>
          <Button id={`${dialogId}-close`} onClick={disable}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
