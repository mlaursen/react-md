## @react-md/theme

Create a theme for react-md.

- [Installation](#installation) - How to install this package and use the
  provided mixins
- [Defining a theme](#defining-a-theme) - Creating a theme for your application

### Installation

This package can be installed through `npm` if you want access to all the scss
variables, functions, and mixins or by using the pre-compiled bundles hosted on
[https://unpkg.com](https://unpkg.com).

#### With npm

```sh
$ npm install --save @react-md/theme
```

Please read the full
[installation guide](https://mlaursen.github.io/react-md/installation) for more
details on how to include this package in your app in different configurations
(such as `create-react-app`).

#### From [https://unpkg.com](https://unpkg.com)

If you just want import the pre-compiled css files into your project, you can
use the version that are hosted on [https://unpkg.com](https://unpkg.com) or
directly from the `node_modules` directory. All you need to do is update your
main `index.html` file to include a new `<link>` tag that points to the hosted
file.

For a development version that is unminified and includes a source map, you can
add the following `<link>` tag:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@react-md/theme/dist/theme.css"
/>
```

For a production version, use:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@react-md/theme/dist/theme.min.css"
/>
```

### Defining a theme

Starting with v2.0.0, react-md will use both scss and css variables to define
themes. This allows you to use the nice dynamic themes with css variables in
evergreen browsers but also support the older ones if needed.

The theme by default is:

- `$rmd-theme-primary: $rmd-purple-500 !default;`
- `$rmd-theme-secondary: $rmd-pink-a-400 !default;`
- `$rmd-theme-background: #fff !default;` // the default background color. This
  is normally applied to the <html> tag
- `$rmd-theme-surface: #fff !default;` // the background color to use for
  temporary material such as menus or dialogs.

This can be overridden by setting these variables to new colors that are
included in react-md, or a custom color by re-defining these values before
importing the main `theme` file.

#### With a material design color

If the theme colors are one of the material design colors, you can use some of
the existing scss variables to update your theme.

Example:

```scss
@import "@react-md/theme/dist/color-palette";

$rmd-theme-primary: $rmd-blue-500;
$rmd-theme-secondary: $rmd-orange-a-400;

@import "@react-md/theme/dist/theme";

@include react-md-theme;
```

Note that the theme variables were overridden **before** importing the main
`theme` file. You might have problems overriding the theme if you define them
after.

#### With any color

Since your company might have specific branding colors, it is also possible to
define a theme that does not have material design colors at all.

```scss
$my-awesome-company-purple: #9b59b6;
$my-awesome-company-orange: #e67e22;

$rmd-theme-primary: $my-awesome-company-purple;
$rmd-theme-secondary: $my-awesome-company-orange;

@import "@react-md/theme/dist/theme";

@include react-md-theme;
```

### Updating for a Dark theme

In the past version of react-md, the dark theme was enabled by setting a
`$md-light-theme` variable to `false`, now it is done by updating both the
`$rmd-theme-background` and `$rmd-theme-surface` variables.

So here is an example of enabling the same dark theme as before.

```scss
@import "@react-md/theme/dist/color-palette";

$rmd-theme-background: #303030;
$rmd-theme-surface: $md-grey-800;

@import "@react-md/theme/dist/theme";

@include react-md-theme;
```

### Recommended base project files

To make including custom styles easy, it is generally recommended to have the
following files in your project:

- `src/_branding.scss` - A file that contains the color variables for your
  company's branding
- `src/_react-md-overrides.scss` - A file that contains the react-md variable
  overrides with new values
- `src/_all.scss` - A file that is used as a quick import to include all
  available variables, mixins, and functions within any file in your app for
  convenience
- `src/index.scss` - A file that is used to generate your base styles

Example:

```scss
// in src/_branding.scss
$my-awesome-company-purple: #9b59b6;
$my-awesome-company-orange: #e67e22;
```

```scss
// in src/_react-md-overrides.scss
@import "branding";

$rmd-theme-primary: $my-awesome-company-purple;
$rmd-theme-secondary: $my-awesome-company-orange;
```

```scss
// in src/_all.scss
@import "my-awesome-company-branding";
@import "my-awesome-company-react-md-overrides";

@import "@react-md/theme/dist/theme";
```

```scss
// in src/index.scss
@import "all";

@include react-md-theme;
```
