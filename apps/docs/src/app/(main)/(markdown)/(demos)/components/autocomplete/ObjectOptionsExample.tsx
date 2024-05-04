"use client";
import { states } from "@/constants/states.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

export default function ObjectOptionsExample(): ReactElement {
  return (
    <Autocomplete
      label="State"
      options={states}
      extractor={(state) => state.name}
      menuLabel="States"
    />
  );
}
