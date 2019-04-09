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
`AppSizeListener` component.

The default breakpoints and media queries will be:

```ts
const isPhone = "screen and (max-width: 767px)";
const isTablet = "screen and (min-width: 768px) and (max-width: 1024px)";
const isDesktop = "screen and (min-width: 1025px)";
const isLargeDesktop = "screen and (min-width: 1280px)";
const isLandscape = window.innerWidth > window.innerHeight;
```

> The media queries will actually be using `em` instead of pixels, but I
> converted this example to pixels for human readability.
