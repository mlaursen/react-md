## @react-md/portal

The Portal component is a simple wrapper with React's `createPortal` API that
will automatically generate portal nodes behind the scenes as needed. Unlike the
majority of `react-md` packages, this package does not export any styles.

### Installation

```sh
$ npm install --save @react-md/portal
```

### Including Styles

> If you have not done so already, please read the main documentation about
> #including-styles before continuing.

### Usage

The main purpose of the `Portal` is to be able to fix overflow issues for fixed
elements within the page. If you have `overflow` set to anything other than the
default value, fixed elements might not appear correctly. To work around this,
you can portal that fixed element to a different part of the page and it'll fix
the problem. If none of this makes sense to you at a first glance, you probably
don't need this package.

The example below will just show the API for the portal and not a real world
example.

```tsx
import React, { useState } from "react";
import { render } from "react-dom";
import { Portal } from "@react-md/portal";

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <button
        id="example-button"
        type="button"
        onClick={() => setVisible(prevVisible => !prevVisible)}
      >
        Show Portal
      </button>
      <Portal visible={visible}>
        <h3>
          This is some portalled text that will only appear when{" "}
          <code>visible</code>
        </h3>
      </Portal>
    </Fragment>
  );
};

render(<App />, document.getElementById("root"));
```
