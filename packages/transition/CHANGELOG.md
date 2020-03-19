# v2.0.0

## New Behavior and Features

- The `Collapse` component will have a static transition time instead of being
  based on the size of the content
- The `Collapse` component now supports a `minHeight` to create a partially
  collapsed element
- Added two additional components for default transitions: `CrossFade` and
  `ScaleTransition`
- Added hook versions for all the collapse and cross fade transitions:
  - `useCollase`
  - `useCrossFade`
- Created hook versions of the `react-transition-group` package to handle custom
  transitions with `useTransition` and `useCSSTransition`
- Created a hook to be used with the `react-transition-group` package to fix an
  element to another element within the page. (Similar to the `Layover`
  component)

## Breaking Changes

- The `Collapse` component no longer uses [react-motion] and spring
  configuration.
- Removed the transition placeholders and the transition class names:
  - `%md-transition--sharp`
  - `%md-transition--standard`
  - `%md-transition--acceleration`
  - `%md-transition--deceleration`
  - `.md-transition--sharp`
  - `.md-transition--standard`
  - `.md-transition--acceleration`
  - `.md-transition--deceleration`

### New SCSS Variables, Functions, and Mixins

- `$rmd-transition-enter-time: 0.2s !default` - The duration for an enter
  transition used for most transitions
- `$rmd-transition-leave-time: 0.15s !default` - The duration for a leave
  transition used for most transitions
- `$rmd-collapse-enter-transition-func: deceleration !default` - A customizable
  variable for the collapse transition that can be one of: `sharp`, `standard`,
  `acceleration`, or `deceleration`
- `$rmd-collapse-leave-transition-func: acceleration !default` - A customizable
  variable for the collapse transition that can be one of: `sharp`, `standard`,
  `acceleration`, or `deceleration`
- `$rmd-transition-scale-enter-duration: $rmd-transition-enter-time !default` -
  The transition duration for the new scaling transition's entering phase.
- `$rmd-transition-scale-leave-duration: $rmd-transition-leave-time !default` -
  The transition duration for the new scaling transition leaving phase.
- `$rmd-transition-scale-y-enter-duration: $rmd-transition-enter-time !default` -
  The transition duration for the new vertical scaling transition's entering
  phase.
- `$rmd-transition-scale-y-leave-duration: $rmd-transition-leave-time !default` -
  The transition duration for the new vertical scaling transition leaving phase.
- `@mixin rmd-transition` - applies the correct transition/animation timing
  function from one of the supported transition types.
- `@mixin rmd-transition-shadow-transition` - adds a performant version of a
  `box-shadow` transition using a pseudo element and opacity changes.

### Renamed SCSS Variables, Functions, and Mixins

- `$md-transition-sharp` was renamed to `$rmd-transition-sharp`
- `$md-transition-standard` was renamed to `$rmd-transition-standard`
- `$md-transition-acceleration` was renamed to `$rmd-transition-acceleration`
- `$md-transition-deceleration` was renamed to `$rmd-transition-deceleration`
- `$md-transition-time` was renamed to `$rmd-transition-standard-time`
- `$md-cross-fade-transition-time` was renamed to
  `$rmd-cross-fade-transition-duration`
- `$md-cross-fade-distance` was renamed to `$rmd-cross-fade-translate-distance`
  and changed the default value from `16px` to `-1rem`

[react-motion]: https://www.npmjs.com/package/react-motion
