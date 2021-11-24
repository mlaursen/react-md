import type { ReactElement, ReactNode } from "react";

import type { PortalInto } from "./getContainer";
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
   *
   * @remarks \@since 4.0.0 Allows `ReactNode` instead of `ReactElement | null`
   */
  children: ReactNode;
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
}: ConditionalPortalProps): ReactElement {
  if (!portal && !portalInto && !portalIntoId) {
    return <>{children}</>;
  }

  return (
    <Portal into={portalInto} intoId={portalIntoId}>
      {children}
    </Portal>
  );
}
