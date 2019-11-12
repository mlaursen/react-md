# v2.0.0-alpha.0

## Breaking Changes

- all icons were updated to have `aria-hidden="true"` by default.

## Theming

One of the biggest new features in the v2 branch is that all theming can be done
with css variables for supported browsers. If you still need to support browsers
that don't support css variables yet, there are fallbacks in place but it'll
make dynamic theming changes a bit harder.

The new css variables and icon "theme" include:

- `--rmd-icon-color`
- `--rmd-icon-size`
- `--rmd-icon-dense-size`
- `--rmd-icon-text-spacing`
- `--rmd-icon-rotate-to`
- `--rmd-icon-rotate-from`

All of these default values are available from the new `$rmd-icon-theme-values`
map. There are also a few new helper functions/mixins to set and get these css
variable values:

Functions:

- `rmd-icon-theme`
- `rmd-icon-theme-var`

Mixins:

- `rmd-icon-theme`
- `rmd-icon-set-theme-var`

## Theme colors and different states

The `FontIcon` and `SVGIcon` do not support applying theme colors any more by
default. This list includes:

- primary
- secondary
- disabled
- error
- inherit

This will be changed in another alpha release once I decide how I want to apply
theme colors to components.

## Components

This package will export the following components:

- `FontIcon`
- `SVGIcon`
- `TextIconSpacing`
- `IconRotator`

The `FontIcon` and `SVGIcon` components should be almost the same as before,
just with updated class names and a few more features listed below. The
`TextIconSpacing` component is a remake of the `IconSeparator` while the
`IconRotator` is a simple component used to rotate an icon or any component from
a starting position to and ending position.

### TextIconSpacing

The biggest difference between this component and the old `IconSeparator` is
that the `label` prop was removed and an `icon` prop was added instead. The
`children` of this component will be treated as the `label` was before. If no
`icon` prop is provided, only the children will be rendered with no additional
changes.

If there is an `icon` prop, there will be 2 new behaviors:

1. If the `forceIconWrap` prop is not enabled (disabled by default), the spacing
   class names will be cloned into your provided icon element. If your icon
   element **does not** pass the `className` prop down, the spacing will not
   work.
2. If the `forceIconWrap` prop is enabled, the icon will be wrapped with a
   `<span>` element with the spacing class names applied instead.

Before this component was updated, the only way to work around the `className`
prop cloning was to provide a non-React element as an icon, but now you can use
the `forceIconWrap` prop to work around this.

The old `IconSeparator` component used to wrap the entire content in a `<div>`
with the `md-icon-separator` className while cloning the `md-icon-text` into the
label component (or wrapping the label with a `<span>` to add the class). Now,
the icon will gain either the `rmd-icon--before` or `rmd-icon--after` class name
and the returned html will be a `React.Fragment` containing the `children` and
`icon` instead of wrapping in a `<div>`.

The `iconBefore` prop was renamed to be `iconAfter` with a default value of
`false`. This means that it will default to having the icon **before** the text
instead of after.

Finally, the separator class names can now be configurable as 2 new props were
introduced:

- `beforeClassName`
- `afterClassName`

So now you can create custom spacing between any 2 elements if you need even
though it is recommended to update the `--rmd-icon-spacing` css variable
instead.

### IconRotator

With this release, I now have created a component for the `md-collapser`
(`getCollapserStyles`) that was used behind the scenes for a couple of
components such as the `CardExpander` and the `ListItem` with nested items.

This component has one simple job: animate a rotation from some degree to
another. By default, it will rotate from 0-180 degrees but this is configurable
at build time with the `$rmd-icon-rotator-from` and `$rmd-icon-rotator-to`
variables. Otherwise, you can dynamically change it throughout your app by
updating the created css variables to be different values. See the
`rmd-icon-set-theme-var` mixin and the theming section for more info.

## New `dense` prop

Added a new `dense` prop that will allow you to enable the dense mode for icons
in React instead of relying on media queries if it is easier that way. This prop
is added to both the `FontIcon` and `SVGIcon`. Using the prop will also make the
`forceSize` and `forceIconSize` props on the `FontIcon` component more reliable
if using the `react-md` defaults since it will not check the current
`--rmd-icon-size` css variable value at this time.

## Refs

The `FontIcon` and `SVGIcon` components will now forward their ref to the `<i>`
and `<svg>` elements.

## No more Prop Types

With my Typescript rewrite, I have removed the runtime prop validation with
`prop-types` for now since I have not figured out a nice way to get it to play
nicely with Typescript at this time. I will be adding it back before the final
v2 release.

## Other Notes

All the components in this package are now functional components instead of
using the `React.PureComponent`. If you somehow notice performance issues
because of this change, you can wrap them with
[React.memo](https://reactjs.org/docs/react-api.html#reactmemo) if you are using
`react@16.6.0+`

```jsx
import { FontIcon as FontIconMD, SVGIcon as SVGIconMD } from "@react-md/icon";

export const FontIcon = React.memo(FontIconMD);
export const SVGIcon = React.memo(SVGIconMD);
```
