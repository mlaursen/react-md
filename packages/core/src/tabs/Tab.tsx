"use client";
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { type ComponentWithRippleProps } from "../interaction/types.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { useHigherContrastChildren } from "../interaction/useHigherContrastChildren.js";
import { type CustomLinkComponent } from "../link/Link.js";
import { useKeyboardMovementContext } from "../movement/useKeyboardMovementProvider.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { tab } from "./tabStyles.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type useTabs } from "./useTabs.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type TabListProps } from "./TabList.js";

/**
 * @since 6.0.0
 */
export interface BaseTabProps extends ComponentWithRippleProps {
  /**
   * Set this to `true` if the tab is currently active.
   *
   * This is normally provided by the {@link useTabs} hook.
   */
  active: boolean;

  /**
   * Set this to `true` if the {@link TabListProps.disableTransition} prop has
   * also been set to `true` to disable an active indicator below the tab when
   * {@link active} is `true`.
   *
   * @defaultValue `false`
   */
  activeIndicator?: boolean;

  /**
   * Set this to `true` when rendering the tabs vertically and
   * {@link activeIndicator} has been enabled.
   *
   * @defaultValue !false
   */
  verticalActiveIndicator?: boolean;

  /**
   * An optional icon to render with the with the {@link children}. The default
   * behavior will render this icon before the children.
   *
   * @see {@link iconAfter}
   * @see {@link stacked}
   */
  icon?: ReactNode;

  /**
   * Set this to `true` to render the {@link icon} after the {@link children}.
   *
   * @defaultValue `false`
   */
  iconAfter?: boolean;

  /**
   * Set this to `true` to render the {@link icon} and {@link children} stacked
   * instead of horizontally.
   *
   * @defaultValue `false`
   */
  stacked?: boolean;
}

/**
 * @since 6.0.0
 */
export interface TabButtonProps
  extends BaseTabProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
}

/**
 * @since 6.0.0
 */
export interface TabLinkProps
  extends BaseTabProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  as: CustomLinkComponent;
}

/**
 * @since 6.0.0
 */
export type TabProps = TabButtonProps | TabLinkProps;

/**
 * **Client Component**
 *
 * This component should usually be used with the `TabsList` component and
 * `useTabs` hook.
 *
 * @see {@link useTabs}
 *
 * @since 6.0.0
 */
export function Tab(props: TabProps): ReactElement {
  const {
    id: propId,
    as: Component = "button",
    active,
    activeIndicator,
    verticalActiveIndicator,
    icon,
    iconAfter,
    stacked,
    className,
    children: propChildren,
    onBlur,
    onClick,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onDragStart,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    disableRipple,
    ...remaining
  } = props as TabButtonProps;
  const { disabled } = props as TabButtonProps;

  const id = useEnsuredId(propId, "tab");
  const { activeDescendantId } = useKeyboardMovementContext();
  const { ripples, handlers } = useElementInteraction({
    mode: disableRipple ? "none" : undefined,
    onBlur,
    onClick,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onDragStart,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    disabled,
  });

  const isLink = Component !== "button";
  const children = useHigherContrastChildren(propChildren);
  let buttonOnlyProps: Record<string, unknown> | undefined;
  if (!isLink) {
    buttonOnlyProps = { type: "button" };
  }

  return (
    <Component
      {...remaining}
      {...buttonOnlyProps}
      {...handlers}
      aria-selected={active}
      id={id}
      role="tab"
      tabIndex={id === activeDescendantId ? 0 : -1}
      className={tab({
        className,
        active,
        isLink,
        stacked: !!icon && stacked,
        disabled,
        reversed: !!icon && iconAfter,
        activeIndicator,
        verticalActiveIndicator,
      })}
    >
      {icon}
      {children}
      {ripples}
    </Component>
  );
}
