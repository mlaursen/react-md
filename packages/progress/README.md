# @react-md/progress

Create accessible horizontal or vertical progress bars or circular progress
indicators that can either be deterministic or indeterministic.

## Installation

```sh
npm install --save @react-md/progress
```

It is also recommended to install the following packages for updating the
progress theme or transitions:

```sh
npm install --save @react-md/theme \
  @react-md/transition \
  @react-md/utils
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/progress/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

The majority of the time you'll be using the progress components to track some
long running task or initial page loading. For accessibility, you'll need to add
an `id` to the progress component as well as updating the main loading area to
have `aria-buys="true"` and `aria-describedby="PROGRESS_ID"`:

```tsx
import React from "react";
import { render } from "react-dom";
import { CircularProgress, LinearProgress } from "@react-md/progress";
import { useToggle } from "@react-md/utils";

const App = () => {
  const [loadingCircle, , stopLoadingCircle] = useToggle(true);
  const [loadingLinear, , stopLoadingLinear] = useToggle(true);

  useEffect(() => {
    let circleTimeout = window.setTimeout(() => {
      stopLoadingCircle();
      circleTimeout = undefined;
    }, 5000);

    let linearTimeout = window.setTimeout(() => {
      stopLoadingLinear();
      linearTimeout = undefined;
    }, 8000);

    return () => {
      window.clearTimeout(circleTimeout);
      window.clearTimeout(linearTimeout);
    };
  }, []);

  return (
    <>
      <div
        id="circle-content"
        aria-busy={loadingCircle || undefined}
        aria-describedby={loadingCircle ? "circular-progress" : undefined}
      >
        {loadingCircle && <CircularProgress id="circular-progress" />}
        {!loadingCircle && <Text type="headline-2">Hello from circle div</Text>}
      </div>
      <div
        id="linear-content"
        aria-busy={loadingLinear || undefined}
        aria-describedby={loadingCircle ? "circular-progress" : undefined}
      >
        {loadingLinear && <CircularProgress id="linear-progress" />}
        {!loadingLinear && <Text type="headline-2">Hello from linear div</Text>}
      </div>
    </>
  );
};

render(<App />, document.getElementById("root"));
```
