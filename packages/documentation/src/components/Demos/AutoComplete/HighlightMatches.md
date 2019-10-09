The `AutoComplete` also supports some basic support for highlight letters that
match the text field's value when the list of data have string labels. This will
only work for `"case-insensitive"` filtering or a custom filter function that
ensures that the matches always match all the letters in order.

If you need more robust highlighting, you can also update the `getResultLabel`
prop and implement your own highlighting behavior instead.
