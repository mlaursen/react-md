/**
 * @example Wait some duration
 * ```ts
 * import { wait } from "@react-md/core";
 *
 * console.log('start');
 * await wait(5000);
 * console.log('it has been five seconds');
 * ```
 *
 * This util was just added to support random waits for mocking data and random
 * throttling.
 *
 * @since 6.0.0
 */
export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), ms));
