"use client";
import { states, type State } from "@/constants/states.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { Box } from "@react-md/core/box/Box";
import { Typography } from "@react-md/core/typography/Typography";
import { useState, type ReactElement } from "react";

export default function SelectedValueExample(): ReactElement {
  const [selected, setSelected] = useState<State | null>(null);

  return (
    <Box align="start" stacked>
      <Autocomplete
        label="State"
        options={states}
        menuLabel="States"
        onAutocomplete={(option) => {
          setSelected(option);
        }}
        extractor={(state) => state.name}
      />
      <Typography>Selected: {`"${selected?.name || null}"`}</Typography>
    </Box>
  );
}
