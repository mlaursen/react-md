import { type MockInstance, vi } from "vitest";

/**
 * @since 6.0.0
 */
export type RafSpy = MockInstance<typeof requestAnimationFrame>;

/**
 * @example
 * ```ts
 * import { testImmediateRaf } from "@react-md/core/test-utils/vitest";
 *
 * describe("some test suite", () => {
 *   it("should test something with requestAnimationFrame", () => {
 *     const raf = testImmediateRaf();
 *
 *     // do some testing with requestAnimationFrame
 *
 *     // reset to original at the end of the test
 *     raf.mockRestore()
 *   });
 * });
 * ```
 *
 * @example Automatic Cleanup
 * ```ts
 * import { testImmediateRaf } from "@react-md/core/test-utils/vitest";
 *
 * afterEach(() => {
 *   jest.restoreAllMocks();
 * });
 *
 * describe("some test suite", () => {
 *   it("should test something with requestAnimationFrame", () => {
 *     const raf = testImmediateRaf();
 *
 *     // do some testing with requestAnimationFrame
 *   });
 * });
 * ```
 *
 * @since 6.0.0
 */
export const testImmediateRaf = (): RafSpy =>
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb(0);
    return 0;
  });
