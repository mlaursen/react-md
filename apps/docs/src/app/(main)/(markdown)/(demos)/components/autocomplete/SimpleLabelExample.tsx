"use client";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

const options = [
  { label: "Apple" },
  { label: "Apricot" },
  { label: "Banana" },
  { label: "Blueberry" },
  { label: "Cranberry" },
  { label: "Kiwi" },
  { label: "Mango" },
  { label: "Orange" },
  { label: "Peach" },
  { label: "Plum" },
  { label: "Strawberry" },
];

export default function SimpleLabelExample(): ReactElement {
  return (
    <Autocomplete
      label="Fruit"
      placeholder="Apple"
      menuLabel="Fruits"
      options={options}
    />
  );
}
