`react-md@2.8.0` introduces a new public hover mode API that allows different
temporary elements like tooltips and popover dialogs to appear immediately after
an element has been hovered instead of waiting the default hover duration
(`1s`). To use this functionality you'll need to:

- render the `HoverModeProvider` or `Configuration` (from #layout) component as
  a parent component
- use the `useHoverMode` hook to provide the mouse event handlers, visibility,
  and other functionality

I recommend checking out the
[useHoverMode type definitions]({{GITHUB_FILE_URL}}/packages/utils/src/hover/useHoverMode.ts)
for more information around what's returned.

The example below will show how you can use the hover mode API to create a
Wikipedia-like preview window while hovering over links.
