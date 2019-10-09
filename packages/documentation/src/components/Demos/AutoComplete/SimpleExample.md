The base requirements for an `AutoComplete` are to provide an `id`, a list of
`data` to filter, and a `filter` behavior/custom function. However, it is
recommended to also provide a `label` or `aria-label` for additional
accessibility and a `placeholder` value for additional context.

Since there are a lot of different ways to filter, this library will be keeping
it simple and only providing two filter functions out of the box:

- `"case-insensitive"` (default) - A simple case insensitive filter that will
  only show results that contain the input's value in order ignoring case
- `"fuzzy"` - A fuzzy filter that will show any results that just contain the
  same letters in any order ignoring case.

To start off simple, the following examples will just filter based off a list of
fruits and show these two filter behaviors.
