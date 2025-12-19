"use client";

/* eslint-disable no-console */
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

import { fruits } from "@/constants/fruits.js";

export default function GettingTheCurrentInputValueExample(): ReactElement {
  return (
    <Autocomplete
      label="Fruit"
      placeholder="Apple"
      listboxLabel="Fruits"
      options={fruits}
      onChange={(event) => {
        // do something with the current value
        const { value } = event.currentTarget;
        console.log("value:", value);
      }}
    />
  );
}
