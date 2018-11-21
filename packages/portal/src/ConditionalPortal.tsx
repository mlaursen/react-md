import * as React from "react";
import Portal, { PortalInto } from "./Portal";

/**
 *
 */
export interface IConditionalPortalProps {
  /**
   * Boolean if the portal would be visible if one of the other portal props are defined or enabled.
   */
  visible: boolean;

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

  /**
   * This children to render.
   */
  children: React.ReactElement<any> | null;
}

/**
 * This is a very simple component that is used in other places within react-md to conditionally
 * render the children within a portal or not based on general portal config props.
 */
const ConditionalPortal: React.FunctionComponent<IConditionalPortalProps> = ({
  portal,
  portalInto,
  portalIntoId,
  visible,
  children,
}) => {
  if (!portal && !portalInto && !portalIntoId) {
    return children;
  }

  return (
    <Portal into={portalInto} intoId={portalIntoId} visible={visible}>
      {children}
    </Portal>
  );
};

export default ConditionalPortal;
