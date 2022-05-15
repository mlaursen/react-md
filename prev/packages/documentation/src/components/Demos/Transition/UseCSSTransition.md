If none of the existing components above match your use-case, you can try out
the `useCSSTransition` hook which is basically a hook version of the
`CSSTransition` component from `react-transition-group`. The only real
difference between the `react-transition-group` is how the styles get applied
and that using a string `classNames` will use [BEM](http://getbem.com) as the
naming convention.

```ts
const classNames = "opacity";

// react-transition-group
const reactTransitionGroup = {
  enter: "opacity-enter",
  enterActive: "opacity-enter-active",
  exit: "opacity-exit",
  exitActive: "opacity-exit-active",
};

// react-md
const reactMD = {
  enter: "opacity--enter",
  enterActive: "opacity--enter-active",
  exit: "opacity--exit",
  exitActive: "opacity--exit-active",

  // if appear option enabled, also does appear states
};
```
