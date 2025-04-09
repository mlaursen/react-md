import { afterEach, jest } from "@jest/globals";

import { cleanupRO } from "../mocks/ResizeObserver.js";

/**
 * @param restoreAllMocks - Set to `false` to prevent `jest.restoreAllMocks()` from being
 * called.
 */
export function cleanupResizeObserverAfterEach(restoreAllMocks = true): void {
  cleanupRO(afterEach, restoreAllMocks ? jest.restoreAllMocks : undefined);
}
