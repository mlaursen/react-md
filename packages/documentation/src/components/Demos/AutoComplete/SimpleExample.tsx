import React, { FC } from "react";
import { AutoComplete } from "@react-md/autocomplete";

import ExampleGrid from "./ExampleGrid";

const fruits = [
  "Apple",
  "Apricot",
  "Banana",
  "Blueberry",
  "Cranberry",
  "Kiwi",
  "Peach",
  "Plum",
  "Strawberry",
];

const SimpleExample: FC = () => (
  <ExampleGrid>
    <AutoComplete
      id="simple-autocomplete-1"
      label="Case insensitive"
      placeholder="Apple"
      data={fruits}
    />
    <AutoComplete
      id="simple-autocomplete-2"
      label="Fuzzy filter"
      placeholder="Apple"
      data={fruits}
      filter="fuzzy"
    />
    <AutoComplete
      id="simple-autocomplete-3"
      label="Inline Autocomplete"
      placeholder="Apple"
      data={fruits}
      autoComplete="inline"
    />
    <AutoComplete
      id="simple-autocomplete-4"
      label="Both Autocomplete"
      placeholder="Apple"
      data={fruits}
      autoComplete="both"
      highlight
    />
  </ExampleGrid>
);

export default SimpleExample;
