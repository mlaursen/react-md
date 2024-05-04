"use client";
import { states } from "@/constants/states.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

export default function DisabledOptionsExample(): ReactElement {
  return (
    <Autocomplete
      label="State"
      options={states.map((state, i) => ({
        ...state,
        disabled: i % 4 === 0,
      }))}
      // or try
      // getOptionProps={({ index, option }) => ({
      //   disabled: option.disabled || index % 4 === 0 || option.abbreviation === "AK",
      // })}
      extractor={(state) => state.name}
      menuLabel="States"
    />
  );
}
