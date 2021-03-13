# @react-md/autocomplete

Create an accessible autocomplete component that allows a user to get real-time
suggestions as they type within an input. This component can also be hooked up
to a backend API that handles additional filtering or sorting.

## Installation

```sh
npm install --save @react-md/autocomplete
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/autocomplete/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

The `AutoComplete` component just requires:

- an `id` to identify the field (required for a11y)
- a list of `data` that can be a list of `string`, `number`, or `object`

However, it is recommended to also provide a `label` and `placeholder` text to
help the user understand this component.

```tsx
import React from "react";
import { AutoComplete } from "@react-md/autocomplete";

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

function Example() {
  return (
    <AutoComplete
      id="search-fruits"
      name="fruits"
      label="Fruits"
      placeholder="Kiwi..."
      data={fruits}
    />
  );
}
```
