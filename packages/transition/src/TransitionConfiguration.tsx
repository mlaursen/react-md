import React, { FC, ReactNode } from "react";
import { useMediaQuery } from "@react-md/utils";

import { Provider } from "./useReducedMotion";

export interface TransitionConfigurationProps {
  children: ReactNode;
  disabled?: boolean;
}

const TransitionConfiguration: FC<TransitionConfigurationProps> = ({
  children,
  disabled = false,
}) => {
  const matches = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
    undefined,
    disabled
  );

  return <Provider value={matches}>{children}</Provider>;
};

if (process.env.NODE_ENV !== "production") {
  TransitionConfiguration.displayName = "TransitionConfiguration";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TransitionConfiguration.propTypes = {
      children: PropTypes.node.isRequired,
      disabled: PropTypes.bool,
    };
  }
}

export default TransitionConfiguration;
