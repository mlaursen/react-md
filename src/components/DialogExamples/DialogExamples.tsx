import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { AlertDialogsAndModals } from "./AlertDialogsAndModals";
import { FixedDialogExample } from "./FixedDialogExample";
import { FullPageExample } from "./FullPageExample";
import { NestedDialogs } from "./NestedDialogs";
import { PersistentDialog } from "./PersistentDialog";
import { SettingInitialFocus } from "./SettingInitialFocus";
import { SimpleExample } from "./SimpleExample";
import { SimpleListDialogExample } from "./SimpleListDialogExample";

export default function DialogExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
        <SimpleExample />
        <DemoHeadingWithDivider>Setting Initial Focus</DemoHeadingWithDivider>
        <SettingInitialFocus />
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
        <DemoHeadingWithDivider>Persistent Dialog</DemoHeadingWithDivider>
        <PersistentDialog />
        <DemoHeadingWithDivider>Nested Dialogs</DemoHeadingWithDivider>
        <NestedDialogs />
      </Box>
    </Resettable>
  );
}
