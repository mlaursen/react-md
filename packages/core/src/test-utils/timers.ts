import { jest } from "@jest/globals";

/**
 * @example
 * ```ts
 * import { testImmediateRaf } from "@react-md/core/test-utils";
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
 * import { testImmediateRaf } from "@react-md/core/test-utils";
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
export const testImmediateRaf = (): jest.SpiedFunction<
  typeof requestAnimationFrame
> =>
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb(0);
    return 0;
  });
