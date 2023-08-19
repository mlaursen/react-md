# @react-md/core/test-utils

A collection of polyfills, utils, and test renderers to help with testing
projects using `react-md`. Everything from `@testing-library/react` and
`@testing-library/user-event` will be re-exported for convenience.

## Installation

In order to use the test utils, you just have `jest` and the testing library
dependencies installed.

```sh
npm install --save-dev \
  jest \
  @jest/globals \
  @jest/types \
  @testing-library/dom \
  @testing-library/jest-dom \
  @testing-library/react \
  @testing-library/user-event
```

```sh
yarn add -D \
  jest \
  @jest/globals \
  @jest/types \
  @testing-library/dom \
  @testing-library/jest-dom \
  @testing-library/react \
  @testing-library/user-event
```

```sh
pnpm add -D \
  jest \
  @jest/globals \
  @jest/types \
  @testing-library/dom \
  @testing-library/jest-dom \
  @testing-library/react \
  @testing-library/user-event
```

## Adding Polyfills

```ts
// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
```

```ts
// jest.setup.ts
import "@testing-library/jest-dom";

// add all the polyfills
import "@react-md/core/test-utils/polyfills";

// or pick and choose from the following polyfills as needed
import "@react-md/core/test-utils/polyfills/IntersectionObserver";
import "@react-md/core/test-utils/polyfills/mediaQuery";
import "@react-md/core/test-utils/polyfills/offsetParent";
import "@react-md/core/test-utils/polyfills/ResizeObserver";
import "@react-md/core/test-utils/polyfills/scrollIntoView";

// any other setup
```

## Custom Test Renderer

My preferred method of making all the global context providers, data stores,
`react-md` configuration, etc available for each test is to create a utility file
that re-exports everything from `@react-md/core/test-utils`,
`@testing-library/react`, and `@testing-library/user-event`. The example below
shows a possible setup.

> See [Custom Renderer](https://testing-library.com/docs/react-testing-library/setup#custom-render) for additional context.

```diff
// src/__tests__/MyComponent.tsx
-import { render, userEvent } from "@testing-library/react";
+import { render, userEvent } from "../test-utils";
```

```tsx
// src/rmdConfig.tsx
import type { ReactMDCoreConfiguration } from "@react-md/core";

export const rmdConfig: ReactMDCoreConfiguration = {
  // any icon overrides. Using material icons as an example
  icons: {
    back: <KeyboardArrowLeftIcon />,
    close: <CloseIcon />,
    checkbox: <CheckBoxOutlineBlankIcon />,
    checkboxChecked: <CheckBoxIcon />,
    checkboxIndeterminate: <IndeterminateCheckBoxIcon />,
    dropdown: <ArrowDropDownIcon />,
    error: <ErrorOutlineIcon />,
    expander: <KeyboardArrowDownIcon />,
    forward: <KeyboardArrowRightIcon />,
    menu: <MenuIcon />,
    notification: <NotificationsIcon />,
    password: <RemoveRedEyeIcon />,
    radio: <RadioButtonUncheckedIcon />,
    radioChecked: <RadioButtonCheckedIcon />,
    selected: <CheckIcon />,
    sort: <ArrowUpwardIcon />,
    upload: <FileUploadIcon />,
  },

  // any other global changes
  // ssr: true,

  // colorSchemeMode: "system",
};
```

```tsx
// src/test-utils.tsx
import type { ReactElement } from "react";
import type { ReactMDRenderOptions, RenderOptions } from "@react-md/test-utils";
import { rmdRender } from "@react-md/core/test-utils";

import { rmdConfig } from "./rmdConfig";
import { MyCustomProviders } from "./MyCustomProviders";

export * from "@react-md/core/test-utils";

export const render = (
  ui: ReactElement,
  options?: ReactMDRenderOptions
): RenderResult =>
  rmdRender(ui, {
    ...options,
    rmdConfig: {
      ...rmdConfig,
      ...options?.rmdConfig,
    },
    wrapper: ({ children }) => (
      <MyCustomProviders>{children}</MyCustomProviders>
    ),
  });
```
