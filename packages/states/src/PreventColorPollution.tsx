import React, { createContext, FunctionComponent, ReactNode } from "react";

/**
 * This is a global context that will update all interactable elements
 * that are using the `FixColorPollution` element to render their children
 * so that the interaction states do not modify the text color. This is
 * disabled by default since it might seem confusing to modify the dom
 * structure so much to fix a weird issue out of the box. It is recommended
 * to enable it though.
 */
export const ColorPollutionContext = createContext(false);

/**
 * This is an extremely simple component that will update the `ColorPollutionContext`
 * to have a value of `true` isntead of false.
 */
const PreventColorPollution: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => (
  <ColorPollutionContext.Provider value={true}>
    {children}
  </ColorPollutionContext.Provider>
);

export default PreventColorPollution;
