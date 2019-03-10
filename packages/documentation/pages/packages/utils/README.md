## @react-md/utils

This package is mostly for internal react-md work, but it also exposes a few
help SCSS mixins for handling right-to-left languages, fixing scroll momentum in
iOS, and custom focus styles.

### Installation

```sh
$ npm install --save @react-md/utils
```

### Usage

The main export for this package will mainly be the exposed mixins which can be
included with the following import:

```scss
@import "@react-md/utils/dist/mixins";

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

#### Usage with other packages

One of the great things about this package is that there is a mixin that will
automatically include all the react-md styles for packages you have included in
this file.

```scss
@import "@react-md/app-bar/dist/mixins";
@import "@react-md/avatar/dist/mixins";
@import "@react-md/button/dist/mixins";
@import "@react-md/elevation/dist/mixins";
@import "@react-md/utils/dist/mixins";

@include react-md-utils;
```

The example above will automatically include the styles for the `app-bar`,
`avatar`, and `button` packages as well as the base styles utils styles.
