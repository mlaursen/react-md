Since the default interactions might not cover 100% of the use cases, you can
use some of the provided mixins to add more custom styles. This package exports
the following useful mixins:

- `rmd-states-touch-only` - adds styles only when in touch mode
- `rmd-states-mouse-only` - adds styles only when in mouse mode
- `rmd-states-keyboard-only` - adds styles only when in keyboard mode
- `rmd-states-pressed-styles` - adds styles only when using the pressed fallback
  option

To make this example a bit more interesting, I'll update the base button styles
so that a `flat` button will raise elevation on press.

> "Fun" fact! The #button package uses the `rmd-states-pressed-styles` mixin to
> add the different box-shadow effects while pressed for the `contained` button.
