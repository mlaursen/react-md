"use client";
import { type State, states } from "@/constants/states.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

export default function SettingADefaultValueExample(): ReactElement {
  const defaultValue: State = states[9];
  return (
    <Autocomplete
      label="State"
      options={states}
      getOptionLabel={(state) => state.name}
      defaultValue={defaultValue}
      listboxLabel="States"
    />
  );
}
