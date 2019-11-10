Tabs allow you to organize content across different screens, data sets, and
other interactions. The `@react-md/tabs` package provides a bunch of components
to help create accessible tabs, but here's a list of the most important
components:

- `TabsManager` - The main wrapper component for all the `Tabs`. You must
  provide a `tabsId`, a list of tab configuration, and optional settings for
  your tabs. You'll need to ensure that this component is a parent of all the
  next components.

- `Tabs` - This component will render all the tabs from the `TabsManager`
  component ensuring correct keyboard accessibility and updating tabs to be
  active when needed.

- `TabPanels` - This component is a wrapper for the `TabPanel` component that
  manages switching out the active `TabPanel` as needed and animating these
  panels in and out of view. It will also reset scrolling when the tab has
  changed. The `children` for this component **must** be the `TabPanel`
  component without **any conditional rendering**. This component will clone in
  the required `id` and `aria-*` props into the child `TabPanel` that is active.

- `TabPanel` - The final component that creates an accessible `tabpanel` widget
  that links to a `Tab` within the `Tabs` component with the `aria-labelledby`
  attribute.

The `Tabs` component will also allow the user to navigate through tabs with the
left and right arrow keys and optionally auto-select the tabs. Check out the
demos below to see example usage and explanations for the `TabPanels`/`TabPanel`
components.
