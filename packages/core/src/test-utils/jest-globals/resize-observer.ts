import { afterEach, jest } from "@jest/globals";

import { cleanupResizeObserverAfterEach as cleanup } from "../mocks/ResizeObserver.js";

/**
 * @param restoreAllMocks - Set to `false` to prevent `jest.restoreAllMocks()` from being
 * called.
 */
export function cleanupResizeObserverAfterEach(restoreAllMocks = true): void {
  cleanup(afterEach, restoreAllMocks ? jest.restoreAllMocks : undefined);
}
