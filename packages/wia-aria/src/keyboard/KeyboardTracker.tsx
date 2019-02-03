import React, {
  memo,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
} from "react";
import { useEventListener, Maybe } from "@react-md/utils";

import { KeyboardWiaAriaElement } from "../types";
import { FocusChangeHandler } from "./types.d";
import KeyboardTrackerProvider from "./KeyboardTrackerProvider";

export interface IKeyboardTrackerProps {
  children: ReactNode;

  /**
   * An optional function to call whenever the focused element's id changes.
   * When the app is no longer in "keyboard" mode, this value will be set
   * as `null`.
   */
  onFocusChange?: FocusChangeHandler;

  /**
   * An optional id of the element that should be focused. This probably
   * shouldn't change from the default of `null`.
   */
  defaultFocusedId?: string | null;

  /**
   * By default, the `KeyboardTracker` component will add errors in development
   * mode if an interactable/focusable element in the page gains focus via a tab
   * keypress and it **does not have an id**. If you would like to ignore these
   * warnings (not recommended), you can enable this prop.
   *
   * NOTE: If you want to have a fully accessible app, it is **really recommended**
   * to not enable this prop and fix any warnings that appear. react-md manages
   * the keyboard focus state with unique element ids, and if a focusable/interactable
   * element does not have an id, you loose all keyboard functionality for that
   * element.
   */
  disableUntrackableWarning?: boolean;
}

export interface IKeyboardTrackerDefaultProps {
  defaultFocusedId: string | null;
  disableUntrackableWarning: boolean;
}

export type KeyboardTrackerWithDefaultProps = IKeyboardTrackerProps &
  IKeyboardTrackerDefaultProps;

// this is just used in development to not spam errors about missing ids
// if an element repeatedly gains focus and does not have an id
let DEBUG_SET: Set<Element>;
if (process.env.NODE_ENV !== "production") {
  DEBUG_SET = new Set();
}

/**
 * This hook is used to manage keyboard focus tracking within the app.
 * It will manage the internal state of:
 * - the current focused element's id
 * - boolean if in keyboard mode (hasn't been a mousedown event since the last keydown event)
 *
 * This hook will also track base Tab movement keys from the keyboard and update the
 * internal state as necessary for default browser keyboard movement.
 */
function useKeyboardTracker(props: IKeyboardTrackerProps) {
  const {
    defaultFocusedId,
    disableUntrackableWarning,
    onFocusChange,
  } = props as KeyboardTrackerWithDefaultProps;
  const [focusedId, setFocusedId] = useState(defaultFocusedId);
  const [isKeyboardMode, setKeyboardMode] = useState(false);

  function reset() {
    if (isKeyboardMode) {
      setKeyboardMode(false);
    }

    if (focusedId !== null) {
      setFocusedId(null);
    }
  }

  function enableKeyboardMode() {
    if (!isKeyboardMode) {
      setKeyboardMode(true);
    }
  }

  useEventListener("mousedown", reset, {
    shouldUpdate: [focusedId === null, isKeyboardMode],
  });
  useEventListener("keydown", enableKeyboardMode, {
    shouldUpdate: [isKeyboardMode],
  });

  useEventListener(
    "keyup",
    (event: KeyboardEvent) => {
      const target = event.target as Maybe<KeyboardWiaAriaElement>;
      if (
        !target ||
        (target as HTMLElement | Window) === window ||
        event.key !== "Tab"
      ) {
        return;
      } else if (!target.id) {
        if (
          target.tagName !== "A" &&
          !disableUntrackableWarning &&
          process.env.NODE_ENV !== "production" &&
          !DEBUG_SET.has(target)
        ) {
          console.error(
            "The `KeyboardTracker` component's keyboard focus behavior was triggered for " +
              "an element without an id attached to it. Since there is not an id, the " +
              "additional keyboard specific functionality will not work for this element."
          );
          console.log(target);
          console.error(
            "This warning will be removed for a production build, but warnings can also " +
              "be removed in development by enabling the `disableUntrackableWarning` prop on your " +
              "`KeyboardTracker` component."
          );
          console.error(new Error().stack);
          DEBUG_SET.add(target);
        }

        return;
      }

      if (focusedId !== target.id) {
        setFocusedId(target.id);
      }
    },
    { shouldUpdate: [focusedId] }
  );

  useEffect(() => {
    if (!onFocusChange) {
      return;
    }

    onFocusChange(focusedId);
  }, [onFocusChange, focusedId]);

  return { focusedId, setFocusedId };
}

/**
 * The `KeyboardTracker` component is used to track keyboard movement throughout
 * your app. This should normally be one of the root elements in your react app
 * to get correct keyboard focus/interaction states.
 *
 * Normally components within react-md will automatically hook into this component
 * for accessibility and focus states, but you can also add some custom functionality
 * using the `KeyboardTrackerContext` or the exposed hooks.
 */
const KeyboardTracker: FunctionComponent<IKeyboardTrackerProps> = props => {
  const { children } = props;
  const { focusedId, setFocusedId } = useKeyboardTracker(props);

  return (
    <KeyboardTrackerProvider focusedId={focusedId} setFocusedId={setFocusedId}>
      {children}
    </KeyboardTrackerProvider>
  );
};

const defaultProps: IKeyboardTrackerDefaultProps = {
  defaultFocusedId: null,
  disableUntrackableWarning: false,
};

KeyboardTracker.defaultProps = defaultProps;

export default memo(KeyboardTracker);
