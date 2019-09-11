The `Select` component is a custom widget that allows you to have additional
styling controls for a native `<select>` element while still being accessible.
This component inherits all the `TextField` styles just like the `NativeSelect`,
but also allows each `option` to be rendered like a `ListItem` from the #list
and #menu packages.

> Note: Even though the `Select` component supports the `inline` prop, it does
> not behave the same was as the `NativeSelect` or a native `<select>` component
> since it will not automatically update it's width to be the longest renderable
> option. The size will update whenever the value of the select changes.

This component is fully controlled, so you will need to provide the current
`value`, an `onChange` handler, and a list of `options`. An option can be:

- a number
- a string
- or an object of props to pass to a `ListItem` (see the next example for more
  details here)

The `onChange` handler **will not be a native change event** since there are no
`<input>` or `<select>` elements being rendered. Instead, the `onChange` handler
will be provided the next value string as the first argument and the option as
the second: `onChange(nextValue: string, option: object | string | number)`.

Just like a native `<select>` component, the list of options can be shown by
clicking, pressing the space key, or using the up and down arrow keys. Once the
list of options are shown, the user can:

- type letters to find a match starting with the same letters
- use the up and down arrow keys to focus the previous and next items
- use the home and end keys to focus the first and last items
- press the escape key to close the listbox
- use the space or enter key to select and close the listbox

> Check out the next example for some better examples of the typeahead feature
