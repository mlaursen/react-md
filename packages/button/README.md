# @react-md/button

Create native buttons with multiple themes based on the material design
specifications including:

- clear, primary, secondary, warning, error, and default theme states
- text, icon, or text + icon with spacing
- flat, outlined, or contained

Also includes a `buttonThemeClassNames` function that can be used to apply a
button theme to _any_ component by generating the required `className` prop.

## Installation

```sh
$ npm install --save @react-md/button
```

If you would also like dynamic themes and icon support, it is recommended to
also install:

```sh
$ npm install --save @react-md/theme @react-md/typography @react-md/icon
```

## Usage and Documentation

Full usage and documentation can be found on the main documentation site at the
[buttons page](https://react-md.mlaursen.com/packages/buttons), but there will
be a few examples in this README.

Starting with v2 of `react-md`, all interactable elements require a unique `id`
to help ensure best practices, accessibility, and a way to track keyboard focus.
This might seem a bit annoying at first, but it will really help out in the long
run as it'll be very easy to find elements within the page and other debugging
purposes.

### Buttons with Text

```tsx
import React from "react";
import { render } from "react-dom";
import { Button } from "@react-md/button"

const App = () => (
  <Button id="button-1">Text Button</Button>
  <Button id="button-2" theme="primary" themeType="flat">
    Text Button
  </Button>
  <Button id="button-3" theme="secondary" themeType="raised">
    Text Button
  </Button>
  <Button id="button-4" theme="warning" themeType="contained">
    Text Button
  </Button>
  <Button id="button-5" theme="error">Text Button</Button>
  <Button id="button-6" theme="clear">Text Button</Button>
  <Button id="button-7" disabled>Text Button</Button>
);

render(<App />, document.getElementById("root"));
```

### Buttons with Text and Icons

Buttons can be rendered specifically as icon only buttons or as additional
support to the provided text. When rendering icons, you **must** also install
and use the `@react-md/icon` package to get icon support. You can also install
the `@react-md/material-icons` package if you'd like pre-built components for
every material icon that exists.

```tsx
import React from "react";
import { render } from "react-dom";
import { Button } from "@react-md/button"
import { TextIconSpacing, FontIcon } from "@react-md/icon";
import { DeleteSVGIcon } from "@react-md/material-icons";

const App = () => (
  <Button id="button-1">
    <TextIconSpacing icon={<FontIcon>info_outline</FontIcon>}>
      About
    </TextIconSpacing>
  </Button>
  <Button id="button-2" theme="primary" themeType="raised">
    <TextIconSpacing icon={<FontIcon>info_outline</FontIcon>} iconAfter>
      About
    </TextIconSpacing>
  </Button>
  <Button id="button-3" theme="error" themeType="contained">
    <TextIconSpacing icon={<DeleteSVGIcon />}>
      Permanently Delete
    </TextIconSpacing>
  </Button>
);

render(<App />, document.getElementById("root"));
```

If you have used `react-md` in the past, notice that there are no longer any
`icon` related props to handle this for you. It became difficult and confusing
to use when there were a lot of different icon positioning props, so the props
were removed and it is now expected to use the helper components in the
`@react-md/icon` package instead. If you find a reusable pattern within your
app, it is recommended to make your own `Button` wrapper component to implement
this for you.

### Buttons with Icons Only

It is also possible to create buttons that only contain icons as children. For
general accessibility, you should provide either an `aria-label` to provide a
label for the action of the button or use `aria-labelledby` to point to an `id`
of an element that provides a label for the button. This is really to help
screen readers and generally recommended, but there are no restrictions in place
at this time to enforce this behavior.

```tsx
import React from "react";
import { render } from "react-dom";
import { Button } from "@react-md/button"
import { TextIconSpacing, FontIcon } from "@react-md/icon";
import { DeleteSVGIcon } from "@react-md/material-icons";

const App = () => (
  <Button id="button-1" aria-label="More Info" buttonType="icon">
    <FontIcon>info_outline</FontIcon>
  </Button>
  <Button
    id="button-2"
    theme="primary"
    themeType="raised"
    buttonType="icon"
    aria-label="More Info"
  >
    <FontIcon>info_outline</FontIcon>
  </Button>
  <Button
    id="button-3"
    theme="error"
    themeType="contained"
    buttonType="icon"
    aria-label="Permanently Delete"
  >
    <DeleteSVGIcon />
  </Button>
);
```
