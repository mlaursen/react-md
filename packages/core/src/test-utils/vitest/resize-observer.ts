import { afterEach, vi } from "vitest";

import { cleanupRO } from "../mocks/ResizeObserver.js";

/**
 * @param restoreAllMocks - Set to `false` to prevent `vi.restoreAllMocks()` from being
 * called.
 */
export function cleanupResizeObserverAfterEach(restoreAllMocks = true): void {
  cleanupRO(afterEach, restoreAllMocks ? vi.restoreAllMocks : undefined);
}
