export type FocusChangeHandler = (focusedId: string | null) => void;

export interface IKeyboardTrackerContext {
  focusedId: string | null;
  setFocusedId: FocusChangeHandler;
}
