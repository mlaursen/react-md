Creating swipeable tabs are not build into the library at this point since swipe
behavior is pretty opinionated and hard to add a reasonable default. That being
said, you can use a library like
[react-swipeable](https://github.com/dogfessional/react-swipeable) along with
the `@react-md/tabs` package to get your desired swipe behavior.

To add swiping, you'll want to control the `activeIndex` state for the
`TabsManager` by providing an `activeIndex` prop and `onActiveIndexChange`
callback prop. The `onActiveIndexChange` is required so that when a tab is
clicked or keyboard navigated and clicked, the `activeIndex` will automatically
be updated as expected.

From here, you'll want to update the `TabPanels` to be `persisent` so that you
can apply a `transform` style to the active tab and the next tab that should
become visible. While the user is swiping, you'll also want to enable the
`disableTransition` prop so that once the swipe is completed, the tab updates
immediately instead of possibly re-animating the entire swiped distance again.

Finally, you'll want to create a custom `SwipeablePanel` that accepts all the
`TabPanel` props along with:

- the swipe distance
- the index of the panel
- the current active index

When the user starts swiping, you'll manually add a `style` object to the
current active panel along with the panel that is being swiped towards with a
`transform: translateX(${distance})` as well as removing the `hidden` prop for
the panel.

Check out the example below that also works for "mouse swiping". The example
code also has some comments about where things might need to be improved and
other oddities.
