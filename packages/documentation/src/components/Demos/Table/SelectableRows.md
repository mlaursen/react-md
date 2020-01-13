A common table pattern is to allow a user to select rows either by clicking on a
checkbox for that row or to click anywhere in the row. Since `react-md` is
attempting to be a low-level customizable component library, there isn't a super
nice table wrapper component that does this for you, but it can be easily
implemented by using the `selected` prop on the `TableRow` component, the
`TableCheckbox` component, ans the `useIndeterminateChecked` hook from
`@react-md/form`.

> The default colors for a selected row can be configured by changing the
> `rmd-table-row-selected-color` variable or using the
> `rmd-table-theme-update-var` mixin and overriding the `selected-color`
> variable.
