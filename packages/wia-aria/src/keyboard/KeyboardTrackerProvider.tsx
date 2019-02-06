import React, { memo, FunctionComponent } from "react";

import { KeyboardTrackerContext } from "./context";
import { IKeyboardTrackerContext } from "./types.d";

const { Provider } = KeyboardTrackerContext;

const KeyboardTrackerProvider: FunctionComponent<IKeyboardTrackerContext> = ({
  children,
  focusedId,
  setFocusedId,
}) => {
  return <Provider value={{ focusedId, setFocusedId }}>{children}</Provider>;
};

export default memo(KeyboardTrackerProvider);
