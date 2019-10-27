# About

This project's goal is to help create extremely customizable and fully
accessible React components matching the guidelines from https://www.w3.org
along with the [Material Design principals]. The main difference between this
library and [material-ui] is how the styles are provided. This library is
focused more towards developers that like [Sass] instead of CSS-in-JS solutions.

## I'd Like to Contribute!

That's great to hear! I've written up a decently thorough [contributing guide]
that should hopefully help you get started. It should outline:

- how to clone this repo and initialize the dev environment
- all the available scripts and `dev-utils` to help develop
- how the documentation site works and adding new demos
- general best practices

## What's the library size?

The base `react-md` package (non-scoped) is the only package that also provides
pre-built css themes and a UMD bundle. If you are interested in seeing what an
estimated size for this library, check out the results below:

```sh
$ yarn workspace react-md build --clean --umd --themes

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

## What are the supported browsers?

This library is targeted to support all evergreen browsers as well as browsers
that support [css variables]. This means there is **no IE 11 support** for
dynamic themes, but it should at least not crash in IE 11.

## Should I Choose This Library?

##### Probably not.

This library is maintained by one developer for free in their personal time.
There will be some points where this library won't be touched for weeks at a
time due to lack of interest or other reasons. If you are looking for a library
with quick releases, I would not recommend choosing this library and instead go
for something safer such as [material-ui].

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
