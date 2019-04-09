import { FunctionComponent, useEffect, useRef } from "react";
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

  /**
   * Boolean if the resize event handler should be called immediately
   * once the component is mounted. The default behavior will be to only
   * call the `onResize` event immediately client side and can never be
   * invoked server side since it relise on the `window` to dispatch a
   * `UIEvent`.
   * */
  immediate?: boolean;
}

type DefaultProps = Required<Pick<ResizeListenerProps, "immediate">>;
type WithDefaultProps = ResizeListenerProps & DefaultProps;

/**
 * This is a simple component that will attach a throttled resize event listener
 * when mounted, and detach when it unmounts.
 *
 * This component only works for entire app resize events. If you are looking for
 * specific element resize events, check out the `ResizeObserver` component instead.
 */
const ResizeListener: FunctionComponent<ResizeListenerProps> = props => {
  const { onResize, options, immediate } = props as WithDefaultProps;

  // creating a ref so the event handler doesn't need to be updated each rerener
  // if using an arrow function for the resize handler
  const resizeRef = useRef(onResize);
  useEffect(() => {
    resizeRef.current = onResize;
  });

  useEffect(() => {
    const eventHandler = delegateEvent("resize", window, true, options);
    const handler = (event: Event) => resizeRef.current(event);
    eventHandler.add(handler);

    if (immediate && typeof window !== "undefined") {
      window.dispatchEvent(new UIEvent("resize"));
    }

    return () => {
      eventHandler.remove(handler);
    };
  }, [options]);

  return null;
};

const defaultProps: DefaultProps = {
  immediate: typeof window !== "undefined",
};

ResizeListener.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    ResizeListener.propTypes = {
      onResize: PropTypes.func.isRequired,
      options: PropTypes.object,
      immediate: PropTypes.bool,
    };
  }
}

export default ResizeListener;
