import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { noopAutocompleteFilter } from "@react-md/core/autocomplete/defaults";
import { type ReactElement } from "react";

import { fruits } from "@/constants/fruits.js";

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
