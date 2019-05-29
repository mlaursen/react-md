import { FC } from "react";

import { Omit } from "./omit";
import useScrollListener, { Options } from "./useScrollListener";

export interface ScrollListenerProps
  extends Omit<Options<HTMLElement>, "enabled"> {}

const ScrollListener: FC<ScrollListenerProps> = props => {
  useScrollListener(props);
  return null;
};

export default ScrollListener;
