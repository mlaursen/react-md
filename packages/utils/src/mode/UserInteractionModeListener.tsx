import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from "react";

import { UserInteractionMode } from "./types";
import { useInteractionMode } from "./useInteractionMode";

/**
 * @internal
 */
const modeContext = createContext<UserInteractionMode>("mouse");

/**
 * @internal
 */
const parentContext = createContext(false);

/**
 * @internal
 */
const { Provider: UserInteractionModeProvider } = modeContext;

/**
 * @internal
 */
const { Provider: ParentProvider } = parentContext;

/**
 * Returns the current user interaction mode.
 *
 * @returns {@link UserInteractionMode}
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
 * @param mode - The {@link UserInteractionMode} to check against.
 * @returns `true` if the current user interaction mode matches the provided
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
 * @remarks \@since 2.6.0 Renamed from `InteractionModeListener`
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
 * @remarks \@since 2.6.0
 */
export const InteractionModeListener = UserInteractionModeListener;

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  modeContext.displayName = "UserInteractionMode";
  parentContext.displayName = "MultiUserInteractionMode";

  try {
    const PropTypes = require("prop-types");

    UserInteractionModeListener.propTypes = {
      children: PropTypes.node.isRequired,
    };
  } catch (e) {}
}
