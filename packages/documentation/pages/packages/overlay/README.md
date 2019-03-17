## @react-md/overlay

Create overlays within your app to help the user focus on a temporary material
such as dialogs or drawers.

### Installation

```sh
$ npm install --save @react-md/overlay
```

Since this package isn't that helpful on its own, it is also recommended to
install the following packages:

```sh
$ npm install --save @react-md/theme \
    @react-md/button \
    @react-md/typography
```

### Including Styles

> If you have not done so already, please read the main documentation about
> #including-styles before continuing.

### Usage

```tsx
import React, { useState } from "react";
import { render } from "react-dom";
import { Overlay } from "@react-md/overlay";

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <button
        id="example-button"
        type="button"
        onClick={() => setVisible(prevVisible => !prevVisible)}
      >
        Show overlay
      </button>
      <Overlay
        id="example-overlay"
        onClick={() => setVisible(false)}
        visible={visible}
      />
    </Fragment>
  );
};

render(<App />, document.getElementById("root"));
```
