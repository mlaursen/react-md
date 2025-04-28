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

export default function CustomFilterFunction(): ReactElement {
  return (
    <>
      <AutoComplete
        id="simple-autocomplete-1"
        label="Case insensitive"
        placeholder="Apple"
        data={fruits}
        filter={(query, data, options) => {
          return data
        }}
      />
    </>
  );
}

