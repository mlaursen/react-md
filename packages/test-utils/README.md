# @react-md/test-utils

A collection of polyfills and additional utils to help with testing react-md.

## Installation

```sh
npm install --save @react-md/core
npm install --save-dev @react-md/test-utils
```

```sh
yarn add @react-md/core
yarn add -D @react-md/test-utils
```

```sh
pnpm add @react-md/core
pnpm add -D @react-md/test-utils
```

## Adding Pollyfills

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
import "@react-md/test-utils/polyfills";

// any other setup
```

```ts
// jest.setup.ts
// or import the polyfills individually
import "@react-md/test-utils/intersection-observer-polyfill";
import "@react-md/test-utils/media-query-polyfill";
import "@react-md/test-utils/resize-observer-polyfill";
import "@react-md/test-utils/scroll-into-view-polyfill";
```
