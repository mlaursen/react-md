"use client";
import { states, type State } from "@/constants/states.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { Box } from "@react-md/core/box/Box";
import { Typography } from "@react-md/core/typography/Typography";
import { useState, type ReactElement } from "react";

export default function ControllingTheValueExample(): ReactElement {
  const [value, setValue] = useState<State | null>(null);

  return (
    <Box align="start" stacked>
      <Autocomplete
        label="State"
        value={value}
        setValue={setValue}
        options={states}
        listboxLabel="States"
        getOptionLabel={(state) => state.name}
      />
      <Typography>Value: {`"${value?.name || null}"`}</Typography>
    </Box>
  );
}
