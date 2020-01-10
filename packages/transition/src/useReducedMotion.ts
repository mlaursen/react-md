import { createContext, useContext } from "react";
import { TransitionProps } from "react-transition-group/Transition";

const context = createContext(false);

export const { Provider } = context;

type TransitionConfig = Pick<TransitionProps, "appear" | "exit" | "enter">;

/**
 * Checks if the user has enabled reduced motion from their OS configuration.
 * This is used within react-md to disable all the transitions when this
 * option is set.
 */
export default function useReducedMotion(): boolean {
  return useContext(context);
}

export function useReducedMotionTransition(
  config: TransitionConfig
): TransitionConfig {
  if (useReducedMotion()) {
    return {
      appear: false,
      enter: false,
      exit: false,
    };
  }

  return config;
}
