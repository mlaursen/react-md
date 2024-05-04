"use client";
import { fruits } from "@/constants/fruits.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  return (
    <Autocomplete
      label="Fruit"
      placeholder="Apple"
      menuLabel="Fruits"
      options={fruits}
    />
  );
}
