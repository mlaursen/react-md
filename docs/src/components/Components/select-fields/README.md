`SelectField`s are a material design styled `<select>` menu (however, they do not use the `<select>`
behind the scenes). I attempted to create the `SelectField` to behave the same as a native `<select>`,
so the following keyboard support has been implemented.

The user can tab-focus the \`SelectField\` and open the list of items by pressing the space bar, up key,
or down key. Once the menu has been opened, a new item can be focused by pressing the up or down arrow
keys and then by pressing spacebar to confirm that selection.

The user can also start typing to attempt to match with a menu item. If the menu is closed while typing,
the first and best match will be selected automatically. If the menu is open while the user is typing,
the best match will be highlighted and require the user to press enter to select that value.

To cancel a selection, the user can either tab away from the select field or press the escape key. 
When the \`SelectField\` is in a form, pressing the enter key will submit the form just like a normal
`<select>`.
