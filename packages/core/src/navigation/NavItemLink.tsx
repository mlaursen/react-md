"use client";
import {
  forwardRef,
  useEffect,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
} from "react";
import { cssUtils } from "../cssUtils.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { Tooltip } from "../tooltip/Tooltip.js";
import {
  useTooltip,
  type TooltipOptions,
  type TooltippedElementEventHandlers,
} from "../tooltip/useTooltip.js";
import { type PropsWithRef } from "../types.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { NavItem } from "./NavItem.js";
import { navItemLink } from "./navItemStyles.js";
import { type NavigationLinkComponent } from "./types.js";

/**
 * @since 6.0.0
 */
export interface NavItemLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** @defaultValue `"a"` */
  as?: NavigationLinkComponent;
  href: string;

  /**
   * Any additional props to provide the wrapping `<li>` element such as
   * `style`, `className`, and `ref`.
   */
  liProps?: PropsWithRef<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;

  /**
   * Any additional props to provide the `<span>` element that wraps the
   * children such as `style`, `className`, and `ref`.
   */
  spanProps?: HTMLAttributes<HTMLSpanElement>;

  /**
   * An optional addon to render before the `children` and will not be wrapped
   * in the `span` that adds ellipsis overflow.
   */
  beforeAddon?: ReactNode;

  /**
   * An optional addon to render after the `children` and will not be wrapped
   * in the `span` that adds ellipsis overflow.
   */
  afterAddon?: ReactNode;

  /**
   * Set this to `true` if the link matches the current `pathname`. This will
   * enable `aria-current="true"` and apply active styling.
   */
  active: boolean;

  /** @defaultValue `cssUtils({ fontWeight: "bold" })` */
  activeClassName?: string;

  /** @defaultValue `!to && !href` */
  disabled?: boolean;

  /**
   * This should contain accessible text for the page that this will link to and
   * will automatically be truncated with ellipsis if it is too large. A tooltip
   * will also appear only when it has been truncated.
   */
  children: ReactNode;

  /**
   * This most likely will never need to be used, but it's a way to override any
   * tooltip options. The default behavior will position the tooltip to the
   * right and only appear if the `children` are overflown.
   *
   * @example Customize
   * ```tsx
   * <NavItemLink
   *   {...props}
   *   tooltipOptions={{
   *     overflowOnly: false,
   *     defaultPosition: "above",
   *     vhMargin: "1rem",
   *     vwMargin: "1rem",
   *   }}
   * >
   * ```
   */
  tooltipOptions?: Omit<
    TooltipOptions<HTMLAnchorElement>,
    keyof TooltippedElementEventHandlers<HTMLAnchorElement>
  >;

  /**
   * Set this to `true` to prevent this item from scrolling into view when it
   * becomes active. It is generally recommended to keep this `true` unless a
   * custom implementation has been added so that when the temporary navigation
   * will show the active route.
   *
   * @defaultValue `false`
   */
  disableScrollIntoView?: boolean;
}

/**
 * **Client Component**
 *
 * @since 6.0.0
 */
export const NavItemLink = forwardRef<HTMLAnchorElement, NavItemLinkProps>(
  function NavItemLink(props, propRef) {
    const {
      as: Component = "a",
      href,
      active,
      activeClassName,
      beforeAddon,
      afterAddon,
      className,
      children,
      liProps,
      spanProps,
      disabled = !href,
      onClick,
      onBlur,
      onDragStart,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onTouchMove,
      onTouchEnd,
      onTouchStart,
      tooltipOptions,
      disableScrollIntoView,
      ...remaining
    } = props;

    const [linkRef, linkRefCallback] = useEnsuredRef(propRef);
    const { handlers, ripples } = useElementInteraction({
      disabled,
      onClick,
      onBlur,
      onDragStart,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onTouchMove,
      onTouchEnd,
      onTouchStart,
    });

    const { elementProps, tooltipProps, overflowRef } = useTooltip({
      overflowOnly: true,
      defaultPosition: "right",
      ...tooltipOptions,
      ...handlers,
    });
    useEffect(() => {
      const link = linkRef.current;
      if (
        !active ||
        !link ||
        disableScrollIntoView ||
        document.activeElement === link
      ) {
        return;
      }

      link.scrollIntoView({ block: "center" });
    }, [active, disableScrollIntoView, linkRef]);

    return (
      <NavItem {...liProps}>
        <Component
          {...remaining}
          {...handlers}
          {...elementProps}
          ref={linkRefCallback}
          href={href}
          className={navItemLink({
            active,
            activeClassName,
            className,
          })}
        >
          {beforeAddon}
          <span
            {...spanProps}
            ref={overflowRef}
            className={cssUtils({
              className: spanProps?.className,
              textOverflow: "ellipsis",
            })}
          >
            {children}
          </span>
          {afterAddon}
          {ripples}
        </Component>
        <Tooltip {...tooltipProps}>{children}</Tooltip>
      </NavItem>
    );
  }
);
