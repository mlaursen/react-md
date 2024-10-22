"use client";
import { desserts, type Dessert } from "@/constants/desserts.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { useState, type ReactElement } from "react";

export default function MultipleValuesExample(): ReactElement {
  const [value, setValue] = useState<readonly Dessert[]>([]);
  return (
    <>
      <Autocomplete
        label="Dessert"
        placeholder="Ice cream"
        value={value}
        setValue={setValue}
        listboxLabel="Desserts"
        options={desserts}
        getOptionLabel={(dessert) => dessert.name}
      />
    </>
  );
}
