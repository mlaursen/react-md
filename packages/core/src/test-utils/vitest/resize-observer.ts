import { afterEach, vi } from "vitest";

import { cleanupResizeObserverAfterEach as cleanup } from "../mocks/ResizeObserver.js";

/**
 * @param restoreAllMocks - Set to `false` to prevent `vi.restoreAllMocks()` from being
 * called.
 */
export function cleanupResizeObserverAfterEach(restoreAllMocks = true): void {
  cleanup(afterEach, restoreAllMocks ? vi.restoreAllMocks : undefined);
}
