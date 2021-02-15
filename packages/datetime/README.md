# @react-md/datetime

Create material design inspired date pickers, time pickers, and date+time
pickers.

## Installation

```sh
npm install --save @react-md/datetime
```

It is also recommended to install the other packages if you have not done so:

```sh
npm install --save @react-md/form \
  @react-md/theme \
  @react-md/typography \
  @react-md/utils
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/datetime/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

It is recommended to check out the documentation site for a better example, but
here's a simple one that you should really not copy:

```tsx
import React from "react";
import { render } from "react-dom";
import { TimeInput, TimePicker } from "@react-md/datetime";

function App(): ReactElement {
  return (
    <>
      <TimeInput />
      <TimePicker />
    </>
  );
}

render(<App />, document.getElementById("root"));
```
