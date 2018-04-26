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
`".md-cell .md-cell--5"` - This would span an entire row on mobile devices, 5/8s of a row on tablets,
and 5/12s on desktops / larger screens.

### Components
There are 3 components that have been created to help create Grids with the appropriate class names. Please
see the examples below for more information about the `Grid`, `Cell`, and `GridList` components.
