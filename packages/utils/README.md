# @react-md/utils

This package is for providing reusable accessibility hooks, components, and
utilities, a base css reset and other utility mixins, as well as general layout
and app size components and hooks. This package will be used by every other
scoped package within `react-md`, and has an extremely useful mixin for only
generating styles for packages that have been installed.

Check out the usage section below for more details.

## Installation

```sh
npm install --save @react-md/utils
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/utils/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

The main export for this package will mainly be the exposed mixins which can be
included with the following import:

```scss
@import "~@react-md/utils/dist/mixins";

@include rmd-utils-base;

.custom-class {
  @include rmd-utils-rtl {
    margin-left: auto;
    margin-right: 1rem;
  }

  margin-left: 1rem;
}

.button {
  @include rmd-utils-hide-focus-outline;
}
```

### Usage with other packages

One of the great things about this package is that there is a mixin that will
automatically include all the react-md styles for packages you have included in
this file.

```scss
@import "~@react-md/app-bar/dist/mixins";
@import "~@react-md/avatar/dist/mixins";
@import "~@react-md/button/dist/mixins";
@import "~@react-md/elevation/dist/mixins";
@import "~@react-md/utils/dist/mixins";

@include react-md-utils;
```

The example above will automatically include the styles for the `app-bar`,
`avatar`, and `button` packages as well as the base styles utils styles.
