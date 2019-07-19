/* eslint-disable react/prop-types */
import React, { createContext, useContext, FC, ReactNode } from "react";
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
export function useInteractionModeContext(): UserInteractionMode {
  return useContext(InteractionMode);
}

/**
 * A component that should be mounted once in your app near the top of the tree to
 * determine the current interaction mode for your app.
 */
export const InteractionModeListener: FC<{
  children: ReactNode;
}> = ({ children }) => {
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
};
