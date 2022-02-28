# @react-md/datetime

Do Stuff

## Installation

```sh
npm install --save @react-md/datetime
```

You'll also need to install either `date-fns` or `moment` as a dependency for
this library:

```sh
npm install --save date-fns
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/datetime/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { DateUtilsProvider, DateFnsUtils } from "@react-md/datetime";

import App from "./App";

ReactDOM.render(
  <DateUtilsProvider adapter={DateFnsUtils}>
    <App />
  </DateUtilsProvider>,
  document.getElementById("root")
);
```
