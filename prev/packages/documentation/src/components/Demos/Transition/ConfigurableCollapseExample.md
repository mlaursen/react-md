The collapse transition can also be configured with a couple of options:

- `minHeight` - The minimum height that the collapsible element can be. This can
  be used to create partially expanding elements. Setting this to anything other
  than `0` will not will not remove the element from the DOM while collapsed by
  default.
- `minPaddingTop` - The minimum padding top for the collapsible element. Setting
  this to anything other than `0` will not remove the element from the DOM while
  collapsed by default. This probably won't be used much.
- `minPaddingBottom` - The minimum padding bottom for the collapsible element.
  Setting this to anything other than `0` will not remove the element from the
  DOM while collapsed by default. This probably won't be used much.
- `temporary` - Boolean if the collapsible element should be temporary within
  the DOM. While `undefined`, it will be considered `true` of the `minHeight`,
  `minPaddingTop` and `minPaddingBottom` options are `0`.

This example will allow you to configure these options and shows how you can
create some weird transitions if desired.
