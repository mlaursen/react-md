import { ResizeListenerOptions, useResizeListener } from "./useResizeListener";

export type ResizeListenerProps = Omit<ResizeListenerOptions, "enabled">;

/**
 * This is a simple component that will attach a throttled resize event listener
 * when mounted, and detach when it unmounts.
 *
 * This component only works for entire app resize events. If you are looking
 * for specific element resize events, check out the `ResizeObserver` component
 * instead.
 */
export function ResizeListener({
  onResize,
  options,
  immediate = typeof window !== "undefined",
}: ResizeListenerProps): null {
  useResizeListener({ onResize, options, immediate, enabled: true });
  return null;
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ResizeListener.propTypes = {
      onResize: PropTypes.func.isRequired,
      options: PropTypes.object,
      immediate: PropTypes.bool,
    };
  } catch (e) {}
}
