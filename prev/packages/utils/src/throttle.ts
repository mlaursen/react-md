/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This is really the type definition for the Parameters type provided by TS,
 * but created a type alias to help with documentation.
 */
export type ThrottleableFunction = (...args: any[]) => any;

/**
 * A strongly typed throttled version of a throttleable function.
 */
export type ThrottledFunction<F extends ThrottleableFunction> = (
  ...args: Parameters<F>
) => ReturnType<F>;

/**
 * Creates a throttled version of a function so that it'll be called with
 * trailing and leading calls. Since I always get this confused with `debounce`,
 * here's a quick summary of the differences:
 *
 * - debounce will wait to call the function until it hasn't been called again
 *   for the wait duration without trailing or leading calls. If it has the
 *   trailing and leading calls, I can't figure out how it's different than
 *   throttle.
 * - throttle will be called each time it is available to be called.
 *
 * So debounce is great for things like auto-save features if you want to save
 * whenever the user stops typing for a few seconds while throttle is good for
 * things like sending an API request when the user is typing so that it isn't
 * sent every keystroke, but every few letters. You _could_ also do debounce
 * here, but it'll feel more "responsive" to the user when throttled.
 *
 * @param fn - The function that should be throttled
 * @param wait - The number of milliseconds to wait before calling the function
 * again
 * @returns a throttled version of the function that'll return the last computed
 * value if it was called again during the "wait" period.
 */
export function throttle<F extends ThrottleableFunction>(
  fn: F,
  wait: number
): ThrottledFunction<F> {
  let lastCalledTime = 0;
  let timeout: number | undefined;
  let result: ReturnType<F>;
  let args: Parameters<F>;

  function trailingCall(): void {
    lastCalledTime = Date.now();
    timeout = undefined;
    result = fn(...args);
  }

  return function throttled(...nextArgs: Parameters<F>): ReturnType<F> {
    args = nextArgs;

    const now = Date.now();
    const remaining = wait - (now - lastCalledTime);
    if (remaining <= 0 || remaining > wait) {
      lastCalledTime = now;
      result = fn(...args);
    } else if (!timeout) {
      timeout = window.setTimeout(trailingCall, remaining);
    }

    return result;
  };
}
