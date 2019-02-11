import { useEffect, useMemo } from "react";
import { KeyboardFocusedId } from "../types.d";
import useKeyboardFocusState from "./useKeyboardFocusState";

/**
 * This hook will toggle the keyboard mode after any keydown event. It will also ensure
 * to remove the event listener on cleanup or if it is already in keyboard mode.
 *
 * This should probably just be used fro the `useKeyboardTrackerState` hook.
 *
 * @param isKeyboardMode Boolean if the app is already in keyboard mode
 * @param enable A function to call to enable the keyboard mode. This should normally
 * be the enable function from the `useKeyboardFocusState` hook.
 */
export function useKeyboardTrackerEnabler(
  isKeyboardMode: boolean,
  enable: () => void
) {
  useEffect(() => {
    if (isKeyboardMode) {
      return;
    }

    window.addEventListener("keydown", enable, true);
    return () => {
      window.removeEventListener("keydown", enable, true);
    };
  });
}

/**
 * This hook will toggle the keyboard mode off after any mousedown event. It will also
 * ensure to remove the event listener on clean or if the app is already not in keyboard
 * mode.
 *
 * This should probably just be used fro the `useKeyboardTrackerState` hook.
 *
 * @param isKeyboardMode Boolean if the app is in keyboard mode.
 * @param disable A function to call to disable the keyboard mode. This should normally
 * be the disable function from the `useKeyboardFocusState` hook.
 */
export function useKeyboardTrackerDisabler(
  isKeyboardMode: boolean,
  disable: () => void
) {
  useEffect(() => {
    if (!isKeyboardMode) {
      return;
    }

    window.addEventListener("mousedown", disable, true);
    return () => {
      window.removeEventListener("mousedown", disable, true);
    };
  });
}

/**
 * This hook is used to track window blur events to hide the focus behavior. It is
 * possible for the user to tab out of the page or use a shortcut to focus the url
 * of a page, and the keyboard focus state should be hidden for these cases. The
 * app will still be set in keyboard mode so that when the user Shift+Tabs back
 * or any other key combination to focus the page again, the focus behavior will
 * be shown.
 *
 * This should probably just be used fro the `useKeyboardTrackerState` hook.
 *
 * @param isKeyboardMode Boolean if the app is in keyboard mode.
 * @param setFocusedId A function to call to set the keyboard focused id to `null`.
 * This should normally be the setFocusedId function from the `useKeyboardFocusState`
 * hook.
 */
export function useKeyboardWindowBlurTracker(
  isKeyboardMode: boolean,
  setFocusedId: (focusedId: KeyboardFocusedId) => void
) {
  useEffect(() => {
    if (!isKeyboardMode) {
      return;
    }

    const handler = (event: FocusEvent) => {
      if (event.target === window) {
        setFocusedId(null);
      }
    };

    window.addEventListener("blur", handler);
    return () => {
      window.removeEventListener("blur", handler);
    };
  });
}

/**
 * This is the "default" keyboard tracker behavior that will update the focused id after
 * tab, enter, or spacebar presses as needed. The enter and spacebar presses are included
 * since there are times where a user might click something with a muouse, but then try
 * to use the keyboard there-after.
 *
 * This should probably just be used fro the `useKeyboardTrackerState` hook.
 *
 * @param focusedId The current focused id in the page
 * @param setFocusedId A function to call to set the keyboard focused id to `null`.
 * This should normally be the setFocusedId function from the `useKeyboardFocusState`
 * hook.
 * @param isKeyboardMode Boolean if the app is already in keyboard mode
 */
export function useKeyboardDefaultTracker(
  focusedId: KeyboardFocusedId,
  setFocusedId: (focusedId: KeyboardFocusedId) => void,
  isKeyboardMode: boolean
) {
  useEffect(() => {
    if (!isKeyboardMode) {
      return;
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const { key } = event;
      const target = event.target as HTMLElement;
      if (!target || !isKeyboardMode || !["Enter", " ", "Tab"].includes(key)) {
        return;
      }

      const el = target as HTMLElement;
      if (el.id && focusedId !== el.id) {
        setFocusedId(el.id);
      }
    };

    window.addEventListener("keyup", handleKeyUp, true);
    return () => {
      window.removeEventListener("keyup", handleKeyUp, true);
    };
  });
}

/**
 * This is the main keyboard tracker state hook that uses all the different hooks to
 * enable/disable keyboard mode as well as tracking the current focused id in the page.
 *
 * @param defaultFocusedId The default focused element id. This should probably be null,
 * the empty string, or omitted in 99% of the cases.
 * @param defaultKeyboardMode Boolean if the app is starting in keyboard mode. If this
 * is omitted, it will default to `true` if the `defaultFocusedId` is truthy.
 * @return a memoized keyboard tracker state.
 */
export default function useKeyboardTrackerState(
  defaultFocusedId: KeyboardFocusedId = null,
  defaultKeyboardMode: boolean = !!defaultFocusedId
) {
  const {
    enable,
    disable,
    setFocusedId,
    focusedId,
    isKeyboardMode,
  } = useKeyboardFocusState(defaultFocusedId, defaultKeyboardMode);

  useKeyboardTrackerEnabler(isKeyboardMode, enable);
  useKeyboardTrackerDisabler(isKeyboardMode, disable);
  useKeyboardWindowBlurTracker(isKeyboardMode, setFocusedId);
  useKeyboardDefaultTracker(focusedId, setFocusedId, isKeyboardMode);

  return useMemo(
    () => ({
      focusedId,
      isKeyboardMode,
      setFocusedId,
    }),
    [focusedId, isKeyboardMode, setFocusedId]
  );
}
