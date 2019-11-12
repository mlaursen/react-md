# Customizing Your Theme

The default theme within `react-md` is something that I recommend changing as
soon as possible since I'm terrible at colors and just chose two random ones.

The default theme is:

- `$rmd-theme-light: true`
- `$rmd-theme-primary: $rmd-purple-500`
- `$rmd-theme-secondary: $rmd-pink-a-400`
- `$rmd-theme-warning: $rmd-deep-orange-a-200`
- `$rmd-theme-error: $rmd-red-500`
- `$rmd-theme-success: $rmd-green-a-700`
- `$rmd-theme-light-background: #fafafa`
- `$rmd-theme-light-surface: #fff`
- `$rmd-theme-dark-background: #303030`
- `$rmd-theme-dark-surface: $rmd-grey-800`

To change your default theme, you'll want to define these variables before the
main `react-md` import in your base `.scss` file. My general recommendation is
to create a `_variables.scss` file that can be imported into any of your other
`.scss` files for your general theme and overrides:

`src/_variables.scss`

```scss
@import "~@react-md/theme/dist/color-palette";

$rmd-theme-primary: $rmd-teal-500;
$rmd-theme-secondary: $rmd-deep-orange-a-400;
```

`src/index.scss`

```scss
@import "./variables";
@import "~react-md/dist/react-md";

@include react-md-utils;
```

This will now generate the default styles to use the updated teal and
deep-orange colors throughout the app.

## Creating a Dark Theme

### Global Dark Theme

Implementing a dark theme for your app is as simple as changing the
`$rmd-theme-light` variable to be `false` if it should be applied to your entire
app.

`src/_variables.scss`

```scss
@import "~@react-md/theme/dist/color-palette";

$rmd-theme-light: false;
$rmd-theme-primary: $rmd-teal-500;
$rmd-theme-secondary: $rmd-deep-orange-a-400;
```

`src/index.scss`

```scss
@import "./variables";
@import "~react-md/dist/react-md";

@include react-md-utils;
```

All your colors should now automatically be updated to support a dark theme!

> `react-md` will also **try** to ensure proper contrast ratio for colors with
> the `rmd-theme-tone` util behind the scenes so there's even less updating for
> you to do. However, this isn't 100% fool-proof, so it might be good to
> manually verify in some cases if you changed different theme colors.

### Conditional Dark Theme

What if you want to only include the dark theme when a specific class has been
toggled (like this documentation site) or only if the user has enabled the dark
theme in their OS? Luckily, `react-md` provides `rmd-theme-light` and
`rmd-theme-dark` mixins that will do that for you! If you have the
`$rmd-theme-light` left as the default `true`, use the `rmd-theme-dark` mixin to
conditionally apply the dark theme.

```scss
@import "~react-md/dist/react-md";

@media (prefers-color-scheme: dark) {
  @include rmd-theme-dark;
}

@media (prefers-color-scheme: light) {
  @include rmd-theme-light;
}

.dark-theme {
  @include rmd-theme-dark;
}

.light-theme {
  @include rmd-theme-light;
}
```

> See the
> [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
> media query for more details.
