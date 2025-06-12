"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { caseInsensitiveSearch } from "@react-md/core/searching/caseInsensitive";
import { HighlightText } from "@react-md/core/typography/HighlightText";
import { type ReactElement } from "react";

import { desserts } from "@/constants/desserts.js";

export default function HighlightsExample(): ReactElement {
  return (
    <Autocomplete
      label="Fruit"
      placeholder="Apple"
      listboxLabel="Fruits"
      options={desserts}
      filter={(options) => caseInsensitiveSearch(options)}
      getOptionProps={(options) => {
        const { option, query } = options;

        return {
          children: <HighlightText query={query}>{option.name}</HighlightText>,
        };
      }}
    />
  );
}
