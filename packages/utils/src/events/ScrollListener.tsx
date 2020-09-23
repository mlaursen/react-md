import { useScrollListener, Options } from "./useScrollListener";

export type ScrollListenerProps = Omit<Options<HTMLElement>, "enabled">;

/**
 * This is a simple component wrapper for the `useScrollListener` hook.
 */
export function ScrollListener(props: ScrollListenerProps): null {
  useScrollListener(props);
  return null;
}
