A file input is just a simple wrapper of the `<input type="file" />` that adds
some default styles to look like a button. This means that all the themes
available for a button are also available for this component. The file input has
some reasonable defaults by showing a download file icon and a screen reader
only accessible label of `Upload`. Unlike buttons, the file input is defaulted
to render as an icon button with the primary theme color and the contained
styles.

To use this component, you **must** provide:

- an `id` for accessibility and making the button clickable
- an `onChange` event handler
