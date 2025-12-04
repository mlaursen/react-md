"use client";

import { cnb } from "cnbuilder";
import type { ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";

import { maxWidthTransition } from "./maxWidthTransition.js";

declare module "react" {
  interface CSSProperites {
    "--rmd-max-width"?: string | number;
    "--rmd-max-width-gap"?: string | number;
  }
}

/**
 * @since 6.3.1
 */
export interface BaseMaxWidthTransitionOptions {
  className?: string;
}

/**
 * @since 6.0.0
 * @since 6.3.1 Extends BaseMaxWidthTransitionOptions
 */
export interface MaxWidthTransitionOptions extends BaseMaxWidthTransitionOptions {
  element: ReactNode;
  transitionIn: boolean;

  disabled?: boolean;
  disableTransition?: boolean;
}

/**
 * The `useMaxWidthTransition` hook is used to animate the `max-width` using
 * the {@link maxWidthTransition} utility classes.
 *
 * NOTE: This hook clones the className into the child element using the
 * `cloneElement` API. The child **must** accept and pass the `className` forward
 * to work correctly.
 *
 * @see {@link maxWidthTransition}
 *
 * @since 6.0.0
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
