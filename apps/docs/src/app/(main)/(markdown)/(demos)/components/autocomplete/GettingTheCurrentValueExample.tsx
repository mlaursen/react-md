"use client";
import { type State, states } from "@/constants/states.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

export default function GettingTheCurrentValueExample(): ReactElement {
  const defaultValue: State = states[9];

  return (
    <Autocomplete
      label="State"
      options={states}
      getOptionLabel={(state) => state.name}
      defaultValue={defaultValue}
      listboxLabel="States"
      onValueChange={(value) => {
        // Do something with the value. Should generally not call `setState`

        // eslint-disable-next-line no-console
        console.log("value:", value);
      }}
    />
  );
}
