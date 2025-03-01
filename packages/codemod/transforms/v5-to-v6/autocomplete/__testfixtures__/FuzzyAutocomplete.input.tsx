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

export default function DefaultAutocomplete(): ReactElement {
  return (
    <>
      <AutoComplete
        id="simple-autocomplete-2"
        label="Fuzzy filter"
        placeholder="Apple"
        data={fruits}
        filter="fuzzy"
      />
    </>
  );
}
