import { ReactNode } from "react";

/**
 * This is the type for how a portal can be rendered into another element.
 * This can either be a function that returns the HTMLElement, an HTMLElement,
 * or a `document.querySelector` string.
 */
export type PortalInto = (() => HTMLElement) | HTMLElement | string | null;

export interface IPortalProps {
  /**
   * Boolean if the portal is currently visible.
   */
  visible: boolean;

  /**
   * Either a function that returns an HTMLElement, an HTMLElement, or a `document.querySelector`
   * string that will return the HTMLElement to render the children into. If both the `into` and
   * `intoId` props are `undefined`, the `document.body` will be chosen instead.
   */
  into?: PortalInto;

  /**
   * The id of an element that the portal should be rendered into. This element **must** exist on
   * the page before the `visible` prop is enabled to work. If both the `into` and `intoId` props
   * are `undefined`, the `document.body` will be chosen instead.
   */
  intoId?: string;

  /**
   * The children to render within the portal.
   */
  children?: ReactNode;
}
