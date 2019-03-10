## @react-md/theme

This package is used for creating a color theme within react-md. It also exposes
some utility Components and mixins for updating the theme at runtime through CSS
Variables.

### Installation

This package can be installed through `npm` if you want access to all the SCSS
variables, functions, and mixins or by using the pre-compiled bundles hosted on
[https://unpkg.com](https://unpkg.com).

```sh
$ npm install --save @react-md/theme
```

### Including Styles

> If you have not done so already, please read the main documentation about
> #including-styles before continuing.

### Defining a theme

Starting with v2.0.0, react-md will use both SCSS and css variables to define
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
the existing SCSS variables to update your theme.

Example:

```scss
@import "@react-md/theme/dist/color-palette";

$rmd-theme-primary: $rmd-blue-500;
$rmd-theme-secondary: $rmd-orange-a-400;

@import "@react-md/theme/dist/mixins";

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

@import "@react-md/theme/dist/mixins";

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

@import "@react-md/theme/dist/mixins";

@include react-md-theme;
```

### Recommended base project files

To make including custom styles easy, it might be helpful to create the
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

@import "@react-md/theme/dist/mixins";
```

```scss
// in src/index.scss
@import "all";

@include react-md-theme;
```
