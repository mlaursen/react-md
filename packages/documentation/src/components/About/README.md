# About

This project's goal is to help create extremely customizable and fully
accessible React components matching the guidelines from https://www.w3.org
along with the [Material Design principals]. The main difference between this
library and [material-ui] is how the styles are provided. This library is
focused more towards developers that like [Sass] instead of CSS-in-JS solutions.

Before choosing this library, please note that this project is maintained by a
single developer as a side project. This means that new releases and bugfixes
will be fairly slow.

## What's the library size?

The base `react-md` package (non-scoped) is the only package that also provides
pre-built css themes and a UMD bundle. If you are interested in seeing what an
estimated size for this library, check out the results below:

```sh
$ yarn dev-utils libsize

The gzipped UMD bundle size is:
 - dist/umd/react-md.production.min.js 55 B

The min and max gzipped CSS bundle sizes are:
 - dist/css/react-md.red-lime-100-light.min.css 61 B
 - dist/css/react-md.deep_orange-blue_grey-100-light.min.css 76 B
```

## What are the supported browsers?

This library is targeted to support all evergreen browsers as well as browsers
that support [css variables]. This means there is **no IE 11 support** for
dynamic themes, but it should at least not crash in IE 11.

## Where do I go from here?

If you'd still like to use this library even with the warnings above, I'd
recommend starting by looking through the demos for all the packages to see what
type of components are available:

#packages/demos

From there, it would be good to go through some of the guides:

- [Installation]
- [Creating a New App]
- [Customizing Your Theme]
- [Using the Sass Exports]

[material design principals]: https://material.io/design/
[material-ui]: https://material-ui.com
[sass]: https://sass-lang.com
[css variables]: https://caniuse.com/#feat=css-variables
[contributing guide]:
  https://github.com/mlaursen/react-md/tree/next/.github/CONTRIBUTING.md
[installation]: /guides/installation
[creating a new app]: /guides/creating-a-new-app
[customizing your theme]: /guides/customizing-your-theme
[using the sass exports]: /guides/using-the-sass-exports
