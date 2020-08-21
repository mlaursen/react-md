# @react-md/icon

Create icons using a font-icon library like material-icons or font-awesome or
plain old accessible SVG icons. There are also a few additional helpers to
creating animating rotating icons and separating text from an icon.

## Installation

```sh
npm install --save @react-md/icon
```

It is also recommended to install the other packages if you have not done so:

```sh
npm install --save @react-md/theme @react-md/typography
```

## Pre-made material icons

If you would like to have access to all material icons as existing components
instead of having to manually remember the correct `children` to provide or the
correct `path`, you can install the `@react-md/material-icons` package. This
will include **all** material icons as font and SVGs.

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/icon/demos) for live examples
and more customization information, but an example usage is shown below.

<!-- DOCS_REMOVE_END -->

## Usage

Even though the `FontIcon` and `SVGIcon` components are the "main" exports for
this package, they are more utility components and probably won't be used much
once you set up your own icon system. The _real_ exports are going to be the
`TextIconSpacing` and `IconRotator` components.

The `TextIconSpacing` component is used to add spacing between an icon and some
"text" where the text can be any renderable element. The `IconRotator` is used
to animate an icon rotation such as expander or collapse icons.

```tsx
import React from "react";
import { render } from "react-dom";
import { FontIcon, TextIconSpacing } from "@react-md/icon";
import { Text } from "@react-md/typography";

// the Text component is optional, it'll just add better typography
// than normal text.
const App = () => (
  <>
    // creates an icon spaced before the "Go Home" text
    <TextIconSpacing icon={<FontIcon>home</FontIcon>}>
      <Text>Go Home</Text>
    </TextIconSpacing>
    // creates an icon spaced after the "Go Home" text
    <TextIconSpacing icon={<FontIcon>home</FontIcon>} iconAfter>
      <Text>Go Home</Text>
    </TextIconSpacing>
    // it can also be combined
    <TextIconSpacing icon={<FontIcon>arrow_back</FontIcon>}>
      <TextIconSpacing icon={<FontIcon>home</FontIcon>} iconAfter>
        <Text>Go Home</Text>
      </TextIconSpacing>
    </TextIconSpacing>
  </>
);

render(<App />, document.getElementById("root"));
```

This package's icon component usage is really only helpful when generating icon
components through an external script or using font icons. However, here are a
few examples of using the `FontIcon` and `SVGIcon` components:

```tsx
import React from "react";
import { render } from "react-dom";
import { FontIcon, SVGIcon } from "@react-md/icon";

// When using font icons, you'll need to make sure they icon fonts have been
// correctly included in your app. Check out the documentation site for more
// info

const App = () => (
  <>
    <FontIcon>home</FontIcon>
    <FontIcon iconClassName="fa fa-github" aria-label="Github" />
    <SVGIcon title="Face">
      <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" />
    </SVGIcon>
  </>
);

render(<App />, document.getElementById("root"));
```
