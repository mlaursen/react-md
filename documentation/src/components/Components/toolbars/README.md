The `Toolbar` component can be used as a fixed `App Bar`, or just a simple container
for a few actions.

### Sizing
According to the material design spec, the toolbar changes height based on the device and orientation.
This can actually make things very difficult to style and adds complexity for styling. I recommend
making a static [$md-toolbar-height](/components/toolbars?tab=2#variable-md-toolbar-height) instead.

When you are using a `fixed` Toolbar (aka `App Bar`), if you apply the `.md-toolbar-relative`
class name to the main content of the page (or something you want adjusted), it will
gain a margin-top equal to the current height of the toolbar based on the device/screen
size.

### Positioning CSS
Since the toolbar is normally used as a fixed component, some additional helper class names have been
created to help position content relative to a toolbar.

#### `md-toolbar-relative`
This class name will apply a `margin-top` to whatever element or component it has been applied to for the current
media's toolbar height.

#### `md-toolbar-relative--prominent`
This class name is similar to the `md-toolbar-relative` except that it is used with prominent toolbars instead.

#### `md-btn--toolbar`
This applies additional margin to buttons to center them vertically in the toolbar. This should only be used if
the buttons are not occuring in the `actions` or `nav` props.

#### `md-toolbar--action-left`
This applies additional `margin-left` to any elements to position to the left keyline in a toolbar. This should really
only be used if not using the `nav` and `title` props in a toolbar.

#### `md-toolbar--action-right`
This applies additional `margin-right` to any elements to position to the left keyline in a toolbar. This should really
only be used if not using the `actions` props in a toolbar.

#### `md-title--toolbar`
This applies additional styles for a title in the toolbar. This should only be used if not using the `title` prop
on a toolbar.

#### `md-title--toolbar-offset`
This applies additional margin-left to the title in the toolbar to match the current keyline. This should probably
only be used if not using the `title` prop on a toolbar.

#### `md-title--toolbar-prominent`
This applies additional styles to move the title to a more prominent section in the toolbar. This should probably
only be used if not using the `title` prop on a toolbar.
