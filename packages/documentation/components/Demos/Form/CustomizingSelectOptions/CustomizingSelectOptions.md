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
- `getOptionLabel` - A function that is called for each option to extract a
  label
- `getOptionValue` - A function that is called for each option to extract a
  value
- `getDisplayLabel` - A function that is called for the selected option that
  should return a renderable ode to display within the `Select`'s button.

> You probably won't need all this additional functionality other than the
> `labelKey` and `valueKey` props, but it might be useful for virtualization
> libraries or other stuff like that.

The examples below will show some use-cases for these props to add some more
style to your select fields:

- using the `labelKey` and `valueKey` props converting a list of states that
  have the format of `interface State { name: string; abbreviation: string; }`
  without needing to transform the list yourself
- rendering custom `children` within each option and still being search
  accessible
- displaying icons/avatars along with the selected option in the `Select`'s
  button
