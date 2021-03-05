About the dark-theme background color issue -- seems like it can be fixed by
updating the `rmd-theme-dark-elevation` to not be applied to the current class
(so only update a CSS variable at `:root` or `.dark-class`). Might require
additional css variables where some can be the `dark-elevation-background-color`
which can be set to `null` to not use parent class?
