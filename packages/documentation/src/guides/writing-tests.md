## Writing Tests

Testing with `react-md` should not much more difficult than any other component
testing you are used to for the majority of your tests. The only times you might
encounter errors are when you use components that rely one one of the
configuration providers and determining the current app size. Since I am the
most familiar with [jest] as the test runner and [react-testing-library] as the
test renderer, this guide will be targeted towards these two libraries

### Initializing window.matchMedia

If one of your components or a component from `react-md` uses the `useAppSize`
or `useMediaQuery` hooks, your tests might fail due to `window.matchMedia` being
`undefined`. In this case, you'll want to create or update a `testSetup.ts` (or
`testSetup.js`) to include a very simple polyfill.

Edit `testSetup.ts`:

```diff
+const {
+  DEFAULT_DESKTOP_MIN_WIDTH,
+  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
+} = require('@react-md/utils/lib/sizing/constants');
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

This default polyfill will make all your tests run in desktop mode by default.

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
