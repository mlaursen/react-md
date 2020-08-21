# @react-md/overlay

Create overlays within your app to help the user focus on a temporary material
such as dialogs or drawers.

## Installation

```sh
npm install --save @react-md/overlay
```

Since this package isn't that helpful on its own, it is also recommended to
install the following packages:

```sh
npm install --save @react-md/theme \
  @react-md/button \
  @react-md/typography
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/overlay/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

```tsx
import React, { useState } from "react";
import { render } from "react-dom";
import { Overlay } from "@react-md/overlay";

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        id="example-button"
        type="button"
        onClick={() => setVisible((prevVisible) => !prevVisible)}
      >
        Show overlay
      </button>
      <Overlay
        id="example-overlay"
        onClick={() => setVisible(false)}
        visible={visible}
      />
    </>
  );
};

render(<App />, document.getElementById("root"));
```
