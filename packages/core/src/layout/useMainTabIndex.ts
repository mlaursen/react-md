"use client";
import { useUserInteractionMode } from "../interaction/UserInteractionModeProvider.js";

/**
 * This hook is used to return a tab index of `-1` whenever the user is using a
 * keyboard for the `SkipToMainContent` to work correctly.
 *
 * @remarks \@since 6.0.0
 */
export function useMainTabIndex(tabIndex?: number): number | undefined {
  const keyboard = useUserInteractionMode() === "keyboard";
  if (keyboard && typeof tabIndex === "undefined") {
    tabIndex = -1;
  }

  return tabIndex;
}
