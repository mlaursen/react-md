"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

import { fruits } from "@/constants/fruits.js";

export default function DisablingTheClearAndDropdownButtonsExample(): ReactElement {
  return (
    <Autocomplete
      label="Fruit"
      placeholder="Apple"
      listboxLabel="Fruits"
      options={fruits}
      disableClearButton
      disableDropdownButton
    />
  );
}
