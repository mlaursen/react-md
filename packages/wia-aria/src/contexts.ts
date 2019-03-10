import { createContext } from "react";
import { KeyboardFocusContextType } from "./types.d";

let warnedOnce = false;

/**
 * The root context for tracking keyboard movement and focus. This is
 * really only exposed in case my provided hooks or built-in functionality
 * don't meet all the requirements out-of-the-box for your app.
 *
 * Generally the `useKeyboardContext` hook should work, but this can be used
 * to automatically add the context to class components as well.
 *
 * NOTE: The default implementation will throw an error with a stack trace if
 * you forgot to initialize the `KeyboardTracker` component in your app.
 */
export const KeyboardFocusContext = createContext<KeyboardFocusContextType>({
  focusedId: null,
  setFocusedId: (id: string | null) => {
    if (process.env.NODE_ENV !== "production" && !warnedOnce) {
      console.error(
        "Attempted to set the app's keyboard focus to an element with id of " +
          `\`${id}\` without initializing a parent \`KeyboardTracker\` component. ` +
          "Keyboard specific functionality will not work until the `KeyboardTracker` " +
          "is initialized."
      );
      console.error(new Error().stack);
      warnedOnce = true;
    }
  },
  isKeyboardMode: false,
});
