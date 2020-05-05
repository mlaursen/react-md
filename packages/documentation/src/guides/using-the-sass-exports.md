## Using the Sass Exports

The naming conventions and export structure will be the same for the majority of
the packages within `react-md` and should follow this pattern (with a few
exceptions):

```sh
dist
├── _functions.scss
├── _mixins.scss
├── scss
│   ├── _functions.scss
│   ├── _mixins.scss
│   ├── styles.scss
│   └── _variables.scss
├── scssVariables.d.ts
├── scssVariables.js
├── styles.scss
└── _variables.scss
```

Every SCSS files in the root `dist` folder should be used when you are using
`webpack` as your build tool and bundler. If you are not using `webpack`, you
should import from the `dist/scss` folder instead. Please read over the
[including styles without webpack] for more info.

The only files that will generate styles once imported are the `styles.scss`. If
a file has been prefixed with an underscore (`_variables.scss` for example), it
provides the Sass data type from its name or some additional utilities without
generating any styles once imported. This allows for picking and choosing
`functions`, `mixins`, and `variables` from different `react-md` packages to be
used in your custom SCSS without side-effects.

Finally, the `dist/scssVariables.js` file will provide a record of all the
variables defined in `dist/_variables.scss` with their compiled default value so
it can be used within JavaScript and/or Typescript.

## General Naming Conventions

Every package will prefix the exports with `rmd-{{PACKAGE_NAME}}` for
namespacing issues since this was written before the new [module system was
launched]. The exceptions to this rule are some of the components within the
#form package. In addition, each package will use a
`@mixin react-md-{{PACKAGE_NAME}}` naming convention for the mixin that will
generate all the styles for that package. Here are a few examples:

- `$rmd-card-elevation`
- `$rmd-icon-size`
- `$rmd-label-font-size`
- `$rmd-text-field-active-color`
- `@function rmd-form-theme-var`
- `@function rmd-typography-theme-var`
- `@mixin rmd-utils-rtl`
- `@mixin rmd-theme-tone`
- `@mixin rmd-typography`
- `@mixin react-md-utils`
- `@mixin react-md-typography`

It is recommended to checkout the SassDoc page for each package for detailed
information about the sass exports and their usage:

#packages/sassdoc

## Color Palette

The color palette is available at `@react-md/theme/dist/color-palette` which
will only export all the colors available in `react-md` by default. If you'd
like to preview all these colors, check out the [Color Palette] page instead
since it also goes into details about how to use these colors and values in
JavaScript and Typescript.

## Accessibility Functions

The #theme package provides some accessibility `function`s to help automatically
fix color contrast ratios. Check out the [rmd-theme-tone] SassDoc for examples
and how they are used throughout `react-md`.

[color palette]: /colors-and-theming/color-palette
[including styles without webpack]: /guides/including-styles-without-webpack
[module system was launched]:
  https://sass-lang.com/blog/the-module-system-is-launched
[rmd-theme-tone]: /packages/theme/sassdoc#theme-function-rmd-theme-tone
