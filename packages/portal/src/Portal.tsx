import { FunctionComponent } from "react";
import { createPortal } from "react-dom";

import { PortalProps } from "./types.d";
import { usePortalState } from "./hooks";

const Portal: FunctionComponent<PortalProps> = props => {
  const { visible, children } = props;
  const container = usePortalState(props);
  if (!visible || !container) {
    return null;
  }

  return createPortal(children, container);
};

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Portal.propTypes = {
      into: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      intoId: PropTypes.string,
      visible: PropTypes.bool.isRequired,
      children: PropTypes.node,
    };
  }
}

export default Portal;
