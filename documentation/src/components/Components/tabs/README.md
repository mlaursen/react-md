Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets.
Within react-md, tabs are implemented with several components to handle different use cases:
- TabsContainer
- Tabs
- Tab
- MenuTab

### TabsContainer
The `TabsContainer` is used when you want to have swipeable tabs and a full page view. This will manage the state of selecting
and displaing a tab's content. The user can swipe left or right on mobile devices to advance/retract to
other tabs.

### Tabs
The `Tabs` component is used to render your list of `Tab`.

### Tab
The `Tab` component is used to display a tab, and then have its children extracted by the `TabsContainer` or `Tabs` component
to be displayed. The children can also be null or undefined if you want to manage displaying the content on your own.

### MenuTab
The `MenuTab` component is used when there are too many tabs on a desktop display. It will automatically be used
by the `Tabs` component when the `menuOverflow` prop is enabled.
