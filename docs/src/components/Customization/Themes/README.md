# Themes
The application should define a `primary` and `secondary` color. The `primary` color
should be chosen from one of the `'-500'` colors and the `secondary` should be one of
the `'a-'` colors.

The default color palette is defined as:

```scss
$md-primary-color: $md-indigo-500 !default;
$md-secondary-color: $md-pink-a-200 !default;
```

If you change these variables before the `react-md-everything` mixin is included, your entire
application will be styled with your new theme.

```scss
@import '~react-md/src/scss/react-md';

$md-primary-color: $md-teal-500;
$md-secondary-color: $md-lime-a-400;

@include react-md-everything;
```

### Updating/Modifying the Theme
There can be times where your application's theme will change depending on the current navigation.
To help with minimizing bundles and not having to recompile all the styles just for a new theme,
every themeable component has a mixin to update the colors. In addition, the new styles will only
be created if the new values do not match the global `$md-primary-color`, `$md-secondary-color`,
or `$md-light-theme` variables.

The a component that is themeable will have a mixin name `react-md-theme-COMPONENT`. For simplicity,
there is also a `react-md-theme-everything` mixin that can be used.

Example usage:

```scss
@import '~react-md/src/scss/react-md';

$md-primary-color: $md-teal-500;
$md-secondary-color: $md-lime-a-400;
@include react-md-everything;

// All the components will now be themed using teal and lime.
// Now we want a dark theme using the same colors

@include react-md-theme-everything(
  $md-primary-color,
  $md-secondary-color,
  false, // specifying dark-theme
  'dark-theme' // class name to wrap dark-theme styles in
);

// If you add the `dark-theme` class name to your `body` or `html` tags, your app will now
// be updated with the minimal amount of styles to theme to the dark theme.
```

#### Theme a Single Component
If all the components will not be used, and only a few should be updated with the new theme, you
can update them at a component level.

```scss
@import '~react-md/src/scss/react-md';

@include react-md-theme-colors($md-light-blue-500, $md-orange-a-200, false);
```
