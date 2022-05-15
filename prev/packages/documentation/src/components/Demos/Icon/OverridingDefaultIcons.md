A lot of components within `react-md` end up using icons to help display
supplementary data out of the box. The default implementation is to use the
[Material Icons](https://github.com/google/material-design-icons) font icon
implementation to have a "nice" starting point to keep the `react-md` bundle
size a bit smaller. Unfortunately, this might not be ideal for all applications
and designs since you might want to use a different font icon library, use SVG
icons from #material-icons, or use your own custom icons.

Icons can be overridden two different ways:

- Per-component basis by using the `icon` prop or `Icon` suffixed prop
  (`dropdownIcon` for example)
- Global level with the `IconProvider` component
  > Note: The #layout's `Configuration` component supports this global-level
  > override with the `icons` prop.

For each icon that gets passed to the `IconProvider`, all components that
reference that icon type will also use it unless the `icon` prop has been
defined. Check out the example below for a better understanding.
