Since there might be times where it is useful to update the temporary and
toggleable layouts' visibility, this package also exports a `useLayoutConfig`
hook to help out that returns the current configuration and controls.

The example below will give a quick example using this hook to control the
visibility of the navigation panel for non-persistent layouts. This example will
also show how to make toggleable layouts default to being visible with a new
`defaultToggleableVisible` prop introduced in `react-md@2.6.0`.
