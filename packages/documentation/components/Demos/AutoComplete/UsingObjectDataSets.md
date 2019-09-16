Since it isn't extremely helpful to only use strings, the `AutoComplete` can
also filter and display a list of objects. The base requirements for an object
result is that it should have:

- a `label` key or a `children` key - This is what will be displayed in the
  suggestions dropdown menu
- a `value` key - This is the searchable **string** that is used for filtering
  down the data by the current text field's value.

This allows you to have more complex suggestions by being able to render custom
styles within the dropdown list, but still being searchable. In addition, you
can use all the list item props for adding icons, avatars, or even media in the
suggestion list.

You can also customize this behavior a bit by changing the `labelKey` and
`valueKey` props to be different values if your object is simple and don't want
to transform it to match this structure.
