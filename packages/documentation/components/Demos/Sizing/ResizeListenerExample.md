This package also exports a `ResizeListener` component that will listen to
entire window resize events while mounted. The resize event callback **will be
throttled** for extra performance as well as delegating the event using the
#utils `delegateEvent` helper. This is extremely useful when you need to track
specific pixel updates instead of breakpoint changes.

The example below will update the current app size in pixels while the listener
is enabled. You can toggle the two checkboxes to see the different behavior for
the `immediate` prop and how the `ResizeListener` stops triggering callbacks
while unmounted.
