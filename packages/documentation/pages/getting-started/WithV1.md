## With v1 of react-md

Since it might take awhile for me to fully release v2 of react-md and migrating
will most likely take awhile for apps, I have tried to make it so that v1 and v2
can work together during this process. To help with namespacing conflicts, v2 of
`react-md` will prefix every CSS class and any SCSS mixin, variable, or function
with `rmd` while v1 is using `md` so you should be able to use them together
without _too_ many problems.

### Installing New Packages

Since v2 is using scoped packages, you'll need to start by installing some of
the new packages. I recommend starting with the following base packages and
adding more as you see fit:

- #states
- #theme
- #typography
- #utils

Now that you have installed these packages, you'll want to update the root of
your app to use the new `StatesConfig` component so that the new interaction
states work:

```diff
 import React from "react";
 import { render } from "react-dom";
+import { StatesConfig } from "@react-md/states";

 import App from "./App";

-render(<App /> , document.getElementById("root"));
+render(
+  <StatesConfig>
+    <App />
+  </StatesConfig>,
+  document.getElementById("root")
+);
```

> Check out the #states/demos page for more info about the `StatesConfig` and
> its usage.

### The Pain Points

In v1 of react-md, I did some bad things which is fixed in v2 with affecting the
global namespace for elements with typography. It is recommended to remove this
"feature" from v1 by updating your main SCSS imports/includes of `react-md` to
be be something like this:

```scss
$md-typography-extended: false;

@import "react-md/src/scss/react-md";

// instead of calling `@include react-md-everything`, make sure
// to include everything you need except for the
// `react-md-typography` mixin.
@include react-md-accessibility;
@include react-md-grid;
@include react-md-transitions;

@include react-md-autocompletes;
@include react-md-avatars;
@include react-md-badges;
@include react-md-bottom-navigations;
@include react-md-buttons;
@include react-md-cards;
@include react-md-chips;
@include react-md-collapsers;
@include react-md-data-tables;
@include react-md-dialogs;
@include react-md-dividers;
@include react-md-drawers;
@include react-md-expansion-panels;
@include react-md-file-inputs;
@include react-md-inks;
@include react-md-icons;
@include react-md-layovers;
@include react-md-lists;
@include react-md-media;
@include react-md-menus;
@include react-md-navigation-drawers;
@include react-md-overlays;
@include react-md-papers;
@include react-md-pickers;
@include react-md-progress;
@include react-md-select-fields;
@include react-md-selection-controls;
@include react-md-sliders;
@include react-md-subheaders;
@include react-md-snackbars;
@include react-md-tabs;
@include react-md-text-fields;
@include react-md-toolbars;
@include react-md-tooltips;

@include react-md-helpers-everything;
@include react-md-colors;

// Create a temporary mixin to create the old typography styles without
// the global namespace updates
@mixin migration-typography-react-md {
  $md-text-color: get-color("text", $md-light-theme);
  $md-secondary-text-color: get-color("secondary", $md-light-theme);
  $md-hint-text-color: get-color("hint", $md-light-theme);
  $md-disabled-text-color: get-color("disabled", $md-light-theme);

  %md-headline,
  %md-title,
  %md-subheading-2,
  %md-subheading-1,
  %md-body-2,
  %md-body-1 {
    color: $md-text-color;
  }

  %md-display-4,
  %md-display-3,
  %md-display-2,
  %md-display-1,
  %md-caption {
    color: $md-secondary-text-color;
  }

  .md-display-1 {
    @extend %md-display-1;
  }

  .md-display-2 {
    @extend %md-display-2;
  }

  .md-display-3 {
    @extend %md-display-3;
  }

  .md-display-4 {
    @extend %md-display-4;
  }

  .md-headline {
    @extend %md-headline;
  }

  .md-title {
    @extend %md-title;
  }

  .md-subheading-1 {
    @extend %md-subheading-1;
  }

  .md-subheading-2 {
    @extend %md-subheading-2;
  }

  .md-body-1 {
    @extend %md-body-1;
  }

  .md-body-2 {
    @extend %md-body-2;
  }

  .md-caption {
    @extend %md-caption;
  }

  @if $md-typography-include-utilities {
    @include react-md-typography-utilities;
  }

  @if $md-typography-include-text-container {
    @include react-md-typography-text-container;
  }
}

@include migration-typography-react-md;

//////////////////////////////////////////////////////////
// now start importing the v2 react-md styles and setting
// variables...
$rmd-theme-primary: $md-primary-color;
$rmd-theme-secondary: $md-secondary-color;
$rmd-theme-light: $md-light-theme;

// only include these if you don't like the new defaults
$rmd-theme-light-background: $md-light-theme-background-color;
$rmd-theme-dark-background: $md-dark-theme-background-color;

@import "@react-md/app-bar/dist/mixins";
@import "@react-md/avatar/dist/mixins";
@import "@react-md/button/dist/mixins";
@import "@react-md/divider/dist/mixins";
@import "@react-md/elevation/dist/mixins";
@import "@react-md/icon/dist/mixins";
@import "@react-md/list/dist/mixins";
@import "@react-md/list/dist/mixins";
@import "@react-md/media/dist/mixins";
@import "@react-md/overlay/dist/mixins";
@import "@react-md/sheet/dist/mixins";
@import "@react-md/states/dist/mixins";
@import "@react-md/theme/dist/mixins";
@import "@react-md/tooltip/dist/mixins";
@import "@react-md/transition/dist/mixins";
@import "@react-md/typography/dist/mixins";
@import "@react-md/utils/dist/mixins";

@include react-md-utils;
```

> Once I get closer to the official release of v2, I will also do a minor update
> for v1 that might be able to automate some of this for you bye either enabling
> a new SCSS variable flag, or checking if any of the new `rmd-` prefixed
> mixins/variables exist.

This should _mostly_ solve it, but there still might be some weird looking
components from v1 that relied on my bad typography application before.
