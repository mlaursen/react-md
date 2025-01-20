"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { defaultAutocompleteFilter } from "@react-md/core/autocomplete/defaults";
import { type ReactElement } from "react";

import { fruits } from "@/constants/fruits.js";

export default function CreatableAutocompleteExample(): ReactElement {
  return (
    <Autocomplete
      label="Fruit"
      placeholder="Apple"
      listboxLabel="Fruits"
      options={fruits.map((fruit) => ({
        label: fruit,
        value: fruit,
      }))}
      filter={(options) => {
        const { list, extractor, query } = options;
        const filtered = defaultAutocompleteFilter(options);
        if (query && !list.some((option) => extractor(option) === query)) {
          return [
            ...filtered,
            {
              label: query,
              value: query,
              children: `Add: "${query}"`,
            },
          ];
        }

        return filtered;
      }}
    />
  );
}
