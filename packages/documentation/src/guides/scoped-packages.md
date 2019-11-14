# Scoped Packages

In the simple [installation guide], you should have seen `react-md` being
installed as:

```sh
$ npm install --save react-md@next
```

Or with `yarn`:

```sh
$ yarn add react-md@next
```

However, once you start digging deeper into the rest of this documentation site
you'll start noticing all the code referencing packages like `@react-md/theme`,
`@react-md/layout`, and `@react-md/utils`. This is because the base `react-md`
package is really just a convenience package that combines all the exports of
the [scoped packages] together in one place. I personally prefer to use the
scoped packages just to be extremely verbose about where the component, hook, or
util came from, but you can continue using the single `react-md` package since
it is much more convenient.

As a quick reference, here are all the available packages within `react-md`:

#packages

## Installing a Scoped Package

Installing a scoped package is basically the same as installing the base
`react-md` package. Pick and choose which packages you want:

```sh
$ npm install --save @react-md/theme@next \
    @react-md/typography@next \
    @react-md/states@next \
    @react-md/layout@next
```

Or with `yarn`:

```sh
$ yarn add @react-md/theme@next \
    @react-md/utils@next \
    @react-md/typography@next \
    @react-md/states@next \
    @react-md/layout@next
```

## Including Styles from a Scoped Package

The big difference between the scoped packages and the base `react-md` package
is how the styles are exported. Most of the styleable scoped packages will have
the following files:

- `dist/_variables.scss` - All the `$rmd-` prefixed variables for the package.
- `dist/_functions.scss` - All the utility functions for the package.
- `dist/_mixins.scss` - All the mixins for the package.
- `dist/styles.scss` - A file that will automatically generate all the styles
  for the specific package when imported.

So to include the styles from a package, you'll want to import the `mixins` file
into your `.scss` file and use the `react-md-{{PACKAGE_NAME}}` mixin to generate
the styles:

```scss
@import "~@react-md/theme/dist/mixins";
@import "~@react-md/typography/dist/mixins";

@include react-md-theme;
@include react-md/typography;
```

Please read the [using the Sass exports] guide for more information about these
files and the exported functionality.

> The packages will also export the following scss files, but these should only
> be used if you aren't compiling styles in a `webpack` environment. Check out
> the [including styles without webpack] guide for more info about this.

- `dist/scss/_variables.scss`
- `dist/scss/_functions.scss`
- `dist/scss/_mixins.scss`
- `dist/scss/styles.scss`

[installation guide]: /guides/installation
[scoped packages]: https://docs.npmjs.com/misc/scope
[including styles without webpack]: /guides/including-styles-without-webpack
[using the sass exports]: /guides/using-the-sass-exports
