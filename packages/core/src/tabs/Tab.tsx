"use client";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { RippleContainer } from "../interaction/RippleContainer.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { useHigherContrastChildren } from "../interaction/useHigherContrastChildren.js";
import { useKeyboardMovementContext } from "../movement/useKeyboardMovementProvider.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { tab } from "./tabStyles.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { useTabs } from "./useTabs.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { TabListProps } from "./TabList.js";

/**
 * @remarks \@since 6.0.0
 */
export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
 * **Client Component**
 *
 * This component should usually be used with the `TabsList` component and
 * `useTabs` hook.
 *
 * @see {@link useTabs}
 *
 * @remarks \@since 6.0.0
 */
export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  function Tab(props, ref) {
    const {
      id: propId,
      active,
      activeIndicator,
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
      ...remaining
    } = props;
    const { disabled } = props;

    const id = useEnsuredId(propId, "tab");
    const { activeDescendantId } = useKeyboardMovementContext();
    const { rippleContainerProps, handlers } = useElementInteraction({
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

    const children = useHigherContrastChildren(propChildren);

    return (
      <button
        {...remaining}
        {...handlers}
        aria-selected={active}
        id={id}
        ref={ref}
        role="tab"
        type="button"
        tabIndex={id === activeDescendantId ? 0 : -1}
        className={tab({
          className,
          active,
          stacked: !!icon && stacked,
          disabled,
          reversed: !!icon && iconAfter,
          activeIndicator,
        })}
      >
        {icon}
        {children}
        {rippleContainerProps && <RippleContainer {...rippleContainerProps} />}
      </button>
    );
  }
);
