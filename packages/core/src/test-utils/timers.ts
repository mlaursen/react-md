import { jest } from "@jest/globals";

/**
 * @example
 * ```ts
 * import { useImmediateRaf } from "@react-md/core/test-utils";
 *
 * describe("some test suite", () => {
 *   it("should test something with requestAnimationFrame", () => {
 *     const raf = useImmediateRaf();
 *
 *     // do some testing with requestAnimationFrame
 *
 *     // reset to original at the end of the test
 *     raf.mockRestore()
 *   });
 * });
 * ```
 *
 * @example
 * Automatic Cleanup
 * ```ts
 * import { useImmediateRaf } from "@react-md/core/test-utils";
 *
 * afterEach(() => {
 *   jest.restoreAllMocks();
 * });
 *
 * describe("some test suite", () => {
 *   it("should test something with requestAnimationFrame", () => {
 *     const raf = useImmediateRaf();
 *
 *     // do some testing with requestAnimationFrame
 *   });
 * });
 * ```
 *
 * @remarks \@since 6.0.0
 */
export const useImmediateRaf = (): jest.SpiedFunction<
  typeof requestAnimationFrame
> =>
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb(0);
    return 0;
  });
