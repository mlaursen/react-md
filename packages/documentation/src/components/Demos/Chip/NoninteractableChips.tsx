import React, { ReactElement } from "react";
import { Chip } from "@react-md/chip";
import { Grid } from "@react-md/utils";

export default function NoninteractableChips(): ReactElement {
  return (
    <Grid phoneColumns={1} columns={2} wrapOnly>
      <Chip noninteractable theme="solid">
        Chip
      </Chip>
      <Chip noninteractable theme="outline">
        Chip
      </Chip>
      <Chip noninteractable theme="solid" disabled>
        Chip
      </Chip>
      <Chip noninteractable theme="outline" disabled>
        Chip
      </Chip>
    </Grid>
  );
}
