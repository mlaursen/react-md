import { fruits } from "@/constants/fruits.js";
import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { noopAutocompleteFilter } from "@react-md/core/autocomplete/defaults";
import { type ReactElement } from "react";

export default function DisableFilteringExample(): ReactElement {
  return (
    <Autocomplete
      label="Fruit"
      placeholder="Apple"
      listboxLabel="Fruits"
      options={fruits}
      filter={noopAutocompleteFilter}
    />
  );
}
