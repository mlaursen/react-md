# v2.0.0-alpha.0

The main changes with this release is that the `Button` component can be
rendered without any additional props applied. Theming was changed as well as
there are a lot more theme props available and the new outline spec has been
implemented. Another small change is that the `AccessibleFakeButton` component
was renamed to `FakeButton` and the accessibility was
[fixed a bit](#fixed-fake-button-accessibility).

## Breaking changes

- updated the ref to be forwarded on to the `<button>` element
- removed the `component` and `href` props
- removed the `primary`, `secondary`, `flat`, `raised`, `floating`,
  `swapTheming`, and `icon` theme props
- removed the `fixed`, `fixedPosition`, and `mini` props
- removed the `tooltipLabel`, `tooltipDelay`, and `tooltipPosition` props
- removed the `iconClassName`, `iconChildren`, `iconEl`, `forceIconSize`,
  `forceIconFontSize`, and `svg` props
- removed built-in support for rendering icons

## Rendering non-button components and elements

This release "simplified" the button component as now it can only be rendered as
a `<button>`. There is no longer support to render as a link (when the `href`)
prop was provided or the provided `component` prop to be able to render as any
React Component. Instead, there is now an exported `theme` function that can be
used instead to apply a button theme to any other component with the generated
class names.

## Theming

The theme has been updated along with the default props so now you can render a
`Button` without provided any props and it will render without any warnings and
with general button styles. This is possible since the theming props were moved
into:

- `theme`
- `themeType`
- `buttonType`

### `theme`

Using the new `theme` prop is a replacement the `primary` and `secondary` props,
but also includes 3 additional themes. The supported values are:

- `clear`
- `primary` (default)
- `secondary`
- `warning`
- `error`

### `themeType`

Using the new `themeType` prop is a replacement for the `raised`, `flat`, and
`floating` props. The supported values are:

- `flat` (default)
- `outline`
- `contained` - this is a rename for the `raised` and `floating` specs

The value of this prop affects how the `theme` prop gets applied as well. A
`themeType` of `flat` will apply the `theme` to the text color of the button. A
`themeType` of `outline` will apply the `theme` to the text color and outline of
the button. Finally, a `themeType` of `contained` will apply the theme color to
the background of the button and update the text color to be legible on that
background color.

### `buttonType`

Using the new `buttonType` prop is how you can now render either as a text or
icon button. The supported values are:

- text (default)
- icon

A small change is that the `floating` spec was entirely removed as it can be
implemented by providing `buttonType="icon"` and `themeType="contained"`.

## Icon Support

Built-in icon rendering support was also removed since it became confusing about
how to render an icon button vs an text button with an icon. There is also a new
icon package (`@react-md/material-icons`) that can be used to implement all the
pre-made icons, so it felt easier to keep the icon support omitted.

## Fixed Fake Button Accessibility

I had misunderstood some of the `aria-` attributes when I implemented the
`AccessibleFakeButton` component and actually decreased accessibility slightly
because of it. The `FakeButton` will now follow the
[button widget spec](https://www.w3.org/TR/wai-aria-practices/#button)
correctly.
