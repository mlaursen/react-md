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

export interface IPreventColorPollutionProps {
  enabled?: boolean;
  children: ReactNode;
}

export interface IPreventColorPollutionDefaultProps {
  enabled: boolean;
}

type PreventColorPollutionWithDefaultProps = IPreventColorPollutionProps &
  IPreventColorPollutionDefaultProps;

/**
 * This is an extremely simple component that will update the `ColorPollutionContext`
 * to have a value of `true` isntead of false.
 */
const PreventColorPollution: FunctionComponent<
  IPreventColorPollutionProps
> = props => {
  const { enabled, children } = props as PreventColorPollutionWithDefaultProps;
  return (
    <ColorPollutionContext.Provider value={enabled}>
      {children}
    </ColorPollutionContext.Provider>
  );
};

const defaultProps: IPreventColorPollutionDefaultProps = {
  enabled: true,
};

PreventColorPollution.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    PreventColorPollution.propTypes = {
      enabled: PropTypes.bool,
      children: PropTypes.node.isRequired,
    };
  }
}

export default PreventColorPollution;
