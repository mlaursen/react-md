"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, useState } from "react";

import { type State, states } from "@/constants/states.js";

export default function ControllingTheInputValueExample(): ReactElement {
  const [query, setQuery] = useState("");

  return (
    <Box align="start" stacked>
      <Autocomplete
        label="State"
        query={query}
        setQuery={setQuery}
        options={states}
        listboxLabel="States"
        getOptionLabel={(state: State) => state.name}
      />
      <Button
        onClick={() => {
          setQuery("some other value");
        }}
        themeType="outline"
      >
        Set query
      </Button>
      <Typography>Query: {`"${query}"`}</Typography>
    </Box>
  );
}
