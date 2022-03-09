import type { ScrollListenerHookOptions } from "./useScrollListener";
import { useScrollListener } from "./useScrollListener";

export type ScrollListenerProps = Omit<ScrollListenerHookOptions, "enabled">;

/**
 * This is a simple component wrapper for the `useScrollListener` hook.
 */
export function ScrollListener(props: ScrollListenerProps): null {
  useScrollListener(props);
  return null;
}
