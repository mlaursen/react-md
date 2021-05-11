import React, { ReactElement } from "react";

import { PortalInto } from "./getContainer";
import { Portal } from "./Portal";

/**
 * If any of these props are defined on a component, the component will render
 * in a portal instead of the current tree.
 */
export interface RenderConditionalPortalProps {
  /**
   * Boolean if the portal should be used.
   */
  portal?: boolean;

  /**
   * @see {@link PortalProps.into}
   */
  portalInto?: PortalInto;

  /**
   * @see {@link PortalProps.intoId}
   */
  portalIntoId?: string;
}

export interface ConditionalPortalProps extends RenderConditionalPortalProps {
  /**
   * This children to render.
   */
  children: ReactElement | null;
}

/**
 * This is a very simple component that is used in other places within react-md
 * to conditionally render the children within a portal or not based on general
 * portal config props.
 */
export function ConditionalPortal({
  portal,
  portalInto,
  portalIntoId,
  children,
}: ConditionalPortalProps): ReactElement | null {
  if (!portal && !portalInto && !portalIntoId) {
    return children;
  }

  return (
    <Portal into={portalInto} intoId={portalIntoId}>
      {children}
    </Portal>
  );
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

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
  } catch (e) {}
}
