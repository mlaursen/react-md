import React, { FC, ReactElement } from "react";

import Portal from "./Portal";
import { PortalInto } from "./getContainer";

/**
 * If any of these props are defined on a component, the component will
 * render in a portal instead of the current tree.
 */
export interface RenderConditionalPortalProps {
  /**
   * Boolean if the portal should be used.
   */
  portal?: boolean;

  /**
   * @see {@link Portal#into}
   */
  portalInto?: PortalInto;

  /**
   * @see {@link Portal#intoId}
   */
  portalIntoId?: string;
}

export interface ConditionalPortalProps extends RenderConditionalPortalProps {
  /**
   * This children to render.
   */
  children: ReactElement<any> | null;
}

/**
 * This is a very simple component that is used in other places within react-md to conditionally
 * render the children within a portal or not based on general portal config props.
 */
const ConditionalPortal: FC<ConditionalPortalProps> = ({
  portal,
  portalInto,
  portalIntoId,
  children,
}) => {
  if (!portal && !portalInto && !portalIntoId) {
    return children;
  }

  return (
    <Portal into={portalInto} intoId={portalIntoId}>
      {children}
    </Portal>
  );
};

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    ConditionalPortal.propTypes = {
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      portalIntoId: PropTypes.string,
      children: PropTypes.node,
    };
  }
}

export default ConditionalPortal;
