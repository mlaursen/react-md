/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type AnyFunction, type ThrottledFunction } from "../types.js";

/**
 * @since 6.0.0
 */
export function throttle<F extends AnyFunction>(
  fn: F,
  wait: number
): ThrottledFunction<F> {
  let args: Parameters<F>;
  let result: ReturnType<F>;
  let timeout: NodeJS.Timeout | undefined;
  let lastCalledTime = 0;

  const throttled: ThrottledFunction<F> = (...nextArgs) => {
    args = nextArgs;

    const now = Date.now();
    const remaining = wait - (now - lastCalledTime);
    if (remaining <= 0 || remaining > wait) {
      lastCalledTime = now;
      result = fn(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        lastCalledTime = Date.now();
        timeout = undefined;
        result = fn(...args);
      }, remaining);
    }

    return result;
  };
  throttled.cancel = () => {
    clearTimeout(timeout);
  };

  return throttled;
}
