import { Box, TextContainer } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "src/components/DemoHeadingWithDivider";
import AlertDialogsAndModals from "src/components/Dialog/AlertDialogsAndModals";
import FixedDialogExample from "src/components/Dialog/FixedDialogExample";
import FullPageExample from "src/components/Dialog/FullPageExample";
import SimpleExample from "src/components/Dialog/SimpleExample";
import SimpleListDialogExample from "src/components/Dialog/SimpleListDialogExample";

export default function DialogPage(): ReactElement {
  return (
    <TextContainer>
      <Box stacked>
        <DemoHeadingWithDivider margin="none">
          Simple Example
        </DemoHeadingWithDivider>
        <SimpleExample />
        <DemoHeadingWithDivider>Full Page Example</DemoHeadingWithDivider>
        <FullPageExample />
        <DemoHeadingWithDivider>
          Simple List Dialog Example
        </DemoHeadingWithDivider>
        <SimpleListDialogExample />
        <DemoHeadingWithDivider>
          Alert Dialogs and Modals
        </DemoHeadingWithDivider>
        <AlertDialogsAndModals />
        <DemoHeadingWithDivider>Fixed Dialog Example</DemoHeadingWithDivider>
        <FixedDialogExample />
      </Box>
    </TextContainer>
  );
}
