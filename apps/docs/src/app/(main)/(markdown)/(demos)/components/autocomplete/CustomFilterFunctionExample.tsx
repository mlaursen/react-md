"use client";
import { type State, states } from "@/constants/states.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { type AutocompleteFilterFunction } from "@react-md/core/autocomplete/types";
import { caseInsensitiveSearch } from "@react-md/core/searching/caseInsensitive";
import { fuzzySearch } from "@react-md/core/searching/fuzzy";
import { type ReactElement } from "react";

const NO_STARTS_WITH = false;

const filter: AutocompleteFilterFunction<State> = (options) => {
  // these are all provided
  // const { list, query, extractor } = options

  // The default filter behavior is to require each option to start with
  // the query to match, so here's an example allow matching anywhere
  if (NO_STARTS_WITH) {
    return caseInsensitiveSearch(options);
  }

  // this is about the same as the caseInsensitiveSearch, but the letters
  // do not need to appear next to each other to match
  return fuzzySearch(options);
};

export default function CustomFilterFunctionExample(): ReactElement {
  return (
    <Autocomplete
      label="State"
      options={states}
      listboxLabel="States"
      getOptionLabel={(state) => state.name}
      filter={filter}
    />
  );
}
