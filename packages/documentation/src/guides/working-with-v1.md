# Working with v1

##### Stop! If you are a first time user you **should completely ignore this page**. This guide is only intended for previous users of this library to help migrate their existing codebases over.

If you are a previous user of `react-md`, I would like to first apologize for
not making this backwards compatible or a bit easier to migrate. `react-md@v2`
ended up being a giant rewrite to be built using [Typescript] and [React hooks]
along with additional accessibility fixes so I couldn't think of a good way to
release this along with a nice migration.

That being said, this guide should help you slowly migrate over to `react-md@v2`
since the new styles have been prefixed with `rmd-` while `react-md@v1` will
still be `md-`.

## Installing react-md@v2

Until you've fully migrated over to `react-md@v2`, you'll need to use the
[scoped packages] instead of installing the convenience `react-md` package. Your
setup will use the `react-md@v1` while all the new components and styles will be
`@react-md/*`.

To get started, I'd recommend these following packages as they are the "base"
for `react-md`:

```sh
$ npm install --save @react-md/utils \
    @react-md/theme \
    @react-md/icon \
    @react-md/states \
    @react-md/typography \
    @react-md/layout
```

Or with `yarn`:

```sh
$ yarn add @react-md/utils \
    @react-md/theme \
    @react-md/icon \
    @react-md/states \
    @react-md/typography \
    @react-md/layout
```

From here, you'll want to do the normal [configuring your layout] setup to use
the `Configuration` component and optionally switch the `NavigationDrawer`
component from `react-md@v1` to the `Layout` component.

## The Pain Points

Unfortunately, I wrote `react-md@v1` early in my development career and applied
some global typography styles to general `<h1>` - `<h6>` elements as well as
some other elements. This "feature" can be removed by setting the
`$md-typography-extended` variable to `false`, but you might see some oddities
throughout your app where you didn't realize you relied on this "feature".

That being said, you **will** need to disable that "feature" to be able to work
with `react-md@v2` as well as including the styles slightly differently. This is
untested, but should be close to how you can use `react-md@v1` and `react-md@v2`
together.

First, do not use the `react-md-everything` mixin and instead manually include
the styles from `react-md@v1`:

```scss
$md-typography-extended: false;

@import "~react-md/src/scss/react-md";

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
```

Next, you'll want to import all the `mixins` from the `react-md@v2` scoped
packages and re-define your theme colors:

```scss
// this can be in the same file as above or just manually re-define these `$md-` prefixed
// variables
$rmd-theme-primary: $md-primary-color;
$rmd-theme-secondary: $md-secondary-color;
$rmd-theme-light: $md-light-theme;

// only include these if you don't like the new defaults
$rmd-theme-light-background: $md-light-theme-background-color;
$rmd-theme-dark-background: $md-dark-theme-background-color;

// import all the installed @react-md/* packages in your app:
@import "~@react-md/icon/dist/mixins";
@import "~@react-md/states/dist/mixins";
@import "~@react-md/theme/dist/mixins";
@import "~@react-md/typography/dist/mixins";
@import "~@react-md/utils/dist/mixins";

// this is kind of the new `react-md-everything`. it conditionally does `@include react-md-PACKAGE`
// for all the mixins that have been imported
@include react-md-utils;
```

> Once I get closer to the official release of v2, I will also do a minor update
> for v1 that might be able to automate some of this for you bye either enabling
> a new SCSS variable flag, or checking if any of the new `rmd-` prefixed
> mixins/variables exist. I would **love** if this is something someone else
> would pick up though and open a PR for so I can continue focusing on
> documentation for `react-md@v2`

This should _mostly_ solve it, but there still might be some weird looking
components from v1 that relied on my bad typography application before.

[typescript]: https://www.typescriptlang.org/
[react hooks]: https://reactjs.org/docs/hooks-intro.html
[scoped packages]: /guides/scoped-packages
[configuring your layout]: /guides/configuring-your-layout
