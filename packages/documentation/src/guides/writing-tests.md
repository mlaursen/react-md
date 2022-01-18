## Writing Tests

> If you want to skip reading all the steps, you can check out my
> [template-rmd](https://github.com/mlaursen/template-rmd) repo for a
> "real-world" example. Check out the
> [src/test-utils.tsx](https://github.com/mlaursen/template-rmd/blob/react-md%40v4.0.3/src/test-utils.tsx)
> and
> [src/components/\_\_tests\_\_/LinkUnstyled.tsx](https://github.com/mlaursen/template-rmd/blob/react-md%40v4.0.3/src/components/__tests__/LinkUnstyled.tsx)
> for example usage.

Testing an app with `react-md` components should not require many changes to
your normal testing flow. The only times weird issues might occur are when using
components that rely on one of the providers included by the [Configuration
component].

This guide will provide a few suggestions for setting up an app with [jest] and
[react-testing-library].

### Initializing window.matchMedia

If a component from your app or `react-md` uses the `useAppSize` or
`useMediaQuery` hooks, your tests might fail due to `window.matchMedia` being
`undefined`. In this case, you'll want to create or update a `testSetup.ts` (or
`testSetup.js`) to include a very simple polyfill.

Edit `testSetup.ts`:

```diff
+import {
+  DEFAULT_DESKTOP_MIN_WIDTH,
+  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
+} from '@react-md/utils';
+
+if (typeof window.matchMedia !== 'function') {
+  window.matchMedia = (query) => ({
+    media: query,
+    matches:
+      query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`) ||
+      query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`),
+    onchange: () => {},
+    addListener: () => {},
+    removeListener: () => {},
+    addEventListener: () => {},
+    removeEventListener: () => {},
+    dispatchEvent: () => false,
+  });
+}
```

Edit `jest.config.js`:

```diff
 module.exports = {
   preset: 'ts-jest',
   testEnvironment: 'jsdom',
+  setupFilesAfterEnv: ['<rootDir>/testSetup.ts'],
   // any other config you want
 }
```

This polyfill will make all your tests run in desktop mode by default.

### Testing different app sizes

Since your layout will most likely change depending on the app size, you'll also
need to be able to configure the `matches` return value on a test-by-test basis.
Luckily, this can be easily implemented by using [jest.spyOn]:

```ts
import {
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
} from "@react-md/utils";

const MEDIA_DEFAULTS: MediaQueryList = {
  query: "",
  matches: false,
  onchange: () => {},
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
};

it("should render correctly on mobile", () => {
  const matchMedia = jest.spyOn(window, "matchMedia");
  matchMedia.mockImplementation((query) => ({
    ...MEDIA_DEFAULTS,
    query,
    matches: query.includes(DEFAULT_PHONE_MAX_WIDTH),
  }));
});
```

### Adding a Configuration Wrapper

Since you'll want your automated tests to reflect your actual browser
environment, it is a good idea to always wrap your tests with the same
`Configuration` component used at the root of your app especially if you change
up the default icons. If you use `react-testing-library` this can be done really
easily by following the documentation about creating a [custom renderer]. Here's
a very quick example that creates a `src/test-utils.tsx` that defines the custom
renderer and updates the `src/components/__tests__/Component.tsx` to use the
custom renderer.

Create `src/test-utils.tsx`:

```tsx
import {
  render as renderer,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import { Configuration, ConfigurationProps } from "@react-md/layout";

export * from "@testing-library/react";

const configuration: ConfigurationProps = {
  // your configuration
};

export function render(
  ui: ReactElement,
  options?: RenderOptions
): RenderResult {
  return renderer(ui, {
    ...options,
    wrapper: ({ children }) => (
      <Configuration {...configuration}>{children}</Configuration>
    ),
  });
}
```

Edit `src/components/__tests__/Component.tsx`:

```diff
-import { render } from "@testing-library/react";
+import { render } from "../../test-utils";

 // your tests
```

[jest]: https://jestjs.io/
[jest.spyon]: https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname
[react-testing-library]:
  https://testing-library.com/docs/react-testing-library/intro
[custom renderer]:
  https://testing-library.com/docs/react-testing-library/setup#custom-render
[configuration component]: /guides/configuring-your-app
