import { Reducer, useReducer } from "react";
import { KeyboardFocusedId, IKeyboardFocusState } from "../types.d";

export const ENABLE_KEYBOARD_MODE = "ENABLE_KEYBOARD_MODE";
export interface IEnableKeyboardModeAction {
  type: typeof ENABLE_KEYBOARD_MODE;
}
export type EnableKeyboardModeActionCreator = () => IEnableKeyboardModeAction;

/**
 * The action creator to enable keyboard mode. This is normally called immediately
 * after a keydown event.
 */
export const enableKeyboardMode: EnableKeyboardModeActionCreator = () => ({
  type: ENABLE_KEYBOARD_MODE,
});

export const DISABLE_KEYBOARD_MODE = "DISABLE_KEYBOARD_MODE";
export interface IDisableKeyboardModeAction {
  type: typeof DISABLE_KEYBOARD_MODE;
}
export type DisableKeyboardModeActionCreator = () => IDisableKeyboardModeAction;

/**
 * The action creator to disable keyboard mode. This is normally called immediately
 * after a mousedown event.
 */
export const disableKeyboardMode: DisableKeyboardModeActionCreator = () => ({
  type: DISABLE_KEYBOARD_MODE,
});

export const SET_FOCUSED_ID = "SET_FOCUSED_ID";
export interface ISetFocusedIdAction {
  type: typeof SET_FOCUSED_ID;
  focusedId: KeyboardFocusedId;
}
export type SetFocusedIdActionCreator = (
  focusedId: KeyboardFocusedId
) => ISetFocusedIdAction;

/**
 * An action creator to just update the focused id. The main purpose of this functionality
 * is for dealing with temporary widgets like menus and dialogs so that the keyboard
 * focus can be tracked even if the user didn't initiate the widget with a keyboard event.
 * When the user triggers a keydown event, the focus will appear immediately.
 *
 * @param focusedId The next focused id to use
 */
export const setFocusedId: SetFocusedIdActionCreator = (
  focusedId: KeyboardFocusedId
) => ({
  type: SET_FOCUSED_ID,
  focusedId,
});

type KeyboardFocusReducer = Reducer<
  IKeyboardFocusState,
  IEnableKeyboardModeAction | IDisableKeyboardModeAction | ISetFocusedIdAction
>;

export const reducer: KeyboardFocusReducer = (state, action) => {
  switch (action.type) {
    case ENABLE_KEYBOARD_MODE:
      return { ...state, isKeyboardMode: true };
    case DISABLE_KEYBOARD_MODE:
      return { isKeyboardMode: false, focusedId: null };
    case SET_FOCUSED_ID:
      return {
        ...state,
        focusedId: action.focusedId,
      };
    default:
      return state;
  }
};

/**
 * This hook is used to be able to interact with the keyboard focus state. It is really
 * just used for the `KeyboardTracker` component itself.
 *
 * @param defaultFocusedId The default focused id to use
 * @param defaultKeyboardMode Boolean if the keyboard focus state should start in keyboard
 * mode. When this is omitted, it will start enabled if the `defaultFocusId` is truthy
 */
export default function useKeyboardFocusState(
  defaultFocusedId: KeyboardFocusedId,
  defaultKeyboardMode: boolean = !!defaultFocusedId
) {
  const [state, dispatch] = useReducer<KeyboardFocusReducer>(reducer, {
    focusedId: defaultFocusedId,
    isKeyboardMode: defaultKeyboardMode,
  });

  return {
    ...state,
    enable: () => dispatch(enableKeyboardMode()),
    disable: () => dispatch(disableKeyboardMode()),
    setFocusedId: (focusedId: KeyboardFocusedId) =>
      dispatch(setFocusedId(focusedId)),
  };
}
