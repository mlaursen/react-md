The `AppSizeListener` component is used to determine the current application
size based on media queries. You normally want to add this component near the
root of your app and then use the `useAppSizeContext` hook to determine the
current app size within child components.

> If you are using the #layout package, this will be handled for you
> automatically.

The current app size will contain the following keys:

```ts
interface AppSize {
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isLandscape: boolean;
}
```

which will be determined by different min and max widths passed into the
`AppSizeListener` component. The app size can only have one of the `isPhone`,
`isTablet`, or `isDesktop` flags enabled by default, but will also enable the

- `isLargeDesktop` when the app is in desktop mode
- `isLandscape` when the app has the orientation type set to one of the
  landscape values

The default media queries will be:

```ts
const isPhone = "screen and (max-width: 767px)";
const isTablet = "screen and (min-width: 768px) and (max-width: 1024px)";
const isDesktop = "screen and (min-width: 1025px)";
const isLargeDesktop = "screen and (min-width: 1280px)";
const isLandscape =
  window.orientation.type === "landscape-primary" ||
  window.orientation.type === "landscape-secondary";
```

> Note that the `isLandscape` is checking the `window` orientation instead of
> determining if the `width` is greater than the `height`.
