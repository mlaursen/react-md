"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

import { type State, states } from "@/constants/states.js";

export default function SettingADefaultValueExample(): ReactElement {
  const defaultValue: State = states[9];
  return (
    <Autocomplete
      label="State"
      options={states}
      defaultValue={defaultValue}
      listboxLabel="States"
    />
  );
}
