The `Portal` component is used for when you need to display some components outside of the normal
DOM tree. This component will only render its children when the `visible` prop is `true`. It will
then create a subtree as the first child of the `body` tag. You can also specify a `renderNode` which
must be a valid HTMLDOMNode to render in.

This is really useful when needing to create dialogs or overlays.
