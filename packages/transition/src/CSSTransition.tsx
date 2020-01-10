import React, { FC } from "react";
import OriginalCSSTransition, {
  CSSTransitionProps,
} from "react-transition-group/CSSTransition";

import { useReducedMotionTransition } from "./useReducedMotion";

const CSSTransition: FC<CSSTransitionProps> = ({
  appear,
  enter,
  exit,
  ...props
}) => {
  const config = useReducedMotionTransition({ appear, enter, exit });

  return <OriginalCSSTransition {...props} {...config} />;
};

if (process.env.NODE_ENV !== "production") {
  CSSTransition.displayName = "CSSTransition";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    CSSTransition.propTypes = {
      appear: PropTypes.bool,
      enter: PropTypes.bool,
      exit: PropTypes.bool,
    };
  }
}

export default CSSTransition;
