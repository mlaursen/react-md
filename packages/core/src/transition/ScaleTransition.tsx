"use client";
import { cnb } from "cnbuilder";
import { Children, cloneElement, type ReactElement } from "react";
import { type CSSTransitionComponentImplementation } from "./types.js";
import {
  useScaleTransition,
  type ScaleTransitionHookOptions,
} from "./useScaleTransition.js";

/**
 * @typeParam E - The HTMLElement type used or the ref required for the
 * transition.
 * @since 2.0.0
 * @since 4.0.0 The typeParam was added
 * @since 6.0.0 Removed portal props
 */
export interface ScaleTransitionProps<E extends HTMLElement>
  extends CSSTransitionComponentImplementation<E>,
    ScaleTransitionHookOptions<E> {}

/**
 * **Client Component**
 *
 * A component implementation of the {@link useScaleTransition} hook that just
 * has some reasonable defaults and supports portalling the children. Since this
 * component uses the `React.cloneElement` to inject the `ref` and `className`
 * into the `children`, it is recommended to use the hook instead.
 *
 * @example Dropdown Menu Example
 * ```tsx
 * import { ReactElement, useRef, useState } from "react";
 * import { Button, useFixedPositioning, useScaleTransition } from "@react-md/core";
 *
 * function Example(): ReactElement {
 *   const buttonRef = useRef<HTMLButtonElement>(null);
 *   const [transitionIn, setTransitionIn] = useState(false);
 *   const { style, transitionOptions } = useFixedPositioning({
 *     fixedTo: buttonRef,
 *   });
 *
 *   return (
 *     <>
 *       <Button ref={buttonRef} onClick={() => setTransitionIn(!transitionIn)}>
 *         Toggle
 *       </Button>
 *       <ScaleTransition
 *         {...transitionOptions}
 *         vertical
 *         transitionIn={transitionIn}
 *       >
 *         <div style={style}>
 *           Some content within a menu
 *         </div>
 *       </ScaleTransition>
 *     </>
 *   );
 * }
 * ```
 *
 * @typeParam E - The HTMLElement type used or the ref required for the
 * transition.
 * @since 2.0.0
 * @since 4.0.0 The typeParam was added and the API was updated.
 * @since 6.0.0 Removed the built-in support for portalling.
 */
export function ScaleTransition<E extends HTMLElement>(
  props: ScaleTransitionProps<E>
): ReactElement {
  const { children, className, ...options } = props;
  const child = Children.only(children);

  const { elementProps, rendered } = useScaleTransition({
    ...options,
    className: cnb(child.props.className, className),
  });

  return <>{rendered && cloneElement(children, elementProps)}</>;
}
