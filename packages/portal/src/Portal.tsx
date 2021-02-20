import { ReactElement, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { getContainer, PortalInto } from "./getContainer";

export interface PortalProps {
  /**
   * Either a function that returns an HTMLElement, an HTMLElement, or a
   * `document.querySelector` string that will return the HTMLElement to render
   * the children into. If both the `into` and `intoId` props are `undefined`,
   * the `document.body` will be chosen instead.
   *
   * If the `querySelector` string does not return a valid HTMLElement, an error
   * will be thrown.
   */
  into?: PortalInto;

  /**
   * The id of an element that the portal should be rendered into. If an element
   * with the provided id can not be found on the page at the time of mounting,
   * an error will be thrown.
   */
  intoId?: string;

  /**
   * The children to render within the portal.
   */
  children?: ReactNode;
}

/**
 * This component is a simple wrapper for the `createPortal` API from ReactDOM
 * that will just ensure that `null` is always returned for server side
 * rendering as well as a "nice" way to choose specific portal targets or just
 * falling back to the `document.body`.
 */
export function Portal({
  into,
  intoId,
  children,
}: PortalProps): ReactElement | null {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  // setting the container via useEffect instead of immediately in the render
  // just so that it doesn't throw an error immediately if the dom hasn't fully
  // painted after a SSR
  useEffect(() => {
    const nextContainer = getContainer(into, intoId);
    if (container !== nextContainer) {
      setContainer(nextContainer);
    }
  }, [into, intoId, container]);

  if (!container) {
    return null;
  }

  return createPortal(children, container);
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Portal.propTypes = {
      into: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      intoId: PropTypes.string,
      children: PropTypes.node,
    };
  } catch (e) {}
}
