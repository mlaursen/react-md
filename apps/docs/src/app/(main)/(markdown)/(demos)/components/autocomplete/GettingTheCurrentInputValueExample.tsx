/* eslint-disable no-console */
"use client";
import { fruits } from "@/constants/fruits.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement } from "react";

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
        console.log("value: ", value);
      }}
    />
  );
}
