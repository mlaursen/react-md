The `Checkbox` and `Radio` components use a little css trick with the `::before`
and `::after` pseudo elements to animate the toggled states based on the
`:checked` state. It is does this way so that each checkbox and radio can act
like a native toggle input and not be fully controlled to swap out icons.

Unfortunately, this makes it a bit more difficult if you want to use custom
icons that don't line up with the existing material icons' checkbox and radio
outlines. When this happens, you'll want to use a new prop: `disableIconOverlay`
to disable this behavior and implement your own icon swapping instead by either:

- handling icon swaps all in CSS
- make your checkboxes fully controlled
- make your entire radio group fully controlled
