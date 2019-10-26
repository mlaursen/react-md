# react-md

This is a convenience package that can be used to have a single entry point for
all the functionality within `react-md`. My personal preference is still to
install all the individual packages by themselves just so there is a bit of
separation of "concerns" and verbose about specific components and
functionality, but it is a bit annoying to have to install and update all these
packages individually.

Please see the main [documentation site](https://react-md.dev) for more
information, configuration, live demos, and documentation.

## Installation

```sh
$ npm install --save react-md
```

This _really_ is the same as:

```sh
$ npm install --save \
    @react-md/alert \
    @react-md/app-bar \
    @react-md/autocomplete \
    @react-md/avatar \
    @react-md/badge \
    @react-md/button \
    @react-md/card \
    @react-md/chip \
    @react-md/dialog \
    @react-md/divider \
    @react-md/elevation \
    @react-md/form \
    @react-md/icon \
    @react-md/layout \
    @react-md/link \
    @react-md/list \
    @react-md/material-icons \
    @react-md/media \
    @react-md/menu \
    @react-md/overlay \
    @react-md/portal \
    @react-md/progress \
    @react-md/sheet \
    @react-md/states \
    @react-md/table \
    @react-md/theme \
    @react-md/tooltip \
    @react-md/transition \
    @react-md/tree \
    @react-md/typography \
    @react-md/utils
```

## Including Styles

Unlike all the other individual packages, there is only a single SCSS import
that contains all the variables, functions, and mixins from all the other
packages:

```scss
@import "~react-md/dist/react-md";

// creates all the default styles
@include react-md-utils;
```

## Usage

All the components, hooks, utils, and types will be available from the root
`react-md` namespace:

```ts
import { Button, Text, Layout, Configuration } from "react-md";
```

If you installed the packages individually, it would be the same as:

```ts
import { Button } from "@react-md/button";
import { Layout, Configuration } from "@react-md/layout";
import { Text } from "@react-md/typography";
```

## Library Size

This is is the only package that actually generates "default" `.css` files for a
few themes as well as a UMD build. If you are interested in this library's size,
check out the `build` results:

```sh
$ yarn build --clean --umd --themes

The gzipped file sizes are:
- dist/css/react-md.indigo-pink-200-dark.min.css 65 B
- dist/css/react-md.indigo-pink-200-light.min.css 66 B
- dist/css/react-md.light_blue-deep_orange-200-light.min.css 74 B
- dist/css/react-md.light_blue-deep_orange-700-dark.min.css 75 B
- dist/css/react-md.purple-pink-200-dark.min.css 65 B
- dist/css/react-md.purple-pink-200-light.min.css 66 B
- dist/css/react-md.teal-pink-200-dark.min.css 63 B
- dist/css/react-md.teal-pink-200-light.min.css 64 B
- dist/umd/react-md.production.min.js 55 B
```
