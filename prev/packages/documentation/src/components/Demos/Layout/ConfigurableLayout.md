The `Layout` component is used to structure the general layout within your app
which can be configured for each app size breakpoint (see
[AppSizeListener](/packages/utils/demos#app-size-listener-example-title) for
more information). A general layout has a fixed `AppBar` at the top of the page,
a `<main>` element that contains your app's main content, a configurable
navigation `Tree`, and a keyboard focusable only link that can skip everything
in the `AppBar` and navigation `Tree` and focus the `<main>` content instead.

There are 5 different layout types available within `react-md` but some of the
layouts are not available on smaller devices due to limited screen size.

- A `"temporary"` layout will add a hamburger menu into the main fixed `AppBar`
  that will show your navigation tree in a `Sheet` that will be closed
  automatically once a navigation item has been clicked. This layout type is
  **available for all screen sizes**.
- A `"toggleable"` layout will add a hamburger menu into the main fixed `AppBar`
  that will show your navigation tree once clicked in a persistent panel at the
  left of the page. While this panel is visible, the main content will have its
  max-width reduced to accommodate for the size of the panel. The panel can be
  closed by clicking the back arrow in the header. This layout is only
  **available on tablets and desktops**.
- A `"clipped"` layout will add some slight `box-shadow` to your navigation tree
  and placed below the fixed app bar. The navigation panel will always be
  visible and the main content will have its max-width reduced to accommodate
  for the size of the panel. This layout is only **available on desktop**.
- A `"floating"` layout will be exactly the same as the `"clipped"` layout
  except that it will have no `box-shadow`. This layout is only **available on
  desktop**.
- A `"full-height"` layout will make the navigation panel span the full height
  of the viewport and offset the title within the `AppBar` so that it is not
  covered. This layout is only **available on desktop**.

This example will allow you to see all the available layout types and play with
configuring it for different media types.
