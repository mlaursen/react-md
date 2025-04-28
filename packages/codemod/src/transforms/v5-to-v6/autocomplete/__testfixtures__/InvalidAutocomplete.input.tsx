import { type ReactElement } from "react";
import { AutoComplete } from "react-md";

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

export default function InvalidAutocomplete(): ReactElement {
  return (
    <>
      <AutoComplete
        id="simple-autocomplete-3"
        label="Fuzzy filter"
        placeholder="Apple"
        data={fruits}
        autoComplete="inline"
      />
      <AutoComplete
        id="simple-autocomplete-4"
        label="Fuzzy filter"
        placeholder="Apple"
        data={fruits}
        autoComplete="both"
        highlight
      />
    </>
  );
}
