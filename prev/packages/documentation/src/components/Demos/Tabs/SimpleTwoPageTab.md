Even though you'll _normally_ use the tab components together, you don't
actually need to use them all within the same component. You can move the `Tabs`
into a custom header with the `AppBar` or even move the content into separate
components to render complex data. The only requirement still is that the
`TabPanels` must only have children of `TabPanel`.

Check out the example below for separated components as well as adding icons to
the tabs.
