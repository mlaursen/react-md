import React from "react";

export interface IKeyboardContext {
  enabled: boolean;
}

const Context = React.createContext<IKeyboardContext>({ enabled: false });

export default Context;

const { Provider, Consumer } = Context;

export { Provider, Consumer };
