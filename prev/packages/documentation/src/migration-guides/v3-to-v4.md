# Migrate from v3 to v4

#### Run the @react-md/codemod to automate fixing some of the breaking changes

```sh
npx @react-md/codemod v3-to-v4/preset
```

More information about this codemod can be found
[on GitHub](https://github.com/mlaursen/react-md/tree/98a6a9fe4c5c8cf1baf630e5969b760af93e9ad2/packages/codemod).

#### Upgrade React to v16.14.0 or greater

The minimum version of `React` has been changed to `16.14.0` because `react-md`
is now compiled with the new
[JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).

#### Rename the Text component to Typography

If you did not run the `@react-md/codemod` script for this release, you will
need to manually rename all `<Text>` components to `<Typography>`.

#### Update ScaleTransition to use transitionIn instead of visible

If you did not run the `@react-md/codemod` script for this release, you will
need to manually rename the `visible` prop to `transitionIn` for the
`<ScaleTransition>` component.

#### Remove any usage of mountOnEnter and unmountOnExit

The new transition API only supports a new `temporary` prop instead.

#### Update useCSSTransition for the new API

```diff
 export default function UseCSSTransition(): ReactElement {
   const [transitionIn, setTransitionIn] = useState(false);
-  const [rendered, transitionProps] = useCSSTransition({
+  const { elementProps, rendered } = useCSSTransition({
     transitionIn,
     timeout: 5000,
     classNames: {
       enter: styles.enter,
       enterActive: styles.entering,
       exit: styles.exit,
       exitActive: styles.exiting,
     },
     temporary: true,
   });
   return (
     <>
       <Button onClick={() => setTransitionIn(!transitionIn)}>Toggle</Button>
-      {rendered && <Page1 {...transitionProps} />}
+      {rendered && <Page1 {...elementProps} />}
     </>
   );
 }
```

#### Update useCrossFade to useCrossFadeTransition

```diff
-import { useCrossFade, ENTER } from "@react-md/transition";
+import { useCrossFadeTransition } from "@react-md/transition";

-const [, transitionProps, dispatch] = useCrossFade({ appear: false });
+const { elementProps, transitionTo } = useCrossFadeTransition();

-dispatch(ENTER);
+transitionTo("enter");

-<div {...transitionProps}>
+<div {...elementProps}>
```

#### Update useCollapse to useCollapseTransition

```diff
 const [collapsed, setCollapsed] = useState(true);
-const [rendered, transitionProps] = useCollapse(collapsed, options);
+const { elementProps, rendered } = useCollapseTransition({
+  ...options,
+  transitionIn: !collapsed,
+});

 return (
   <>
     <Button onClick={() => setCollapsed(!collapsed)}>Toggle</Button>
     {rendered && (
-      <div {...transitionProps}>
+      <div {...elementProps}>
        <Text>Stuff that should be animated</Text>
        <div>Whatever content...</div>
       </div>
     )}
   </>
 );
```

#### Update useFixedPositioning for the new API

The API has changed so that the `fixedTo` element **must** be a `ref` pointing
to the element.

```diff
-import { CSSTransition } from "react-transition-group";
+import { CSSTransition } from "@react-md/transition";

-const { style, onEnter, onEntering, onEntered, onExited } = useFixedPositioning({
-  fixedTo: () => document.getElementById('some-element'),
-});
+const fixedTo = useRef();
+const { style, transitionOptions } = useFixedPositioning({
+  fixedTo,
+});


 return (
   <>
-    <Button id="some-element">Button</Button>
+    <Button id="some-element" ref={fixedTo}>Button</Button>
     <CSSTransition
-      in={visible}
-      mountOnEnter
-      unmountOnExit
+      {...transitionOptions}
+      temporary
+      transitionIn={visible}
       timeout={100}
       classNames="some-transition"
     >
       <div>
         Some transitionable div
       </div>
     </CSSTransition>
   </>
 ):
```
