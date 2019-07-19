import { FC } from "react";

import { Omit } from "../omit";
import useScrollListener, { Options } from "./useScrollListener";

export type ScrollListenerProps = Omit<Options<HTMLElement>, "enabled">;

/**
 * This is a simple component wrapper for the `useScrollListener` hook.
 */
const ScrollListener: FC<ScrollListenerProps> = props => {
  useScrollListener(props);
  return null;
};

export default ScrollListener;
