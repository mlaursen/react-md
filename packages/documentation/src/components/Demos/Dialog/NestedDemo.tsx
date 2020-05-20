import React, { FC } from "react";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@react-md/dialog";
import { Text } from "@react-md/typography";
import { useToggle } from "@react-md/utils";

interface NestedDemoProps {
  depth: number;
}

/**
 * This demo will recursively call itself until there have been 3 dialogs created
 * and then stop.
 */
const NestedDemo: FC<NestedDemoProps> = ({ depth }) => {
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
          <Text>This is some content within the dialog.</Text>
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
};

export default NestedDemo;
