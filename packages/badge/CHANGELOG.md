# v2.0.0-alpha.0

The badge was complete re-written for this release, so there are a lot of
breaking changes.

## Breaking Changes

- The `Badge` component is now a low-level component that requires additional
  wrappers to work
- the `max` prop no longer exists and the `Badge` will no longer automatically
  change a number greater than a specific threshold into `${max}+`
- `component` prop was removed so the `Badge` can only be rendered as a `<span>`
- the `primary`, `secondary`, and `default` props were removed in favor of the
  new `theme` prop
- the `circular` prop was removed since badges will always be rendered as a
  circle now
- `invisibleOnZero` was renamed to `disableNullOnZero`
- the multiple `"default"` themes were removed and there is only one `"default"`
  theme now
- the badge will no longer be offset from the parent element by default

## New Components

This release has introduced two additional components: `BadgeContainer` and
`BadgedButton`. The `BadgedButton` is the closest thing to the old `Badge`
component but it always renders as a `Button` instead. The `BadgeContainer` is a
small wrapper component to add basic styles to allow a `Badge` to be positioned
relative to another component.

## New Features

The `Badge` will now automatically swap sides when the language direction
changes to `rtl` without any additional styling needed. The positioning can now
be updated with css variables as well to help quickly adjust the positioning of
a badge as needed. You can also use css variables to adjust the following
styles:

- `background-color` for the `"default"` theme
- `color` for the `"default"` theme
- `font-size` for the badge's text
- `border-radius` since the badge is always circular
- `size` height and width of the badge as one variable
