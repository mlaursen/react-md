# v2.0.0

## New Behavior and Features

- all refs are now forwarded to the DOM elements
- new theme API that allows for customizing the size and color of icons a lot
  easier with exported `mixin`s
- built-in support for right-to-left languages when spacing text with icons
- added an `IconRotator` component to be able to animate a rotation for an icon
  > This is a new component implementation for the
  > `.md-collapser`/`getCollapserStyles` that existed in v1 but wasn't really
  > documented
- the `TextIconSpacing` component now requires a parent element with
  `display: flex` to work since it renders as a `<Fragment>` instead of a
  `<div>`
- the spacing is now handled with `margin` instead of `padding` with the
  `TextIconSpacing` component
- the icon is now placed before the `children` instead of after by default for
  the `TextIconSpacing` component
- added a new `forceIconWrap` prop to the `TextIconSpacing` component to help
  with custom components that don't accept a `className` prop being cloned in
  for the spacing styles
- added additional props to the `TextIconSpacing` for additional customization
  for the spacing behavior
- simplified svg style precedence to be easier to override (`.rmd-icon--svg`
  instead of `svg.md-icon`)
- changing the size for font icons and svg icons is now the same since they use
  css variables

## Breaking Changes

- all icons were updated to have `aria-hidden="true"` by default.
- all icons no longer support applying theme colors with the `primary`,
  `secondary`, `disabled`, `error`, and `inherit` props and requires custom css
  instead
- the `IconSeparator` has been renamed to `TextIconSpacing` and now renders the
  `children` as the `label` and requires an `icon` prop (the reverse of v1)
- the `SVGIcon` no longer has the `titleAttr`, `title`, and `desc` props since
  they aren't actually helpful with accessibility out of the box since
  `aria-label`/`aria-labelledby` is preferred
- the `SVGIcon` changed the default `role` from `"img"` to `"presentation"`

### New SCSS Variables, Functions, and Mixins

- `$rmd-icon-material-icons-font: false !default` - boolean if you are using the
  `material-icons` font icon library and automatically fix the dense spec
- `$rmd-icon-use-font-icons: true !default` - boolean if you want to include the
  styles for font icons. You can maybe save a few bytes by disabling this
  variable if you only use svg icons
- `$rmd-icon-use-svg-icons: true !default` - boolean if you want to include the
  styles for svg icons. You can maybe save a few bytes by disabling this
  variable if you only use font icons
- `@function rmd-icon-theme` - gets one of the icon's theme values
- `@function rmd-icon-theme-var` - gets one of the icon's theme values as a css
  variable
- `@mixin rmd-icon-theme` - applies one of the icon's theme values as a css
  property
- `@mixin rmd-icon-theme-update-var` - updates one of the icon's theme css
  variables
- `@mixin rmd-icon-text-spacing` - a mixin that allows you to separate two
  elements

### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-font-icon-include-dense` to `$rmd-icon-include-dense`
- renamed `$md-font-icon-size` to `$rmd-icon-size` and changed the default value
  from `24px` to `$1.5rem`
- renamed `$md-font-icon-dense-size` to `$rmd-icon-dense-size` and changed the
  default value from `20px` to `1.25rem`
- renamed `$md-font-icon-separator-padding` to `$rmd-icon-spacing-with-text` and
  changed the default value from `16px` to `0.5rem`
- renamed `@mixin react-md-icons-dense` to `rmd-icon-dense-theme`

### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-font-icon-include-separators` since it is always included by
  default
- removed `$md-font-icon-include-dense-material-icons` since it is no longer
  required
- removed `$md-font-icon-light-theme-disabled-color` and
  `$md-font-icon-dark-theme-disabled-color` since they are no longer required
- removed `@mixin react-md-theme-icons` since it is no longer required
- removed `@mixin react-md-icons-media` since it is no longer required
