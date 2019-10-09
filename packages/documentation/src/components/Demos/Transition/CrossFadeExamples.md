The `CrossFade` component is great to use for full page transitions such as
route changes or animating new parts of the page into view since the transition
is triggered when it is mounted. A general recommendation for using this
component is to mount it near the root of your main layout surrounding the main
content and set the `key` to be the current pathname.

This works quite well with `Suspense` as well which can be seen in the
[With Suspense progress demo](/packages/progress/demos#with-suspense-title). You
can also view the source code for this documentation's site which uses
[nextjs](https://github.com/zeit/next.js) for server side rendering and routing:
[pages/\_app.js](https://github.com/mlaursen/react-md/blob/next/packages/documentation/pages/_app.js#L166).
If you are using another routing library/solution, the same pattern can be
applied to get route transitions.

> Note: The `CrossFade` component will only work when the child is a single
> React Element since it uses the `CSSTransition` component from
> [react-transition-group](https://github.com/ReactTraining/react-transition-group).
> This means if you try to use a `<Fragment>`, `null`, or multiple children,
> this component will not work.
