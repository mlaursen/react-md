import { FunctionComponent } from "react";

import { Omit } from "./omit";
import useScrollListener, { Options } from "./useScrollListener";

export interface ScrollListenerProps extends Omit<Options, "enabled"> {}

const ScrollListener: FunctionComponent<ScrollListenerProps> = props => {
  useScrollListener(props);
  return null;
};

export default ScrollListener;
