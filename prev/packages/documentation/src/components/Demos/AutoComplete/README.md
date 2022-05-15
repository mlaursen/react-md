> Note: The `AutoComplete` is mostly a desktop only component out of the box due
> to how soft keyboards work on touch devices. If you want to create an
> `AutoComplete` on mobile, you should follow the pattern in the
> [Highlight Matches](#highlight-matches) example where the `AutoComplete` gets
> moved into a static header and the menu no longer hides on scroll or page
> resizing.

An `AutoComplete` is a component that allows for real-time suggestions from a
pre-determined list as the user types by filtering data based on the current
value. It can also be used to interact with an API that handles the sorting,
filtering, matching, etc as well.

This component has been implemented following the
[combobox widget specifications](https://www.w3.org/TR/wai-aria-practices/#combobox)
so it will be fully accessible. It is recommended to also check out the #form
package for additional styling options since it uses the `TextField` and
`Listbox` components behind the scenes to show matches.

Here's a quick summary of the accessibility features if you don't want to read
the combobox info:

- `ArrowDown` - keyboard focus the next suggestion (wraps)
- `ArrowUp` - keyboard focus the previous suggestion (wraps)
- `Escape` - hide suggestions if they were visible. clear text field if the
  suggestions were hidden
- `Enter` - selects the keyboard focused suggestion if there was one. Submits
  form otherwise
- `alt + ArrowDown` - show suggestions if they were hidden and there are
  suggestions available
- `alt + ArrowUp` - hide suggestions if they were visible without selecting a
  new value
