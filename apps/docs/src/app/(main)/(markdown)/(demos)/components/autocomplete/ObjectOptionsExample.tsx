"use client";
import { desserts } from "@/constants/desserts.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

export default function ObjectOptionsExample(): ReactElement {
  return (
    <Autocomplete
      label="State"
      options={desserts}
      getOptionLabel={(dessert) => dessert.name}
      listboxLabel="States"
    />
  );
}
