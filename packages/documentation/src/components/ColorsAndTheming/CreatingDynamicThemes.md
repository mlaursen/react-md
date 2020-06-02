## Creating Dynamic Themes

Starting with `react-md@v2`, the majority of the packages now allow for
customizing colors and spacing with CSS variables with the new theme API. This
new theme API is **extremely powerful** and allows for a lot of additional
customization and configuration in your app since your theme can be configured
at a component-by-component basis or at runtime.

### The [@react-md/theme] API

The `@react-md/theme` package is slightly different than the other packages
since the naming convention will just be `$rmd-theme-values`,
`@function rmd-theme`, `@function rmd-theme-var`, `@mixin rmd-theme`, and
`@mixin rmd-theme-update-var`. The `@react-md/theme` package also has the most
available [theme values] since it handles:

- the general background colors
- theme colors (primary, secondary, warning, error, success)
- text colors (primary, secondary, disabled, help, icon)

You'll generally want to use the `@mixin rmd-theme` to apply one of these theme
values to the `background-color` or `color` property or the
`@mixin rmd-theme-update-var` to create a new theme for a component.

### Other packages' theme API

If a package supports the new theme API, the package will export:

- `$rmd-<packageName>-theme-values` - a `Sass` `Map` of all the themeable
  variables that also create css variables
- `@function rmd-<packageName>-theme` - a function to get a current theme value
- `@function rmd-<packageName>-theme-var` - a function get get a current theme
  value as a css variable
- `@mixin rmd-<packageName>-theme` - a mixin to apply one of the package's theme
  values as a css property
- `@mixin rmd-<packageName>-theme-update-var` - a mixin to update one of the
  package's theme values with a new value

### Examples and Usage within react-md

The new theme API is used extensively throughout the `react-md` code base to
create the themeable components along with different background colors based on
elevation as well as the dense theme. Lets start by looking at the
[rmd-list-dense-theme mixin]:

```scss
@mixin rmd-list-dense-theme {
  @include rmd-list-theme-update-var(
    font-size,
    rmd-list-theme-var(dense-font-size)
  );
  @include rmd-list-theme-update-var(
    vertical-padding,
    rmd-list-theme-var(dense-vertical-padding)
  );
  @include rmd-list-theme-update-var(
    horizontal-padding,
    rmd-list-theme-var(dense-horizontal-padding)
  );
}
```

This mixin should normally be applied at the `:root` selector (or `html`), but
can also be applied to any class you want to update the list to use the dense
spec.

```scss
:root {
  @include rmd-utils-desktop-media {
    @include rmd-list-dense-theme;
  }
}

// or with a class
.dense-theme {
  @include rmd-list-dense-theme;
}
```

Even though the `@mixin rmd-list-dense-theme` uses the `rmd-list-theme-var`
functions, it is not required and can be exchanged with any SCSS variable or
value.

```scss
@mixin rmd-list-dense-theme {
  @include rmd-list-theme-update-var(font-size, $rmd-list-dense-font-size);
  @include rmd-list-theme-update-var(
    vertical-padding,
    $rmd-list-dense-vertical-padding
  );
  @include rmd-list-theme-update-var(
    horizontal-padding,
    $rmd-list-dense-horizontal-padding
  );
}
```

The **big** difference between the two is that the second example will only be
configurable **compile time** instead of **run time**. If you want to allow your
user to define custom theme values or change the values on the fly, the first
example allows you to only update the dense CSS variables while the second
requires you to re-compile or call the mixin again with new values.

Another great example for CSS variable usage is the [@react-md/button] package.
The button modifies the [@react-md/icon] package's color along with with sizing
in the [@mixin rmd-button-icon].

### Documentation Site Usage

If you haven't already, I highly recommend checking out the [Theme Builder] page
and comparing to the [v1 Theme Builder]. Something that should hopefully stand
out immediately is that the v1 Theme Builder causes the screen to flash colors
while changing the theme while the current Theme Builder does not. This is due
to the fact that the theme is actually configured via css variables in v2 while
a new stylesheet must be requested and built from the documentation server in v1
to work.

The code for updating these variables is actually pretty simple as well:

```ts
type CSSVariableValue = string | number | null;
interface CSSVariable {
  name: string;
  value: CSSVariableValue;
}

const variables: CSSVariable[] = [
  {
    name: "--rmd-theme-primary",
    value: primaryColor,
  },
  {
    name: "--rmd-theme-secondary",
    value: secondaryColor,
  },
];

useEffect(() => {
  const { style } = document.documentElement;
  variables.forEach((variable) => {
    style.setProperty(variable.name, `${variable.value}`);
  });

  return () => {
    variables.forEach((variable) => {
      style.setProperty(variable.name, "");
    });
  };
}, [variables]);
```

> You can check out the full source code in the [Theme Builder GitHub folder] or
> specifically the [ThemeConfiguration.tsx] and [useThemeVariables.ts] files.

### Server Side Rendering with Saved Themes

The documentation site uses a combination of cookies and `localStorage` to be
able to save your theme as well as using the [React context API] to be able to
access the current theme. Cookies are used to help prevent the screen flash on
initial render while the `localStorage` is used as another backup in case
cookies are cleared (this **will** cause a screen flash though). Here's the
rendering steps:

- server checks the `req.cookies` for a `theme` value and defaults to `light` if
  omitted or not a valid value
- server renders the initial `<html>` with a `` className={`${theme}-theme`} ``
- client loads with initial `<html>`
- client checks if `localStorage` theme is different than server rendered theme
  - client updates theme if required
- user changes the theme by clicking the lightbulb button in the header
  - client sets or updates the theme cookie to the new value
  - client sets or updates the theme `localStorage` key to the new value

> Check out the [Theme github folder] for all the code that's used and
> additional information.

You can follow this same pattern for other theme variables such as the primary
and secondary colors as well. However, if you are only applying the light or
dark theme variable, it is actually recommended to follow the [Conditional Dark
Theme Guide] instead using the [prefers-color-scheme media query].

[theme values]: /packages/theme/sassdoc#theme-variable-rmd-theme-values
[@react-md/theme]: /packages/theme/demos
[@react-md/button]: /packages/button/demos
[theme builder]: /colors-and-theming/theme-builder
[v1 theme builder]: /v1/customization/theme-builder
[react context api]: https://reactjs.org/docs/context.html
[theme builder github folder]:
  https://github.com/mlaursen/react-md/tree/master/packages/documentation/src/components/ColorsAndTheming/ThemeBuilder
[themeconfiguration.tsx]:
  https://github.com/mlaursen/react-md/tree/master/packages/documentation/src/components/ColorsAndTheming/ThemeBuilder/ThemeConfiguration.tsx#L75
[usethemevariables.ts]:
  https://github.com/mlaursen/react-md/tree/master/packages/documentation/src/components/ColorsAndTheming/ThemeBuilder/useThemeVariables.ts
[theme github folder]:
  https://github.com/mlaursen/react-md/tree/master/packages/documentation/src/components/Theme
[conditional dark theme guide]:
  /guides/customizing-your-theme#conditional-dark-theme
[prefers-color-scheme media query]:
  https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[rmd-list-dense-theme mixin]:
  /packages/list/sassdoc#list-mixin-rmd-list-dense-theme
[@mixin rmd-button-icon]: /packages/button/sassdoc#button-mixin-rmd-button-icon
