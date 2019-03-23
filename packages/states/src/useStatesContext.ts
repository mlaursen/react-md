import { useContext } from "react";
import { StatesContext } from "./context";

/**
 * A simple hook that can be used to get the Ripple context. This is used
 * behind the scenes for the Ripple component and _probably_ shouldn't be
 * used anywhere else. It's mostly used to just use the context defaults when
 * the timeout or classNames are undefined.
 */
export default function useStatesContext() {
  return useContext(StatesContext);
}
