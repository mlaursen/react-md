import React, { FC } from "react";
import OriginalTransitionGroup, {
  TransitionGroupProps,
} from "react-transition-group/TransitionGroup";

import { useReducedMotionTransition } from "./useReducedMotion";

const TransitionGroup: FC<Omit<TransitionGroupProps, "ref">> = ({
  appear,
  enter,
  exit,
  ...props
}) => {
  const config = useReducedMotionTransition({ appear, enter, exit });

  return <OriginalTransitionGroup {...props} {...config} />;
};

if (process.env.NODE_ENV !== "production") {
  TransitionGroup.displayName = "TransitionGroup";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TransitionGroup.propTypes = {
      appear: PropTypes.bool,
      enter: PropTypes.bool,
      exit: PropTypes.bool,
    };
  }
}

export default TransitionGroup;
