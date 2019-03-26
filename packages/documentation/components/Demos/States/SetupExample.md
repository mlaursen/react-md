The `@react-md/states` package will probably not be used much from a developer
standpoint all the `react-md` components that are interactable will already hook
into this API. You'll really only need to use this package for initial state
configuration or if you want to make your own custom component since `react-md`
is lacking a feature you need.

Every app will want to import the `StatesConfig` component and initialize it
near the root of your app so that you can track the current "user interaction
mode" and apply styles as needed for that.

```ts
import React from "react";
import { render } from "react-dom";
import { StatesConfig } from "@react-md/states";

import App from "./App";

render(
  <StatesConfig>
    <App />
  </StatesConfig>,
  document.getElementById("root")
);
```

Since this isn't very exciting to see as a demo, I'll update it a little bit to
include a `Button` from `@react-md/button` to show the built in states. The
default state types are:

- keyboard focus only
- pressed via mouse, touch, or keyboard
- hover

The default pressed states will use the material design ripple effect, but this
can be disabled and different effects can be used instead. See the
[example below](#disabling-ripple-effect) for more info.
