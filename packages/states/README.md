# @react-md/states

This package is used to create different interaction states for when a user is
touching, hovering, pressing, or keyboard focusing an element on the page. There
are also some mixins and styles that allow you to apply styles only while the
user is in "touch", "mouse", or "keyboard" mode so you can finally get that
amazing keyboard focus only effect going on.

## Installation

```sh
npm install --save @react-md/states
```

It is also recommended to install the following packages:

```sh
npm install --save @react-md/theme \
  @react-md/typography \
  @react-md/utils
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/states/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

This package has two main exports: `StatesConfig` and `useInteractionStates`.

### StatesConfig

This component is used to apply global configuration for how your user
interactions should work as well as determining the user input mode for your
app. There should only be _one_ `StatesConfig` component defined in your app at
a time and it should probably be somewhere near the root of your React render
tree since this component will modify the base `document.body` element with a
different `className` to help determine the current interaction mode.

```tsx
import React from "react";
import { render } from "react-dom";
import { StatesConfig } from "@react-md/states";

import App from "./App";

const Root = () => (
  <StatesConfig>
    <App />
  </StatesConfig>
);

render(<Root />, document.getElementById("root"));
```

Since some people do not actually like the ripple effect from material design,
you can also configure the `StatesConfig` to remove the ripples altogether and
fallback to the default "pressed" states which will just change background color
temporarily instead.

```tsx
import React from "react";
import { render } from "react-dom";
import { StatesConfig } from "@react-md/states";

import App from "./App";

const Root = () => (
  <StatesConfig disableRipple>
    <App />
  </StatesConfig>
);

render(<Root />, document.getElementById("root"));
```

### useInteractionStates

This is a hook that will allow you to connect to the current `StatesConfig` and
apply the different interaction states for an element. This hook will always
return an object containing:

- `ripples` - `ReactNode` of the ripples when enabled or `null` when ripples are
  disabled
- `className` - A merged `className` if using the pressed fallback state when
  ripples are disabled
- `handlers` - An object containing all the event handlers that must be applied
  to the DOM element so all the interaction states can happen.

```tsx
import React, { HTMLAttributes, ReactElement } from "react";
import { render } from "react-dom";
import {
  StatesConfig,
  userInteractionStates,
  InteractionStatesOptions,
} from "@react-md/states";

type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  InteractionStatesOptions<HTMLButtonElement>;
function Button({
  className: propClassName,
  disabled,
  disableRipple,
  disableProgrammaticRipple,
  disableSpacebarClick,
  disablePressedFallback,
  children,
  ...propHandlers
}: ButtonProps): ReactElement {
  const { ripples, handlers, className } = useInteractionStates({
    handlers: propHandlers,
    className: propClassName,
    disabled: disabled,
    disableRipple,
    disableProgrammaticRipple,
    disableSpacebarClick,
    disablePressedFallback,
  });

  return (
    <button type="button" className={className} {...handlers}>
      {children}
      {ripples}
    </button>
  );
}

function App(): ReactElement {
  return (
    <>
      <Button>Button 1</Button>
      <Button disableRipple>Button 2</Button>
      <Button disableRipple disablePressedFallback>
        Button 3
      </Button>
    </>
  );
}

render(<App />, document.getElementById("root"));
```
