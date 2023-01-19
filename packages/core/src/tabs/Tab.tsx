import { cnb } from "cnbuilder";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import { useKeyboardMovementContext } from "../movement";
import {
  RippleContainer,
  useElementInteraction,
  useHigherContrastChildren,
} from "../interaction";
import { bem } from "../utils";
import { useEnsuredId } from "../useEnsuredId";

const styles = bem("rmd-tab");

export interface TabClassNameOptions {
  className?: string;
  active?: boolean;
  stacked?: boolean;
  reversed?: boolean;
  disabled?: boolean;
}

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

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  icon?: ReactNode;
  iconAfter?: boolean;
  stacked?: boolean;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  props,
  ref
) {
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
});
