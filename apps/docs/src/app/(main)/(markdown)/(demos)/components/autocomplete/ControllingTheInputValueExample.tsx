"use client";
import { states, type State } from "@/constants/states.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Typography } from "@react-md/core/typography/Typography";
import { useState, type ReactElement } from "react";

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
