"use client";
import { cnb } from "cnbuilder";
import type { ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";
import { maxWidthTransition } from "./maxWidthTransition.js";

/**
 * @remarks \@since 6.0.0
 */
export interface MaxWidthTransitionOptions {
  element: ReactNode;
  transitionIn: boolean;

  className?: string;
  disabled?: boolean;
  disableTransition?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function useMaxWidthTransition(
  options: MaxWidthTransitionOptions
): ReactNode {
  const { element, disabled, disableTransition, transitionIn, className } =
    options;

  if (disabled || !isValidElement<{ className?: string }>(element)) {
    return element;
  }

  const child = Children.only(element);
  return cloneElement(element, {
    className: maxWidthTransition({
      className: cnb(child.props.className, className),
      disabled: disableTransition,
      transitionIn,
    }),
  });
}
