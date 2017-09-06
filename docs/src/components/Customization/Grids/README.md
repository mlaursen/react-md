### About the Grid

The Material Design grid framework works on a 12 column grid system for desktop devices,
an 8 column grid system for tablet devices, and a 4 column grid system for mobile devices.

The `react-md` library has implemented this by creating the `.md-grid` and `.md-cell`
class names. Using both of these together you can get the required margins and gutter for an
application.

The grid is implemented with the `.md-grid` flexbox container and each column (or cell)
is defined using the `.md-cell` class name. The default behavior is for the `.md-cell`
to span an entire row on mobile devices, 3/4 a row on tablets, and 1/2 a row on desktops /
larger screens. Since this will not work with all cases, you can also apply the `.md-cell--NUMBER`
class name to get a more defined grid system. When using the `.md-grid--NUMBER` class name,
if the current device's max columns per row is less than the number, the column will just span the
entire row.

##### Example
`.md-cell .md-cell--5` - This would span an entire row on mobile devices, 5/8s of a row on tablets,
and 5/12s on desktops / larger screens.

### Class Names Created
- `.md-grid` - The main flex container. You should use this along with the `.md-cell` to get
the correct gutter and margins for a material desing page.
- `.md-grid--no-spacing` - An optional class name to use with the `.md-grid`. When they are used
together, all the margins and spacings will be removed from the grid.
- `.md-cell` - The main container for a column or cell in the grid. If this is used alone, the default
behavior is to display 1 cell per row on mobile devices, 2 cells per row on tablets, and 3 cells per row
on desktop / larger screens. For more fine tuning, it can be used along with one of the following.
- `.md-cell--right` - This simply applies `margin-left: auto` to a cell. This is basically the same as applying
`float: right` in a row.
- `.md-cell--top` - This aligns the cell to the top of a row.
- `.md-cell--middle` - This aligns the cell to the middle of a row.
- `.md-cell--bottom` - This aligns the cell to the bottom of a row.
- `.md-cell--stretch` - This aligns the cell to stretch the entire height of a row. This is the default behavior.
- `.md-cell--NUMBER` - This is will allow a cell to span this many columns on all media sizes. When the `NUMBER`
is greater than the number of columns allowed for a media device, it will span the entire row. This basically means
that if you are using the base configuration options and following the material design specs, mobile devices only
allow 4 columns per row, tablets 8 per row, and desktops 12. So specifying `.md-cell .md-cell--6` would span an
entire row on mobile devices, 3/4 of a row on tablets, and 1/2 of a row on desktops.
- `.md-cell--NUMBER-offset` - This will offset the cell by the given number of columns. If the `number` is greater
than the maximum amount of columsn allowed for the device's screen size, an entire row will be blank.
- `.md-cell--NUMBER-phone` - This will set the cell's size only for mobile devices.
- `.md-cell--NUMBER-tablet` - This will set the cell's size only for tablet devices.
- `.md-cell--NUMBER-desktop` - This will set the cell's size only for desktop / large screens.
- `.md-cell--NUMBER-phone-offset` - This will offset the cell's position only for mobile devices.
- `.md-cell--NUMBER-tablet-offset` - This will offset the cell's position for tablet devices.
- `.md-cell--NUMBER-desktop-offset` - This will offset the cell's position for desktop / large screens.
- `.md-cell--phone-hidden` - This will hide a cell only for mobile devices.
- `.md-cell--tablet-hidden` - This will hide a cell only for tablet devices.
- `.md-cell--desktop-hidden` - This will hide a cell only for desktop / large screens.
- `.md-cell--order-NUMBER` - This is an optional class name you can apply if you want this item to appear in a different
order on the grid.
- `.md-cell--order-NUMBER-phone` - This will set the cell's order only for mobile devices.
- `.md-cell--order-NUMBER-tablet` - This will set the cell's order only for tablet devices.
- `.md-cell--order-NUMBER-desktop` - This will set the cell's order only for desktop / large screens.
