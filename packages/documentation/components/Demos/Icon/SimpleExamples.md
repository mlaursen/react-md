This package exports two different icon components so that you can create icons
either from a font icon library or custom SVG paths. The example below also
shows some force sizing props to help adjust the icon size when non-material
icons font libraries don't have consistent sizes for their icons.

If you are using material icons, it's recommended to check out the
#material-icons page instead for this simple example as it'll make it easier to
include pre-made icons. Most of the remaining examples on this page will be
using that library since I'm terrible at remembering icon names.

> Note: All SVG icons will default to have `aria-hidden="true"` by default since
> they normally are presentational data for users and shouldn't be read by
> screen readers. If you provide an `aria-label` or `aria-labelledby` attribute,
> the `aria-hidden` will be removed instead.
