import { Box } from "@react-md/core";
import {
  ExpansionList,
  ExpansionPanel,
  useExpansionPanels,
} from "@react-md/expansion-panel";
import { Form, TextField } from "@react-md/form";
import type { ReactElement } from "react";

export function MultiPartForm(): ReactElement {
  const { getPanelProps } = useExpansionPanels();

  return (
    <Form style={{ width: "100%", maxWidth: "30rem" }}>
      <ExpansionList>
        <ExpansionPanel
          {...getPanelProps(0)}
          headerChildren="Personal Information"
        >
          <Box stacked align="stretch">
            <TextField
              name="name"
              label="Name *"
              required
              placeholder="John Doe"
            />
            <TextField
              name="email"
              type="email"
              label="Email *"
              required
              placeholder="some.person@email.com"
            />
            <TextField
              id="person-phone"
              name="phone"
              type="tel"
              label="Phone"
            />
            <TextField
              name="extension"
              label="Extension"
              maxLength={4}
              placeholder="XXXX"
            />
            <TextField
              id="person-country"
              name="country"
              label="Country"
              placeholder="XX"
              maxLength={2}
            />
            <TextField id="person-city" name="city" label="City/Province" />
          </Box>
        </ExpansionPanel>
        <ExpansionPanel
          {...getPanelProps(1)}
          headerChildren="Billing Information"
        >
          <Box stacked align="stretch">
            <TextField name="address1" label="Address 1" />
            <TextField name="address2" label="Address 2" />
            <TextField name="city" label="City" />
            <TextField name="state" label="State" />
            <TextField name="zip" label="Zip Code" />
          </Box>
        </ExpansionPanel>
        <ExpansionPanel {...getPanelProps(2)} headerChildren="Billing Address">
          <Box stacked align="stretch">
            <TextField name="address1" label="Address 1" />
            <TextField name="address2" label="Address 2" />
            <TextField name="city" label="City" />
            <TextField name="state" label="State" />
            <TextField name="zip" label="Zip Code" />
          </Box>
        </ExpansionPanel>
      </ExpansionList>
    </Form>
  );
}
