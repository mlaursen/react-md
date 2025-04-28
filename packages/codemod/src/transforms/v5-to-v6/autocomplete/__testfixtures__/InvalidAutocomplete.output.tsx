// TODO: The `Autocomplete` no longer supports highlighting matches and must be added manually
// TODO: The `Autocomplete` no longer supports inline autocomplete behavior
// TODO: Ensure the `Autocomplete` options are strings or add the `getOptionLabel` prop
import { type ReactElement } from "react";
import { Autocomplete } from "react-md";

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
      <Autocomplete
        id="simple-autocomplete-3"
        label="Fuzzy filter"
        placeholder="Apple"
        options={fruits} />
      <Autocomplete
        id="simple-autocomplete-4"
        label="Fuzzy filter"
        placeholder="Apple"
        options={fruits} />
    </>
  );
}
