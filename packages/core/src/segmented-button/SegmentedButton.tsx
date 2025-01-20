"use client";

import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";

import { getIcon } from "../icon/iconConfig.js";
import { type ComponentWithRippleProps } from "../interaction/types.js";
import { useElementInteraction } from "../interaction/useElementInteraction.js";
import { useHigherContrastChildren } from "../interaction/useHigherContrastChildren.js";
import { useMaxWidthTransition } from "../transition/useMaxWidthTransition.js";
import { segmentedButton } from "./segmentedButtonStyles.js";

/**
 * @since 6.0.0
 */
export interface SegmentedButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ComponentWithRippleProps {
  /**
   * Set this to `true` to apply selected styles and an optional
   * {@link selectedIcon}
   *
   * @defaultValue `false`
   */
  selected?: boolean;

  /** @defaultValue `getIcon("selected")` */
  selectedIcon?: ReactNode;

  /**
   * An optional className to apply when {@link selected} is `true`.
   */
  selectedClassName?: string;

  /**
   * Set this to `true` to not render the {@link selectedIcon} when
   * {@link selected} is `true`.
   *
   * @defaultValue `false`
   */
  disableSelectedIcon?: boolean;

  /**
   * Set this to `true` to disable the {@link selectedIcon} enter/exit
   * transition and instead just use `display: none`.
   *
   * @defaultValue `false`
   */
  disableSelectedTransition?: boolean;

  /**
   * An optional addon to render before the {@link children} and after the
   * {@link selectedIcon}. This is only useful when rendering text children so
   * it can appear above the interaction states.
   */
  leftAddon?: ReactNode;

  /**
   * An optional addon to render after the {@link children}. This is only useful
   * when rendering text children so it can appear above the interaction states.
   */
  rightAddon?: ReactNode;
}

/**
 * **Client Component**
 *
 * @example Simple Example
 * ```tsx
 * import {
 *   SegmentedButton,
 *   SegmentedButtonContainer,
 * } from "@react-md/core";
 * import type { ReactElement } from "react";
 * import { useState } from "react";
 *
 * function Example(): ReactElement {
 *   const [value, setValue] = useState("a");
 *   return (
 *     <SegmentedButtonContainer>
 *       <SegmentedButton
 *         onClick={() => setValue("a")}
 *         selected={value === "a"}
 *       >
 *         First
 *       </SegmentedButton>
 *       <SegmentedButton
 *         onClick={() => setValue("b")}
 *         selected={value === "b"}
 *       >
 *         Second
 *       </SegmentedButton>
 *       <SegmentedButton
 *         onClick={() => setValue("c")}
 *         selected={value === "c"}
 *         disableSelectedIcon
 *       >
 *         Third
 *       </SegmentedButton>
 *     </SegmentedButtonContainer>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export const SegmentedButton = forwardRef<
  HTMLButtonElement,
  SegmentedButtonProps
>(function SegmentedButton(props, ref) {
  const {
    className,
    type = "button",
    leftAddon,
    rightAddon,
    children: propChildren,
    selected,
    selectedIcon: propSelectedIcon,
    selectedClassName,
    disableSelectedIcon,
    disableSelectedTransition,
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
    disableRipple,
    ...remaining
  } = props;

  const children = useHigherContrastChildren(propChildren);
  const selectedIconNode = getIcon("selected", propSelectedIcon);
  const selectedIcon = useMaxWidthTransition({
    element: selectedIconNode,
    transitionIn: !!selected,
    disabled: disableSelectedIcon,
    disableTransition: disableSelectedTransition,
  });
  const { pressedClassName, handlers, ripples } = useElementInteraction({
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

  return (
    <button
      {...remaining}
      {...handlers}
      aria-pressed={selected}
      ref={ref}
      type={type}
      disabled={disabled}
      className={segmentedButton({
        className,
        selected,
        selectedClassName,
        pressedClassName,
      })}
    >
      {!disableSelectedIcon && selectedIcon}
      {leftAddon}
      {children}
      {rightAddon}
      {ripples}
    </button>
  );
});
