## Configuration

If you couldn't tell already, there are a lot of features and configuration
within `react-md` that require initializing
[React Context Providers](https://reactjs.org/docs/context.html#contextprovider).
Since it can be annoying to have to import all of these providers manually and
initialize them, the #layout package provides a nice `Configuration` component
that will initialize all of these for you with reasonable defaults that can be
overridden.

The `Configuration` component should normally be at the root of your app and
will throw an error if you have mounted it multiple times:

```tsx
import React from "react";
import { render } from "react-dom";
import { Configuration, ConfigurationProps } from "@react-md/layout";

import App from "./App";

// the ConfigurationProps are just all the props for the providers
// joined together. The only difference is that onResize has been
// renamed to onAppResize for the AppSizeListener
const overrides: ConfigurationProps = {
  // your configuration overrides
};

render(
  <Configuration {...overrides}>
    <App />
  </Configuration>,
  document.getElementById("root")
);
```

##### The included Providers

This component will initialize:

- `AppSizeListener` - see #utils
- `InteractionModeListener` - see #utils
- `StatesConfig` - see #states
- `NestedDialogContextProvider` - see #dialog
- `TooltipHoverModeConfig` - see #tooltip

The three most important Providers that are included are the `AppSizeListener`,
`InteractionModeListener` and `StatesConfig`. The `AppSizeListener` is in the
#utils package that helps determine how your app is being viewed based on media
queries. The `InteractionModeListener` also comes from the #utils package and
helps determine if your app is being interacted by touch, mouse, or keyboard to
customize the styles for that experience. Finally, the `StatesConfig` is the
general configuration for how different interactable elements gain different
states based on the interaction mode. This also globally controls the "ripple"
effect when elements are clicked so allows for a quick opt-out if you don't like
that effect.

## Creating a Layout

Once you've initialized your base `Configuration`, the next step is to create
your layout! This package also provides a pretty nice `Layout` component that
can help with this since it is a combination of the `AppBar`, `Sheet`, and
`Tree` packages with sensible defaults.

The layout will automatically change depending on the current app size and the
default behavior can be changed if desired. The default layout is:

- create a fixed header with the primary theme and try to render a title and
  additional actions
- create a navigation pane for all the routes in your app which can toggleable
  in a sheet on mobile or persistent on landscape tablets and desktops
- create a `<main>` element that automatically udpates it's position for the
  fixed `AppBar` and the persistent navigation pane when it exists.

##### Creating the navigation tree

The `Layout` component expects a prop named `navItems` which is an flat object
of all the routes in your app (see #tree for more details) and also provides a
`useLayoutNavigation` hook that handles the selection and expansion of tree
items for you. It is recommended to set up your `navItems` so that each
key/`itemId` is the route that the item should match. Once you've created your
tree, you can provide the current `pathname` from your favorite routing library
along with the nav items to the `useLayoutNavigation` hook and you'll be done!
Check out this small example to see how you can create a navigation tree using
[react-router](https://github.com/ReactTraining/react-router) as your routing
library.

<iframe
  class="iframe"
  src="https://codesandbox.io/embed/react-md-creating-a-layout-c1g8c?fontsize=14&runonclick=1"
  title="react-md - Creating a Layout"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin">
</iframe>
