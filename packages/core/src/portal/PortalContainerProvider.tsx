"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export type PortalContainer = Element | DocumentFragment | null;

export const PORTAL_CONTAINER_ID = "rmd-portal-container";

let portalContainer: PortalContainer = null;

const getPortalContainer = (): PortalContainer =>
  typeof window === "undefined" ? null : document.body;

const context = createContext<PortalContainer>(getPortalContainer());
context.displayName = "PortalContainer";
const { Provider } = context;

/**
 * @internal
 * @remarks \@since 6.0.0
 */
export function usePortalContainer(): PortalContainer {
  return useContext(context);
}

/** @remarks \@since 6.0.0 */
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
 * @see {@link Portal}
 * @remarks \@since 6.0.0
 */
export function PortalContainerProvider(
  props: PortalContainerProviderProps
): ReactElement {
  const { container, children } = props;
  const [value, setValue] = useState<PortalContainer>(portalContainer);
  useEffect(() => {
    if (typeof container !== "undefined") {
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

  return <Provider value={container ?? value}>{children}</Provider>;
}
