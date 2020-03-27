## Overriding Defaults

> Before reading this page, you must have first completed the documentation for
> #customizing-your-theme as this is an expansion upon those two pages to
> customize your theme.

One of the goals for `react-md` is to be able to start with reasonable default
styles that match the Material Design specifications but also expose a way to
modify these styles for unique branding and customization. Every package will
define their initial styles that you should be able to override the `react-md`
Sass variables with a new value. The biggest example of this is within the
#defining-a-theme documentation; it shows how you can modify the base theme
colors for your app. Every package will follow this same idea, so if you don't
like the default padding for buttons, the usage of the Roboto font family, ...
etc, you can override those variables with your preferred values.

#### Finding Variables

First, you will need to find the variable that you want to override. This can be
found by checking out the [theme builder] page which will attempt to include
_most_ of the customizable variables. Otherwise, you can search each package's
SassDoc page for all the variables available.

> I will eventually add search or a combined list somewhere when I get the time

#### Updating Values

Next, you will need to manually set your new values for each `rmd` variable you
want to override **before** you import any `react-md` styles other than the
color palette from the #theme package. So here's a quick example of changing a
few values.

> I recommend keeping a separate `_rmd-variable-overrides.scss` file so you can
> easily keep track of which default variables you have overridden. You can then
> import this in your "global" variables file so you have access to these values
> from any Sass file in your project.

First, create or update `src/_rmd-variable-overrides.scss`:

```scss
@import "~@react-md/theme/dist/color-palette";

$rmd-theme-light: false;
// I am bad at colors and chose 2 random ones from https://flatuicolors.com/palette/defo
// probably looks terrible so wouldn't recommend copying this example
$rmd-theme-primary: #3498db;
$rmd-theme-secondary: #d35400;

// make buttons bigger
$rmd-button-text-horizontal-padding: 1.5rem;
$rmd-button-text-border-radius: 0.25rem;
$rmd-button-text-height: 3rem;

// add more padding to the base list
$rmd-list-vertical-padding: 1rem;
$rmd-list-dense-vertical-padding: 0.75rem;

// make each list item a bit more dense
$rmd-list-item-height: 2.5rem;
$rmd-list-item-dense-height: 2rem;
$rmd-list-item-medium-height: 3rem;
$rmd-list-item-dense-medium-height: 2.75rem;
```

Next, import the `rmd-variable-overrides` file into your global variables file
`src/_variables.scss`:

```scss
@import "rmd-variable-overrides";
```

Finally, update the root styles to import the react-md packages and generate the
base styles:

```scss
@import "variables";

@import "~@react-md/button/dist/mixins";
@import "~@react-md/theme/dist/mixins";
@import "~@react-md/list/dist/mixins";
@import "~@react-md/utils/dist/mixins";

@include react-md-utils;
```

Now all your overrides will be used at **compile time** and can be used anywhere
in your app as needed.

### Where to next?

Now that you've updated your app with custom defaults, it might be good to check
out the [theme builder] page which will generate the custom theme variables for
you as well as live-preview your changes. Otherwise, you can look into the
[creating dynamic themes] documentation which will show how you can do **run
time** changes through CSS variables as well as accessing the scss variable
values in javascript/typescript.

[theme builder]: /colors-and-theming/theme-builder
[creating dynamic themes]: /colors-and-theming/creating-dynamic-themes
