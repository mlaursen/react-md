One of the downsides to the `CrossFade` component is that the transition is
triggered once the component mounts which means the only way to trigger new
animations is by changing the `key` for this component. Since it isn't always
ideal to have to re-mount the child component to trigger the transition, this
package also exports a `useCrossFade` hook to implement this transition.

The `useCrossFade` hook is really a hook version of the `CrossFade` component
that allows a bit more control for when the transition should fire since it uses
the [useCSSTransition hook](#use-css-transition) behind the scenes. To create a
transition, all that's required is to trigger the `ENTER` transition when it
should be fired. Unlike the `CrossFade` component, the `useCrossFade` hook
**does not automatically fire on mount**.

Since it's a bit hard to demo router changes that can be pushed to sandboxes,
the demo below will show an example of using this pattern with the #tabs
package. However, you can view the
[configuring your layout guide](/guides/configuring-your-layout#adding-route-transitions-optional)
for the `react-router` example.
