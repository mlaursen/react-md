import { cnb } from "cnbuilder";
import type {
  CSSTransitionClassNames,
  CSSTransitionElementProps,
  CSSTransitionHookReturnValue,
  PreconfiguredCSSTransitionOptions,
  TransitionTimeout,
} from "./types";
import { useCSSTransition } from "./useCSSTransition";

/** @remarks \@since 6.0.0 */
export const DEFAULT_SLIDE_TRANSITION_TIMEOUT: Readonly<TransitionTimeout> = 150;

/** @remarks \@since 6.0.0 */
export const DEFAULT_SLIDE_TRANSITION_CLASSNAMES: Readonly<CSSTransitionClassNames> =
  {
    enter: "rmd-slide--enter",
    enterActive: "rmd-slide--enter-active rmd-slide--animate",
    exit: "rmd-slide--exit",
    exitActive: "rmd-slide--exit-active rmd-slide--animate",
  };

/** @remarks \@since 6.0.0 */
export type SlideTransitionOptions<E extends HTMLElement> =
  PreconfiguredCSSTransitionOptions<E>;

/** @remarks \@since 6.0.0 */
export interface SlideTransitionElementProps<E extends HTMLElement>
  extends CSSTransitionElementProps<E> {
  hidden: boolean;
}

/** @remarks \@since 6.0.0 */
export interface SlideTransition<E extends HTMLElement>
  extends CSSTransitionHookReturnValue<E> {
  elementProps: SlideTransitionElementProps<E>;
}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { slideContainer, useSlideTransition } from "@react-md/core";
 * import type { ReactElement, ReactNode } from "react";
 * import { useState } from "react";
 *
 * interface SlideProps {
 *   active: boolean;
 *   children: ReactNode;
 * }
 *
 * function Slide({ active, children }: SlideProps): ReactElement | null {
 *   const { rendered, elementProps } = useSlideTransition({
 *     transition: active,
 *   });
 *
 *   if (!rendered) {
 *     return null;
 *   }
 *
 *   return <div {...elementProps}>{children}</div>;
 * }
 *
 * function Example(): ReactElement {
 *   const [state, setState] = useState({
 *     rtl: true,
 *     activeIndex: 0,
 *   });
 *
 *   // when changing a slide, `rtl` should be set to true if the previous
 *   // `activeIndex` is less than the next index
 *   //
 *   // i.e.
 *   // setState((prevState) => ({
 *   //   rtl: prevState.activeIndex < index,
 *   //   activeIndex: index,
 *   // }))
 *
 *   return (
 *     <div className={slideContainer({ rtl )}>
 *       <Slide active={activeIndex === 0}>
 *         Slide 1
 *       </Slide>
 *       <Slide active={activeIndex === 1}>
 *         Slide 2
 *       </Slide>
 *       <Slide active={activeIndex === 2}>
 *         Slide 3
 *       </Slide>
 *     </div>
 *   );
 * }
 * ```
 *
 * @see {@link SlideContainer} and {@link Slide} for convenient default
 * implementations.
 * @remarks \@since 6.0.0
 */
export function useSlideTransition<E extends HTMLElement>(
  options: SlideTransitionOptions<E>
): SlideTransition<E> {
  const {
    timeout = DEFAULT_SLIDE_TRANSITION_TIMEOUT,
    className,
    temporary = false,
    ...transitionOptions
  } = options;

  const { stage, elementProps, ...transition } = useCSSTransition({
    ...transitionOptions,
    timeout,
    className: cnb("rmd-slide", className),
    classNames: DEFAULT_SLIDE_TRANSITION_CLASSNAMES,
    temporary,
  });

  return {
    ...transition,
    stage,
    elementProps: {
      ...elementProps,
      hidden: !temporary && stage === "exited",
    },
  };
}
