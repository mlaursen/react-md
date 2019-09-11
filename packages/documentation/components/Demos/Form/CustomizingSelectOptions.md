he default behvior for the `Select` component is to just render any `number` or
`string` options as the `children` within the `ListItem`. Since it is sometimes
helpful to be able to add additional information, styling, or icons with the
options, an option can also be an object of props to pass to the `ListItem`
instead.

When the `option` is an object, the default behavior will be to:

- use `option.label || option.children` as the displayable children
- use the `option.value` as the value for this option
- remove the `option.label` and `option.value` keys from the object before
  passing it as props to the `ListItem`

The label will be displayed in the option itself as well as in the select button
when the option's value matches the select's value. This simplest way to add
customization is to transform your list of options to follow this pattern.

However, this might not match all use-cases and customizations required, so the
select also has the following props to help with rendering and accessibility:

- `labelKey` - A key on the object that should be considered the label
- `valueKey` - A key on the object that should be considered the value
- `searchKey` - A key on the object that should return a string that can be used
  for the typeahead feature (defaults to the `labelKey`)
- `getOptionLabel` - A function that is called for each option to extract a
  label
- `getOptionValue` - A function that is called for each option to extract a
  value
- `getOptionSearchLabel` - A function that is called for each option to extract
  a search label string for the typeahead feature

> You probably won't need all this additional functionality other than the
> `labelKey`, `valueKey`, and `searchKey` props, but it might be useful for
> virtualization libraries or other stuff like that.
