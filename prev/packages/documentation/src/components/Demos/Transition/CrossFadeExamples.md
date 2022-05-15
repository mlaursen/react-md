The `CrossFade` component is great to use for full page transitions such as
route changes or animating new parts of the page into view since the transition
is triggered when it is mounted. A general recommendation for using this
component is to mount it near the root of your main layout surrounding the main
content and set the `key` to be the current pathname.

The example below will show how this transition can be used as a custom #tabs
transition as well as a lazy loaded `Suspense` transition.

> Note: The `CrossFade` component works by cloning a `ref` and `className` prop
> into the child element. This means that if the children are a `Fragment` or a
> custom component that does not use `forwardRef` or does not apply the
> `className` prop, the transition **will not work**. If it is not possible to
> update the child component, set the `wrap` prop to `true` which will wrap the
> children in a `<div>` to and apply the `ref` and `className` to that instead.
