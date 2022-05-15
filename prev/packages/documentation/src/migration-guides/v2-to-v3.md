# Migrate from v2 to v3

#### Change node-sass to sass

Since
[node-sass has been deprecated](https://github.com/sass/node-sass#node-sass) and
[a new module system has been introduced](https://sass-lang.com/blog/the-module-system-is-launched)
users must switch from `node-sass` to `sass` to use the latest features within
`react-md`.

```sh
npm update react-md
npm uninstall node-sass
npm install sass
```

or with `yarn`

```sh
yarn add react-md
yarn remove node-sass
yarn add sass
```

#### Rename InteractionModeListener to UserInteractionModeListener

The `InteractionModeListener` was an alias for `UserInteractionModeListener` and
has been removed.

#### Remove ResizeObserver

The `ResizeObserver` component has been removed in favor of using the
`useResizeObserver` hook.

#### Update useResizeObserver to use the new API

```diff
-const ref = useRef()
-useResizeObserver({
-  target: ref,
-  onResize({ height, width, scrollHeight, scrollWidth, element }) {
-    // Do something
-  }
-  disableHeight: true,
-  disableWidth: true
-});
+const [ref] = useResizeObserver((resizeEvent) => {
+  const { height, width, scrollHeight, scrollWidth, element } = resizeEvent
+  // do something
+}, { disableHeight: true, disableWidth: true });

 return (
   <div ref={ref}>
     {children}
   </div>
 );
```

#### Remove deprecated props from Tooltipped component

Since the `Tooltip` components now use the `HoverModeProvider`, the following
props should be removed from the `Tooltipped` component:

- `onHide`
- `onShow`
- `tooltipId`
- `hoverDelay`
- `focusDelay`
- `touchTimeout`
- `positionThreshold`

#### Remove TooltipHoverModeConfig

This component has been removed since the `Tooltip` uses the
`HoverModeProvider`.

#### Update useIndeterminateChecked to use an object as the second argument

```diff
 const {
   getProps,
   rootProps,
   // checkedValues,
   // setCheckedValues,
-} = useIndeterminateChecked(condiments, ["Sprouts"], customOnChange);
+} = useIndeterminateChecked(condiments, {
+  onChange: customOnChange,
+  defaultCheckedValues: ["Sprouts"],
 });
```

#### Improve build performance by using the new react-md sass file

Part of the v3.0.0 release was to create a
[new Sass import](https://github.com/mlaursen/react-md/blob/a9995e084480006a77f9123b95ce7275998fb406/packages/react-md/package.json#L9)
that
[merges all the .scss files into one](https://github.com/mlaursen/react-md/blob/3e738b4ab14fd7b4aab4f104b0d4120d226b7747/packages/dev-utils/src/utils/styles/combineAllFiles.ts#L105-L109)
for two reasons:

1. This simplifies importing things from react-md into a single `@use` statement
   instead of multiple lines
2. Drastically improves build performance in large projects because only one
   `.scss` file needs to be resolved.

`sass-loader` with `webpack` does not maintain context of other `.scss` files in
your app so each time you `import './path/to/my.scss';` or
`import styles from './path/to/my.module.scss';`, `sass-loader` will need to
resolve every `@import` or `@use` statement found in that file recursively. The
IO required for this is the whole reason build times can get slow in larger
projects since there are about 200 `.scss` files within react-md that would need
to be resolved. Combining all the files as a build step within react-md removes
this issue and drastically increases build performance.

To get started, update your main `.scss` file that imports all the packages
within `react-md` and generates the styles:

```diff
-@import '~@react-md/alert/dist/mixins';
-@import '~@react-md/app-bar/dist/mixins';
-@import '~@react-md/avatar/dist/mixins';
-@import '~@react-md/badge/dist/mixins';
-@import '~@react-md/button/dist/mixins';
-@import '~@react-md/card/dist/mixins';
-@import '~@react-md/chip/dist/mixins';
-@import '~@react-md/dialog/dist/mixins';
-@import '~@react-md/divider/dist/mixins';
-@import '~@react-md/elevation/dist/mixins';
-@import '~@react-md/expansion-panel/dist/mixins';
-@import '~@react-md/form/dist/mixins';
-@import '~@react-md/icon/dist/mixins';
-@import '~@react-md/layout/dist/mixins';
-@import '~@react-md/link/dist/mixins';
-@import '~@react-md/list/dist/mixins';
-@import '~@react-md/media/dist/mixins';
-@import '~@react-md/menu/dist/mixins';
-@import '~@react-md/overlay/dist/mixins';
-@import '~@react-md/progress/dist/mixins';
-@import '~@react-md/sheet/dist/mixins';
-@import '~@react-md/states/dist/mixins';
-@import '~@react-md/table/dist/mixins';
-@import '~@react-md/tabs/dist/mixins';
-@import '~@react-md/theme/dist/mixins';
-@import '~@react-md/tooltip/dist/mixins';
-@import '~@react-md/transition/dist/mixins';
-@import '~@react-md/tree/dist/mixins';
-@import '~@react-md/typography/dist/mixins';
-@import '~@react-md/utils/dist/mixins';
+@use 'react-md' as *;

 @include react-md-utils;
```

Once the main styles have been generated, update the remaining `.scss` files in
your app replacing `@import` statements of `react-md` packages to be
`@use 'react-md' as *;`.

#### Overriding react-md Sass variables with the new module system

Check out the new #customizing-your-theme documentation to see how you can
override `react-md` Sass variables with the new module system and a recommended
setup.
