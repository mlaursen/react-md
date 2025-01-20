"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type ReactElement, useState } from "react";

import { type Dessert, desserts } from "@/constants/desserts.js";

export default function MultiselectCheckboxesExample(): ReactElement {
  const [value, setValue] = useState<readonly Dessert[]>([]);
  return (
    <>
      <Autocomplete
        label="Dessert"
        placeholder="Ice cream"
        value={value}
        setValue={setValue}
        listboxLabel="Desserts"
        checkboxes
        options={desserts}
        getOptionLabel={(dessert) => dessert.name}
      />
    </>
  );
}
