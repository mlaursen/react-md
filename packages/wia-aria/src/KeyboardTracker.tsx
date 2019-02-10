import { FunctionComponent } from "react";
import useKeyboardFocusState from "./hooks/useKeyboardFocusState";
import { KeyboardFocusedId } from "./types.d";

export interface IKeyboardTrackerProps {
  defaultFocusedId?: KeyboardFocusedId;
  defaultKeyboardMode?: boolean;
}

interface IKeyboardTrackerDefaultProps {
  defaultFocusedId: KeyboardFocusedId;
  defaultKeyboardMode: boolean;
}

type KeyboardTrackerWithDefaultProps = IKeyboardTrackerProps &
  IKeyboardTrackerDefaultProps;

const KeyboardTracker: FunctionComponent<IKeyboardTrackerProps> = props => {
  const {
    defaultFocusedId,
    defaultKeyboardMode,
  } = props as KeyboardTrackerWithDefaultProps;
  const {
    focusedId,
    isKeyboardMode,
    enable,
    disable,
    setFocusedId,
  } = useKeyboardFocusState(defaultFocusedId, defaultKeyboardMode);
  return null;
};

const defaultProps: IKeyboardTrackerDefaultProps = {
  defaultFocusedId: null,
  defaultKeyboardMode: false,
};

KeyboardTracker.defaultProps = defaultProps;

export default KeyboardTracker;
