import React, { memo, FunctionComponent, ReactNode } from "react";

import { KeyboardTrackerContext } from "./context";
import { IKeyboardTrackerContext } from "./types.d";

const { Provider } = KeyboardTrackerContext;

const KeyboardTrackerProvider: FunctionComponent<
  IKeyboardTrackerContext & { children: ReactNode }
> = ({ children, focusedId, setFocusedId }) => {
  return <Provider value={{ focusedId, setFocusedId }}>{children}</Provider>;
};

export default memo(KeyboardTrackerProvider);
