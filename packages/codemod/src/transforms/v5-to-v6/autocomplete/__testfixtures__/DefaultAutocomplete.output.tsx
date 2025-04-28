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

export default function DefaultAutocomplete(): ReactElement {
  return (
    <>
      <Autocomplete
        id="simple-autocomplete-1"
        label="Case insensitive"
        placeholder="Apple"
        options={fruits}
      />
    </>
  );
}
