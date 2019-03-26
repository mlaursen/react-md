# @react-md/wia-aria

This package's main goal is to create a reusable API for keyboard navigation and
focus. In addition, it will create the base functionality following the
[Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
patterns for accessible web applications. It should hopefully not always require
`react-md` for these widgets as they will all be unstyled and only manage the
focus abilities as a low-level API.

This will be accomplished by following the guidelines outlined in the
[Developing a Keyboard Interface](https://www.w3.org/TR/wai-aria-practices/#keyboard)
from [https://w3.org](https://w3.org).

## Installation

```sh
$ npm install --save @react-md/wia-aria
```

Unlike the majority of the packages in `react-md`, this package **does not**
export any styles and is just used for basic accessibility utils to be used in
different components.

## KeyboardTracker

This is the main component export for this package. This should be included
somewhere near the root of your React render tree to ensure that keyboard focus
can be tracked in your app and there _should_ probably only be one
`KeyboardTracker` defined per app. This component will automatically update the
keyboard tracker context as needed and is used by most of the hooks provided.

Example usage:

```ts
import React from "react";
import { render } from "react-dom";
import { KeyboardTracker } from "@react-md/wia-aria";

import App from "./App";

render(
  <KeyboardTracker>
    <App />
  </KeyboardTracker>,
  document.getElementById("root")
);
```

## Hooks

### Utility Hooks

#### `useKeyboardFocusContext`

#### `useKeyboardFocused`

#### `useKeyboardFocusedClassName`

#### `useKeyboardFocusEventHandler`

#### `usePreviousFocus`

#### `useResetValueTimeout`

#### `useScrollLock`

#### `useSearchEventHandler`
