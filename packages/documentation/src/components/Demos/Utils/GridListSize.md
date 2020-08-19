The current number of columns and the size of each column can be retrieved
either with the `useGridListSize` hook or using the "children render function"
pattern. If you want to use the children render function pattern, a quick
example is:

```ts
<GridList>
  {({ columns, cellWidth }) => (
    <GridListCell>
      Columns: {columns}
      <br />
      Cell Width: {cellWidth}
    </GridListCell>
  )}
</GridList>
```

However, the hook API is easier to understand so the following example will use
the `useGridListSize` hook instead.

> Note: The grid list size will be `0` if server side rendering since the
> `GridList` requires access to the DOM to calculate sizing.
