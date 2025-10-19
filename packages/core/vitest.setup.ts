import { beforeAll, vi } from "vitest";

import "./src/test-utils/polyfills/index.js";
import "./src/test-utils/vitest/setup.js";

beforeAll(() => {
  // @ts-expect-error This is a hacky workaround to fix the fake timers with testing-library/user-event
  globalThis.jest = vi;
});
