"use client";

import {
  type ReactElement,
  type ReactNode,
  type RefObject,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * @internal
 * @since 6.0.0
 */
export type PortalContainerNode = Element | DocumentFragment | null;

/**
 * @internal
 * @since 6.0.0
 */
export type PortalContainer =
  | PortalContainerNode
  | RefObject<PortalContainerNode>;

export const PORTAL_CONTAINER_ID = "rmd-portal-container";

let portalContainer: PortalContainerNode = null;

const getPortalContainer = (): PortalContainerNode =>
  typeof window === "undefined" ? null : document.body;

const context = createContext<PortalContainerNode>(getPortalContainer());
context.displayName = "PortalContainer";
const { Provider } = context;

/**
 * @internal
 * @since 6.0.0
 */
export function usePortalContainer(): PortalContainerNode {
  return useContext(context);
}

/** @since 6.0.0 */
export interface PortalContainerProviderProps {
  /**
   * An optional container element to use. When this is `undefined`, a
   * `<div id="rmd-portal-container"></div>` will be added as the last child to
   * the `document.body` and be used as the container element.
   */
  container?: PortalContainer;
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * This component allows for all child `Portal` components to render within the
 * same container element. If a custom `container` element is not provided, a
 * `<div id="rmd-portal-container"></div>` will be added as the last child to
 * the `document.body` and be used as the container element.
 *
 * @see {@link https://next.react-md.dev/components/portal|Portal Demos}
 * @see {@link Portal}
 * @since 6.0.0
 */
export function PortalContainerProvider(
  props: PortalContainerProviderProps
): ReactElement {
  const { container, children } = props;
  const [value, setValue] = useState<PortalContainerNode>(portalContainer);
  useEffect(() => {
    if (container && "current" in container) {
      setValue(container.current);
      return;
    }

    if (typeof container !== "undefined") {
      setValue(container);
      return;
    }

    if (!portalContainer) {
      portalContainer = document.createElement("div");
      portalContainer.id = PORTAL_CONTAINER_ID;
    }
    if (!document.body.contains(portalContainer)) {
      document.body.appendChild(portalContainer);
    }

    setValue(portalContainer);

    return () => {
      if (portalContainer && document.body.contains(portalContainer)) {
        document.body.removeChild(portalContainer);
      }
    };
  }, [container]);

  const containerValue =
    (container && "current" in container) || !container ? value : container;
  return <Provider value={containerValue}>{children}</Provider>;
}
