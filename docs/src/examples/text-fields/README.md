Text fields allow the user to input text, select text, and lookup data via auto-completion.

> Starting from v0.4.x, text fields will default to full width since most of the time, this
was the most common use case. It can be disabled by passing `fullWidth={false}`. In addition,
when you are using a multiline text field with a floating label, you need to position it in a
`display: flex` parent. There is some `margin-top` applied to the textarea to allow the floating
label to appear, and have the growing height animation. If it is not in a flexbox, this margin
does not appear to take effect.
