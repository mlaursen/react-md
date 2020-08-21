# @react-md/badge

A badge is a floating element that is normally fixed to another element to add
additional information. The biggest use-case for a badge is to show a count of
notifications.

## Installation

```sh
npm install --save @react-md/badge
```

If you would also like dynamic themes and general typography, it is recommended
to also install:

```sh
npm install --save @react-md/theme \
  @react-md/typography
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/badge/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

```tsx
import React from "react";
import { render } from "react-dom";
import { BadgedButton } from "@react-md/badge";

const App = () => <BadgedButton id="notifications">3</BadgedButton>;

render(<App />, document.getElementById("root"));
```
