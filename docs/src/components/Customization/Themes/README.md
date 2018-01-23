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

The component that is themeable will have a mixin name `react-md-theme-COMPONENT`. For simplicity,
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

Check out the [Theme Builder](/customization/theme-builder) for a real world example, live updates,
and some additional information about usage.

#### Theme a Single Component
If all the components will not be used, and only a few should be updated with the new theme, you
can update them at a component level.

```scss
@import '~react-md/src/scss/react-md';

@include react-md-theme-colors($md-light-blue-500, $md-orange-a-200, false);
```

### Creating a Theme without Material Design Colors
Even though there are a bunch of "amazing" colors available to you in react-md and material design, it
is sometimes helpful to be able to define custom colors and not use defined colors to get a unique branding
for your application. When you use a color that is not a part of material design, you will run _hopefully_ see
some Sass warnings about applying fallback colors. Follow the example below to understand these warnings
and how to fix it.

Let's say that your app prefers the [Flat UI Color Palette](https://flatuicolors.com/) over the material design
colors and would like to have a primary color of Belize Hole (#color-2980b9) and a secondary color of Wet Asphalt (#color-34495e).

```scss
// src/_variables.scss

// copy pasted from the flat ui color palette website
$turquoise: #1abc9c;
$green-sea: #16a085;
$sun-flower: #f1c40f;
$orange: #f39c12;
$emerald: #2ecc71;
$nephritis: #27ae60;
$carrot: #e67e22;
$pumpkin: #d35400;
$peter-river: #3498db;

// Start overriding react-md variables
$md-primary-color: $belize-hole;
$md-secondary-color: $wet-asphalt;

// When the primary or secondary colors are not part of material design, you will need to set
// some fallback colors for the the following components:
$md-data-table-contextual-fallback-color: rgba($wet-asphalt, .32);
$md-linear-progress-fallback-color: rgba($wet-asphalt, .54);
$md-switch-fallback-color: rgba($wet-asphalt, .87);

$md-slider-warn-md: false; // only need to set this if using the dark theme.
```

```scss
// src/_globals.scss
// import main variables and overrides, then import react-md
@import 'variables';
@import 'react-md/src/scss/react-md';

@include react-md-everything;
```

The reason the fallback colors need to be set is that it is "impossible" to get different swatches for the listed
components when it is not a material design color. If these variables aren't set, the components won't gain any
of the colors since the default value is `null`. If this doesn't really bother you, you can always set
`$md-colors-warn: false` in your overrides and no compilation errors or warnings will be displayed.


Here are the values that would normally be applied. To make things easier, let's pretend that a "normal" config
is using the theme of `$md-primary-color: $md-blue-500` and `$md-secondary-color: $md-purple-a-200`. 

```scss
$md-data-table-contextual-fallback-color: $md-purple-50;
$md-linear-progress-fallback-color: $md-purple-100;
$md-switch-ball-fallback-color: if($md-light-theme, $md-purple-500, $md-purple-200);
```

For some more information check out the following documentation:
- [$md-colors-warn-md](?tab=1#variable-md-colors-warn)
- [$md-data-table-contextual-fallback-color](?tab=1#variable-md-data-table-contextual-fallback-color)
- [$md-slider-warn-md](/components/sliders?tab=2#variable-md-slider-warn-md)
- [$md-linear-progress-fallback-color](?tab=1#variable-md-linear-progress-fallback-color)
- [$md-linear-progress-swatch](/components/progress/linear?tab=2#variable-md-linear-progress-swatch)
- [$md-switch-ball-fallback-color](?tab=1#variable-md-switch-ball-fallback-color)
- [get-swatch](/customization/colors?tab=1#function-get-swatch)
