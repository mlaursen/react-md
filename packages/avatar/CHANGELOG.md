# v2.0.1

No changes.

# v2.0.0

The avatar component should be fairly similar to the v1 version except for a few
behavior changes.

## New Behavior and Features

- the `Avatar` is now rendered as a `<span>` instead of a `<div>`
- the `ref` is correctly forwarded to the `<span>` element
- the `children` no longer needs to be wrapped in an additional `<div>` for
  styling
- the `alt` tag will be defaulted to the empty string if the `src` tag is
  provided for convenience

## Breaking Changes

- no longer supports and `icon` prop since icons should just be rendered as the
  `children` for the `Avatar`
- no longer supports the `random` and `suffixes` props since it did not work for
  SSR
- the `suffix` prop was renamed to `color`
- the `iconSized` prop was removed since the new CSS variable theming API should
  be used instead
- the `contentStyle` and `contentClassName` props were removed since they are no
  longer required

### New SCSS Variables, Functions, and Mixins

- `$rmd-avatar-colors` - a map of all the colors to generate by default that
  have been updated to support minimal contrast ratio accessibility checks.
- `$rmd-avatar-font-size: 1.5rem !default` - the font size to apply to avatars
  when displaying text
- `$rmd-avatar-line-height: rmd-typography-value(subtitle-1, line-height) !default` -
  the line-height to apply to avatars when displaying text
- `@function rmd-avatar-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-avatar-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-avatar-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-avatar-theme-update-var` - updates one of the theme values as a
  css variable

### Renamed SCSS Variables, Functions, and Mixins

- renamed `$md-avatar-default-background` to `$rmd-avatar-background-color`
- renamed `$md-avatar-default-color` to `$rmd-avatar-color`
- renamed `$md-avatar-border-color` to `$rmd-avatar-border-color` and changed
  the default value from `null` to
  `rgba(if(rmd-theme-tone($rmd-theme-background) == light, $rmd-black-base, $rmd-white-base), 0.12)`
- renamed `$md-avatar-size` to `$rmd-avatar-size` and changed the default value
  from `40px` to `2.5rem`

### Removed SCSS Variables Placeholders, and Mixins

- `$md-avatar-icon-sized` was removed since it is no longer required
- removed `$md-avatar-include-suffixes` and `$md-avatar-colors` since the colors
  are now handled by the `$rmd-avatar-colors` variable
- removed `react-md-theme-avatars` and `react-md-theme-vatar` since they are no
  longer required
- removed `react-md-avatar-media` since avatars no longer automatically updated
  based on media queries and instead are updated through CSS Variables
