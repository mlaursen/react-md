"use client";

import { cnb } from "cnbuilder";

import {
  type CSSTransitionClassNames,
  type CSSTransitionHookReturnValue,
  type PreconfiguredCSSTransitionOptions,
  type TransitionTimeout,
} from "./types.js";
import { useCSSTransition } from "./useCSSTransition.js";

/** @since 6.0.0 */
export const DEFAULT_SLIDE_TRANSITION_TIMEOUT =
  150 as const satisfies TransitionTimeout;

/** @since 6.0.0 */
export const DEFAULT_SLIDE_TRANSITION_CLASSNAMES = {
  enter: "rmd-slide--enter",
  enterActive: "rmd-slide--enter-active rmd-slide--animate",
  exit: "rmd-slide--exit",
  exitActive: "rmd-slide--exit-active rmd-slide--animate",
} as const satisfies CSSTransitionClassNames;

/** @since 6.0.0 */
export type SlideTransitionOptions<E extends HTMLElement> =
  PreconfiguredCSSTransitionOptions<E>;

/**
 * @example Simple Example
 * ```tsx
 * import {
 *   type SlideDirection,
 *   slideContainer,
 * } from "@react-md/core/transition/SlideContainer";
 * import { useSlideTransition } from "@react-md/core/transition/useSlideTransition";
 * import { type ReactElement, type ReactNode, useState } from "react";
 *
 * interface SlideProps {
 *   active: boolean;
 *   children: ReactNode;
 * }
 *
 * function Slide({ active, children }: SlideProps): ReactElement | null {
 *   const { rendered, elementProps } = useSlideTransition({
 *     transitionIn: active,
 *   });
 *
 *   if (!rendered) {
 *     return null;
 *   }
 *
 *   return <div {...elementProps}>{children}</div>;
 * }
 *
 * interface State {
 *   direction: SlideDirection;
 *   activeIndex: number;
 * }
 *
 * function Example(): ReactElement {
 *   const [state, setState] = useState<State>({
 *     direction: "left",
 *     activeIndex: 0,
 *   });
 *   const { direction, activeIndex } = state;
 *
 *   // when changing a slide, `direction` should be set to "left" if the
 *   // previous `activeIndex` is less than the next index
 *   //
 *   // i.e.
 *   // setState((prevState) => ({
 *   //   direction: prevState.activeIndex < index ? "left" : "right",
 *   //   activeIndex: index,
 *   // }))
 *
 *   return (
 *     <div className={slideContainer({ direction })}>
 *       <Slide active={activeIndex === 0}>Slide 1</Slide>
 *       <Slide active={activeIndex === 1}>Slide 2</Slide>
 *       <Slide active={activeIndex === 2}>Slide 3</Slide>
 *     </div>
 *   );
 * }
 * ```
 *
 * @see {@link https://next.react-md.dev/components/slide|Slide Demos}
 * @see {@link SlideContainer} and {@link Slide} for convenient default
 * implementations.
 * @since 6.0.0
 */
export function useSlideTransition<E extends HTMLElement>(
  options: SlideTransitionOptions<E>
): CSSTransitionHookReturnValue<E> {
  const {
    timeout = DEFAULT_SLIDE_TRANSITION_TIMEOUT,
    className,
    temporary = false,
    exitedHidden = true,
    ...transitionOptions
  } = options;

  return useCSSTransition({
    ...transitionOptions,
    timeout,
    className: cnb("rmd-slide", className),
    classNames: DEFAULT_SLIDE_TRANSITION_CLASSNAMES,
    temporary,
    exitedHidden,
  });
}
