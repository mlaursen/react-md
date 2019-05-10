import React, {
  createContext,
  useContext,
  FunctionComponent,
  ReactNode,
} from "react";
import {
  useModeClassName,
  useModeDetection,
  UserInteractionMode,
} from "./useModeDetection";

const InteractionMode = createContext<UserInteractionMode>("mouse");
const ParentContext = createContext(false);

/**
 * Gets the current interaction mode of the user.
 */
export function useInteractionModeContext() {
  return useContext(InteractionMode);
}

/**
 * A component that should be mounted once in your app near the top of the tree to
 * determine the current interaction mode for your app.
 */
export const InteractionModeListener: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  if (useContext(ParentContext)) {
    throw new Error("Nested `InteractionModeListener` components");
  }

  const mode = useModeDetection();
  useModeClassName(mode);

  return (
    <InteractionMode.Provider value={mode}>
      <ParentContext.Provider value={true}>{children}</ParentContext.Provider>
    </InteractionMode.Provider>
  );
};
