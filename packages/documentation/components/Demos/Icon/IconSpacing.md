The `TextIconSpacing` component is extremely useful since it allows you to
render an icon or any component separated by any text or another component with
some spacing in-between. The main use case for this component will be within
buttons, but it can be updated to be used in other components to add spacing
between any two elements.

The way the `TextIconSpacing` component works is that it'll inject a new
`className` prop into the provided `icon` prop component. You'll need to ensure
that the icon passes a `className` prop down to the top-level element, or use
the `forceIconWrap` prop to always wrap the icon in a `<span>` with the
`className` instead. In addition, it will return a `<Fragment>` of the `icon` +
`children` so no additional DOM elements are created. This is great when you are
reusing existing `react-md` components, but otherwise you'll probably want to
wrap your component in an element that has:

```scss
.wrapper {
  align-items: center;
  display: flex;
}
```

so that the icon and text are aligned nicely.

> The #list package is a good example of using this package. It uses this
> component to add the correct spacing around the icons and avatars within each
> list item.
