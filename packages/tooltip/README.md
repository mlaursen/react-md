# @react-md/tooltip

Create accessible tooltips to add additional descriptions to buttons, links, or
any other element. The tooltips will automatically attempt to position
themselves within the viewport and adjust as needed.

## Installation

```sh
npm install --save @react-md/tooltip
```

It is also recommended to install the following packages as they work
hand-in-hand with this package:

```sh
npm install --save @react-md/theme \
  @react-md/button
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/tooltip/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

```tsx
import React, { Fragment } from "react";
import { render } from "react-dom";
import { Button } from "@react-md/button";
import { Tooltipped } from "@react-md/tooltip";

const App = () => (
  <Tooltipped id="button-id" tooltip="I am a tooltip">
    <Button>Button Text</Button>
  </Tooltipped>
);

render(<App />, document.getElementById("root"));
```
