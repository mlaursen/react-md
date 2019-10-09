Tooltips can also use a `dense` spec which will shrink the amount of padding and
the font-size. This is actually enabled for the entire documentation site by
default, but it can be used in two different ways:

1. Using the `rmd-tooltip-dense` mixin along with a media query
2. Providing the `dense` prop to the tooltip.

My recommended way is using the media query approach along with the #utils
package:

```scss
@import "~@react-md/tooltip/dist/mixins";
@import "~@react-md/utils/dist/mixins";

:root {
  @rmd-utils-desktop-media {
    @include rmd-tooltip-dense;
  }
}
```

> Note that the dense spec is applied to the `:root` selector and not some
> class. This is because tooltips are portalled by default to fix overflow
> issues and making positioning within the viewport easier.

This is nice since you can also update a lot of the other components that have a
dense spec in one area.

Using the `dense` prop can be used, but you will need to create a "global" state
using [React Context](https://reactjs.org/docs/context.html), redux, or your
thing of choice and apply it to each element in your app. This also makes SSR a
bit more difficult since if you "guessed" the device size incorrectly based on
the user agent or something else, you'll have a DOM mismatch.

This example below will disable the auto dense mode that is enabled throughout
the app and show the differences using the `dense` prop instead.
