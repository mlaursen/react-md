import {
  ExpansionPanel,
  Form,
  KeyboardMovementProvider,
  TextField,
  useExpansionList,
  useExpansionPanels,
} from "@react-md/core";
import type { ReactElement } from "react";

export function CustomExpansionListExample(): ReactElement {
  const { getPanelProps } = useExpansionPanels();
  const { movementContext, movementProps } = useExpansionList();
  return (
    <KeyboardMovementProvider value={movementContext}>
      <Form {...movementProps} style={{ width: "100%", maxWidth: "30rem" }}>
        <ExpansionPanel {...getPanelProps(0)} headerChildren="Panel 1">
          <TextField name="firstName" label="First Name" placeholder="John" />
        </ExpansionPanel>
        <ExpansionPanel {...getPanelProps(1)} headerChildren="Panel 2">
          <TextField name="middleName" label="Middle Name" placeholder="" />
        </ExpansionPanel>
        <ExpansionPanel {...getPanelProps(2)} headerChildren="Panel 3">
          <TextField name="lastName" label="Last Name" placeholder="Doe" />
        </ExpansionPanel>
      </Form>
    </KeyboardMovementProvider>
  );
}
