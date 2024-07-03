import type { ReactElement } from "react";
import {
  ExpansionList,
  ExpansionPanel,
  Grid,
  TextField,
  useExpansionPanels,
} from "react-md";

export default function Demo(): ReactElement {
  const {
    getPanelProps: getPanelProps
  } = useExpansionPanels({
    baseId: "simple-panels",
    defaultExpandedIndex: 0
  });

  return (
    (<ExpansionList>
      <ExpansionPanel
        {...getPanelProps(0)}
        header="Personal Information"
        disablePadding
      >
        <Grid columns={1} clone>
          <TextField
            id="person-name"
            name="name"
            label="Name *"
            required
            placeholder="John Doe"
          />
          <TextField
            id="person-email"
            name="email"
            type="email"
            label="Email *"
            required
            placeholder="some.person@email.com"
          />
          <TextField id="person-phone" name="phone" type="tel" label="Phone" />
          <TextField
            id="person-extension"
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
        </Grid>
      </ExpansionPanel>
      <ExpansionPanel
        {...getPanelProps(1)}
        header="Billing Information"
        disablePadding
      >
        <Grid columns={1}>
          <TextField id="person-address-1" name="address1" label="Address 1" />
          <TextField id="person-address-2" name="address2" label="Address 2" />
          <TextField id="person-address-city" name="city" label="City" />
          <TextField id="person-address-state" name="state" label="State" />
          <TextField id="person-address-zip" name="zip" label="Zip Code" />
        </Grid>
      </ExpansionPanel>
      <ExpansionPanel {...getPanelProps(2)} header="Billing Address" disablePadding>
        <Grid columns={1}>
          <TextField
            id="person-shipping-address-1"
            name="address1"
            label="Address 1"
          />
          <TextField
            id="person-shipping-address-2"
            name="address2"
            label="Address 2"
          />
          <TextField
            id="person-shipping-address-city"
            name="city"
            label="City"
          />
          <TextField
            id="person-shipping-address-state"
            name="state"
            label="State"
          />
          <TextField
            id="person-shipping-address-zip"
            name="zip"
            label="Zip Code"
          />
        </Grid>
      </ExpansionPanel>
    </ExpansionList>)
  );
}
