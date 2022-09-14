import { Box, TextContainer } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "src/components/DemoHeadingWithDivider";
import FixedDialogExample from "src/components/Dialog/FixedDialogExample";
import FullPageExample from "src/components/Dialog/FullPageExample";
import SimpleExample from "src/components/Dialog/SimpleExample";

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
        <FixedDialogExample />
      </Box>
    </TextContainer>
  );
}
