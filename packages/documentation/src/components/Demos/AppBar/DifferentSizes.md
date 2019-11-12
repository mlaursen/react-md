There are 4 different sizes available for the app bar by default:

- normal
- dense
- prominent
- prominent and dense

When the `prominent` prop is enabled, the app bar's styles will update a bit so
that it is now possible to have line-wrapping so that more content can be placed
under the "main" app bar row. When this happens, you can use another `AppBar`
along with setting a new prop `component="div"` to render another row.

> Note that you must also apply `dense` to the child `AppBar` components to get
> the correct sizing.
