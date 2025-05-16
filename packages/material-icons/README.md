# @react-md/material-icons

This package converts each [material icon](https://fonts.google.com/icons?icon.set=Material+Icons) into a `React` component as inline SVG icons.

## Documentation

Check out the [documentation site] to see all the available icons and in-depth usage.

## Installation

With [npm]:

```sh
npm install --save @react-md/core @react-md/material-icons
```

With [pnpm]:

```sh
pnpm add @react-md/core @react-md/material-icons
```

With [yarn]:

```sh
yarn add @react-md/core @react-md/material-icons
```

## Add base styles

If you only want to use the icons in this package without the rest of `react-md`:

```scss
@use "@react-md/core" with (
  $icon-disable-font: true,
  $icon-disable-symbol: true,
  $icon-disable-inline: true,
  $icon-disable-spacing-before: true,
  $icon-disable-spacing-after: true,
  $icon-disable-spacing-above: true,
  $icon-disable-spacing-below: true,
  $icon-disable-primary-color: true,
  $icon-disable-secondary-color: true,
  $icon-disable-warning-color: true,
  $icon-disable-error-color: true,
  $icon-disable-success-color: true,
  $icon-disable-text-primary-color: true,
  $icon-disable-text-secondary-color: true,
  $icon-disable-text-hint-color: true,
  $icon-disable-text-disabled-color: true,
  $icon-disable-dense: true,
  $icon-disable-rotator: true,
  $disable-default-system-theme: true
);

@include core.icon-styles;
```

If you are using `react-md` already and only want to use the SVG icons in this package:

```scss
@use "@react-md/core" with (
  $icon-disable-font: true,
  $icon-disable-symbol: true
);

@include core.styles;
```

## Use the icon components

The [documentation site] will allow you to search and find all the available icons, but here's a quick example.

```tsx
import FavoriteOutlinedIcon from "@react-md/material-icons/FavoriteOutlinedIcon";

function Example() {
  return <FavoriteOutlinedIcon />;
}
```

[documentation site]: https://react-md.dev/material-icons-and-symbols
