Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets.

Within react-md, Tabs are implemented with the `TabsContainer`, `Tabs`, `Tab`, `TabPanel` and optionally `TabMenu` components. 
The most common implementation will be using the `TabsContainer`, `Tabs`, and `Tab` components.

The `TabsContainer` component manages the state of the active tab content as well as allowing the tabs to be swipeable on
mobile devices by using the `react-swipeable-views` library.

When you want more fine tuned control about where the active tab's content should be placed, you can use the `Tabs` and `Tab`
components as normal, and then manually use the `TabPanel` component to render the correct children.
