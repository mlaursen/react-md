"use client";
import { cnb } from "cnbuilder";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { RippleContainer } from "../interaction/RippleContainer";
import { useElementInteraction } from "../interaction/useElementInteraction";
import { useHigherContrastChildren } from "../interaction/useHigherContrastChildren";
import { useKeyboardMovementContext } from "../movement/useKeyboardMovementProvider";
import { useEnsuredId } from "../useEnsuredId";
import { bem } from "../utils/bem";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTabs } from "./useTabs";

declare module "react" {
  interface CSSProperties {
    "--rmd-tab-color"?: string;
    "--rmd-tab-active-color"?: string;
    "--rmd-tab-inactive-color"?: string;
    "--rmd-tab-disabled-color"?: string;
  }
}

const styles = bem("rmd-tab");

/**
 * @remarks \@since 6.0.0
 */
export interface TabClassNameOptions {
  className?: string;
  active?: boolean;
  stacked?: boolean;
  reversed?: boolean;
  disabled?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function tab(options: TabClassNameOptions = {}): string {
  const { className, active, stacked, reversed, disabled } = options;

  return cnb(
    styles({
      active,
      reversed: reversed && !stacked,
      stacked,
      "stacked-reversed": stacked && reversed,
      disabled,
    }),
    className
  );
}

/**
 * @remarks \@since 6.0.0
 */
export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;

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
        })}
      >
        {icon}
        {children}
        {rippleContainerProps && <RippleContainer {...rippleContainerProps} />}
      </button>
    );
  }
);
