import { FunctionComponent, useEffect } from "react";
import { delegateEvent } from "@react-md/utils";

export interface ResizeListenerProps {
  /**
   * A function to call when the app is resized.
   */
  onResize: EventListener;

  /**
   * Any event listener options to use when attaching the event.
   */
  options?: AddEventListenerOptions;
}

/**
 * This is a simple component that will attach a throttled resize event listener
 * when mounted, and detach when it unmounts.
 *
 * This component only works for entire app resize events. If you are looking for
 * specific element resize events, check out the `ResizeObserver` component instead.
 */
const ResizeListener: FunctionComponent<ResizeListenerProps> = ({
  onResize,
  options,
}) => {
  useEffect(() => {
    const eventHandler = delegateEvent("resize", window, true, options);
    eventHandler.add(onResize);

    return () => {
      eventHandler.remove(onResize);
    };
  }, [options, onResize]);

  return null;
};

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    ResizeListener.propTypes = {
      onResize: PropTypes.func.isRequired,
      options: PropTypes.object,
    };
  }
}

export default ResizeListener;
