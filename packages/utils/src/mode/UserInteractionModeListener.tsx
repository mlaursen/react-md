import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from "react";

import { UserInteractionMode } from "./types";
import { useInteractionMode } from "./useInteractionMode";

/**
 * @private
 */
const modeContext = createContext<UserInteractionMode>("mouse");

/**
 * @private
 */
const parentContext = createContext(false);

/**
 * @private
 */
const { Provider: UserInteractionModeProvider } = modeContext;

/**
 * @private
 */
const { Provider: ParentProvider } = parentContext;

/**
 * Returns the current user interaction mode.
 *
 * @return {@link UserInteractionMode}
 */
export function useUserInteractionMode(): UserInteractionMode {
  return useContext(modeContext);
}

/**
 * Example:
 *
 * ```ts
 * const isKeyboard = useIsUserInteractionMode("keyboard");
 * // do stuff if keyboard only
 * ```
 *
 * @param mode The {@link UserInteractionMode} to check against.
 * @return `true` if the current user interaction mode matches the provided
 * mode.
 */
export function useIsUserInteractionMode(mode: UserInteractionMode): boolean {
  return useInteractionMode() === mode;
}

export interface UserInteractionModeListenerProps {
  /**
   * The `children` are required since this component basically does nothing
   * other than providing a `className` to the `document.body` otherwise.
   */
  children: ReactNode;
}

/**
 * This component is used to determine how the user is current interacting with
 * your app as well as modifying the `document.body`'s `className` with the
 * current mode. This is what allows the `rmd-utils-phone-only`,
 * `rmd-utils-keyboard-only`, and `rmd-utils-mouse-only` mixins to work.
 *
 * @since 2.6.0 Renamed from `InteractionModeListener`
 * @throws When this component has been mounted multiple times in your app.
 */
export function UserInteractionModeListener({
  children,
}: UserInteractionModeListenerProps): ReactElement {
  const mode = useInteractionMode();
  if (useContext(parentContext)) {
    throw new Error(
      "Mounted multiple `UserInteractionModeListener` components."
    );
  }

  return (
    <UserInteractionModeProvider value={mode}>
      <ParentProvider value>{children}</ParentProvider>
    </UserInteractionModeProvider>
  );
}

/**
 * @deprecated Use the `UserInteractionModeListener` component instead.
 * @since 2.6.0
 */
export const InteractionModeListener = UserInteractionModeListener;

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    UserInteractionModeListener.propTypes = {
      children: PropTypes.node.isRequired,
    };
  } catch (e) {}
}
