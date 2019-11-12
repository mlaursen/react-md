import { FC } from "react";

import useResizeListener, { ResizeListenerOptions } from "./useResizeListener";

export type ResizeListenerProps = Omit<ResizeListenerOptions, "enabled">;

type DefaultProps = Required<Pick<ResizeListenerProps, "immediate">>;
type WithDefaultProps = ResizeListenerProps & DefaultProps;

/**
 * This is a simple component that will attach a throttled resize event listener
 * when mounted, and detach when it unmounts.
 *
 * This component only works for entire app resize events. If you are looking for
 * specific element resize events, check out the `ResizeObserver` component instead.
 */
const ResizeListener: FC<ResizeListenerProps> = props => {
  const { onResize, options, immediate } = props as WithDefaultProps;

  useResizeListener({ onResize, options, immediate, enabled: true });
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
