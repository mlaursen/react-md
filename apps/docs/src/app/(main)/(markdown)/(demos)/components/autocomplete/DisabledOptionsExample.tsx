"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

import { desserts } from "@/constants/desserts.js";

export default function DisabledOptionsExample(): ReactElement {
  return (
    <Autocomplete
      label="Dessert"
      options={desserts.map((dessert, i) => ({
        ...dessert,
        disabled: i % 4 === 0,
      }))}
      // or try
      // getOptionProps={({ index, option }) => ({
      //   disabled: option.disabled || index % 4 === 0 || option.type === "Other",
      // })}
      getOptionLabel={(dessert) => dessert.name}
      listboxLabel="Desserts"
    />
  );
}
