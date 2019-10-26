# @react-md/alert

Create accessible alerts.

## Installation

```sh
$ npm install --save @react-md/alert
```

It is generally recommended to also install the following packages since they
work hand-in-hand with this package:

```sh
$ npm install --save @react-md/theme \
    @react-md/typography \
    @react-md/button
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/alert) for live examples and
more customization information, but an example usage is shown below.

<!-- DOCS_REMOVE_END -->

## Usage

`src/index.tsx`

```tsx
import React from "react";
import { render } from "react-dom";
import { MessageQueue } from "@react-md/alert";

import App from "./App";

render(
  <MessageQueue id="main-alerts">
    <App />
  </MessageQueue>,
  document.getElementById("root")
);
```

`src/App.tsx`

```tsx
import React, { FC } from "react";
import { useAddMessage } from "@react-md/alert";
import { Button } from "@react-md/button";

const App: FC = () => {
  const addMessage = useAddMessage();

  return (
    <Button
      id="button-1"
      onClick={() => addMessage({ children: "Example Message" })}
    >
      Show Message
    </Button>
  );
};

export default App;
```

### Typescript Types

All the useful types are exported from the root for convenience. The following
types might help self-describe how messages work:

- `Message`
- `ToastMessage`
