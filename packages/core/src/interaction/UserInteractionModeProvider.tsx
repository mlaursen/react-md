"use client";

import {
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * This is the current mode for how your user is interacting with your app. This
 * will be used to determine which type of state styles should be applied at the
 * time of interacting with an element on your page.
 *
 * @defaultValue `"mouse"`
 */
export type UserInteractionMode = "keyboard" | "mouse" | "touch";

/** @internal */
interface UserInteractionModeContext {
  __root: boolean;
  mode: UserInteractionMode;
}

const context = createContext<UserInteractionModeContext>({
  __root: false,
  mode: "mouse",
});
context.displayName = "UserInteractionMode";
const { Provider } = context;

/**
 * @returns the current user interaction mode
 */
export function useUserInteractionMode(): UserInteractionMode {
  return useContext(context).mode;
}

/** @internal */
const TOUCH_TIMEOUT = 1200;

export interface UserInteractionModeProviderProps {
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * This component is used to determine how a user is interacting with your app
 * to update component functionality and applying the following class names to
 * the `document.body`:
 *
 * - `"rmd-mouse-mode"`
 * - `"rmd-keyboard-mode"`
 * - `"rmd-touch-mode"`
 *
 * Within `react-md`, these classes are used for the following behavior:
 * - only display `:focus` outlines while in `"rmd-keyboard-mode"`
 * - do not display `:hover` effects while in `"rmd-touch-mode"`
 *
 * @example Mount at the root of your app
 * ```tsx
 * import { createRoot } from "react-dom/client";
 * import { UserInteractionModeProvider } from "@react-md/core/interaction/UserInteractionModeProvider";
 * import App from "./App":
 *
 * const container = document.getElementById("root");
 * const root = createRoot(container);
 *
 * root.render(
 *   <UserInteractionModeProvider>
 *     <App />
 *   </UserInteractionModeProvider>
 * );
 * ```
 *
 * @throws "The `UserInteractionModeProvider` cannot be mounted multiple times."
 * if this component is mounted multiple times in your app.
 */
export function UserInteractionModeProvider(
  props: UserInteractionModeProviderProps
): ReactElement {
  const { children } = props;
  const { __root } = useContext(context);
  if (__root) {
    throw new Error(
      "The `UserInteractionModeProvider` cannot be mounted multiple times."
    );
  }

  const [mode, setMode] = useState<UserInteractionMode>("mouse");
  const lastTouchTime = useRef(0);
  const isTouchContextMenu = useRef(false);

  /**
   * This effect helps determine the current interaction mode by attaching the
   * required event listeners to the window. The `mode` will always be defaulted
   * to `mouse` at first since it has the least possibilities of causing errors
   * with styles since the mouse-only styles are normally just `:hover` effects.
   *
   * ## Switching between modes:
   *
   * ### While in `mouse` mode:
   *
   * - any `keydown` event will switch to `keyboard` mode
   *   - this does have the side effect of meta keys also causing the switch over,
   *     but it feels fine since it helps show the current focus in the document
   *     as well
   * - any `touchstart` event will switch to `touch` mode
   *
   * ### While in `keyboard` mode:
   *
   * - any `mousedown` event will switch to `mouse` mode
   *   - it is perfectly okay to move the mouse while in keyboard mode, but still
   *     want to keep the keyboard styles until the user actually starts clicking
   * - any `touchstart` event will switch to `touch` mode
   *
   * ### While in `touch` mode:
   *
   * - any `mousemove` event will switch to `mouse` mode, but **only** if there
   *   hasn't been a `contextmenu` event within the last `1.2s`
   *   - you can really only switch back to `mouse` mode if you are using the
   *     devtools to emulate devices OR using a touch-desktop. I don't know how
   *     common this really is though.
   *   - touching the screen will always fire a `mousemove` event (which is why
   *     the `:hover` styles are normally with `rmd-utils-mouse-only`) and even
   *     after the `contextmenu` event. Normally want to go back to `mouse` mode
   *     when the mouse re-enters the `window`
   *
   * Note: It's currently impossible to switch from `touch` to `keyboard`
   * immediately. You'd first need to switch to `mouse` and then to `keyboard`. I
   * don't really know of any use-cases other than the weird touch-desktop stuff
   * and I have no experience using them.
   */
  useEffect(() => {
    const enableMouseMode = (): void => {
      setMode("mouse");
    };
    const enableKeyboardMode = (): void => {
      setMode("keyboard");
    };

    const handleTouchStart = (): void => {
      lastTouchTime.current = Date.now();
      isTouchContextMenu.current = false;
      setMode("touch");
    };

    const handleMouseMove = (): void => {
      if (
        isTouchContextMenu.current ||
        Date.now() - lastTouchTime.current < TOUCH_TIMEOUT
      ) {
        isTouchContextMenu.current = false;
        return;
      }

      enableMouseMode();
    };
    const handleContextMenu = (): void => {
      isTouchContextMenu.current = true;
    };

    const className = `rmd-${mode}-mode`;
    document.body.classList.add(className);
    window.addEventListener("touchstart", handleTouchStart, true);
    if (mode === "mouse") {
      window.addEventListener("keydown", enableKeyboardMode, true);
    } else if (mode === "keyboard") {
      window.addEventListener("mousedown", enableMouseMode, true);
    } else {
      window.addEventListener("mousemove", handleMouseMove, true);
      window.addEventListener("contextmenu", handleContextMenu, true);
    }

    return () => {
      document.body.classList.remove(className);
      window.removeEventListener("touchstart", handleTouchStart, true);
      if (mode === "mouse") {
        window.removeEventListener("keydown", enableKeyboardMode, true);
      } else if (mode === "keyboard") {
        window.removeEventListener("mousedown", enableMouseMode, true);
      } else {
        window.removeEventListener("mousemove", handleMouseMove, true);
        window.removeEventListener("contextmenu", handleContextMenu, true);
      }
    };
  }, [mode]);

  const value = useMemo<UserInteractionModeContext>(
    () => ({
      mode,
      __root: true,
    }),
    [mode]
  );
  return <Provider value={value}>{children}</Provider>;
}
