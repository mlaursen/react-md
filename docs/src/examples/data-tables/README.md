Data tables display raw data sets. They usually appear in desktop enterprise products.

The `react-md` data tables come in two types: `plain` and `selectable`. A plain
data table will exclude just display all the data without the ability to select each row.
A selectable data table will allow the selecting of rows.

If you want to have a plain data table, you might need to update the styling for
`.md-table-data`. It sets the height to `$md-height` and does not allow line wrapping.
To have a multiline plain table, you will need to update the styles to be something like this:

```scss
.YOUR_TABLE_CLASS_NAME .md-table-data {
  height: initial;
  white-space: normal;

  > * {
    min-height: $md-height;
  }
}
```

The cell content should then be wrapped in some sort of element to get the styling.
