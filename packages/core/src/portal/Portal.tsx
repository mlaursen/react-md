import type { ReactElement, ReactNode } from "react";
import { createPortal } from "react-dom";

import { usePortalContainer } from "./PortalContainerProvider";

export interface PortalProps {
  children: ReactNode;
  /**
   * Setting this to `true` will disable the portal behavior and just render
   * the `children` in the normal DOM tree.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;
}

/**
 * Portals are a great way to render temporary elements like dialogs, tooltips,
 * and menus at a different port of the DOM. This implementation will render
 * the `children` in the current {@link PortalContainer} element.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { Portal } from "@react-md/portal";
 *
 * function Example() {
 *   return <Portal><div>Some Content</div></Portal>;
 * }
 * ```
 *
 * @see {@link PortalContainerProvider}
 * @see {@link usePortalContainer}
 */
export function Portal(props: PortalProps): ReactElement {
  const { children, disabled = false } = props;
  const container = usePortalContainer();
  if (!container || disabled) {
    return <>{disabled && children}</>;
  }

  return createPortal(children, container);
}