import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from "react";

import useModeClassName from "./useModeClassName";
import useModeDetection, { UserInteractionMode } from "./useModeDetection";

const InteractionMode = createContext<UserInteractionMode>("mouse");
const ParentContext = createContext(false);

/**
 * Gets the current interaction mode of the user.
 */
export function useInteractionModeContext(): UserInteractionMode {
  return useContext(InteractionMode);
}

export interface InteractionModeListenerProps {
  children: ReactNode;
}

/**
 * A component that should be mounted once in your app near the top of the tree
 * to determine the current interaction mode for your app.
 */
export function InteractionModeListener({
  children,
}: InteractionModeListenerProps): ReactElement {
  if (useContext(ParentContext)) {
    throw new Error("Nested `InteractionModeListener` components");
  }

  const mode = useModeDetection();
  useModeClassName(mode);

  return (
    <InteractionMode.Provider value={mode}>
      <ParentContext.Provider value>{children}</ParentContext.Provider>
    </InteractionMode.Provider>
  );
}

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    InteractionModeListener.propTypes = {
      children: PropTypes.node.isRequired,
    };
  } catch (e) {}
}
