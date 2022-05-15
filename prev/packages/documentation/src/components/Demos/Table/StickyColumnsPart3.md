It is also possible to create sticky footers within `react-md` by enabling the
`sticky` prop on the `TableFooter`. That being said, sticky cells within the
`TableFooter` are normally different than sticky headers since the normal
pattern for a footer is to span the entire width of the table. If that is not
the case, you can follow the same pattern as the `TableHeader` for a sticky
footer.

If you want to create a sticky footer that spans the entire width of the table,
you'll still want to enable the `sticky` prop on the `TableFooter` component to
enable the sticky functionality. If you want the `TableCell` to span the entire
width of the table ignoring all the other table cells, also set the
`colSpan="100%"` on the `TableCell`.
