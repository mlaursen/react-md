import { cnb } from "cnbuilder";
import { type HTMLAttributes, forwardRef } from "react";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-slide-container");

/**
 * @example Direction "left"
 * ```
 *           -------------
 *           |           |
 *           |  Slide 1  |  Slide 2
 *           |           |
 *           -------------
 *           -------------
 *           |           |
 *      Slide 1     Slide 2
 *           |           |
 *           -------------
 *           -------------
 *           |           |
 *  Slide 1  |  Slide 2  |
 *           |           |
 *           -------------
 * ```
 *
 * @example Direction "right"
 * ```
 *           -------------
 *           |           |
 *  Slide 1  |  Slide 2  |
 *           |           |
 *           -------------
 *           -------------
 *           |           |
 *      Slide 1     Slide 2
 *           |           |
 *           -------------
 *           -------------
 *           |           |
 *           |  Slide 1  |  Slide 2
 *           |           |
 *           -------------
 * ```
 *
 * @since 6.0.0
 */
export type SlideDirection = "left" | "right";

/** @since 6.0.0 */
export interface SlideContainerClassNameOptions {
  className?: string;

  /** @see {@link SlideDirection} */
  direction: SlideDirection;
}

/**
 * @see {@link useSlideTransition} for an example
 * @since 6.0.0
 */
export function slideContainer(
  options: SlideContainerClassNameOptions
): string {
  const { className, direction } = options;

  return cnb(styles({ [direction]: true }), className);
}

/** @since 6.0.0 */
export interface SlideContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    SlideContainerClassNameOptions {}

/**
 * The `SlideContainer` is used to enable a slide transition when child `Slide`
 * components change.
 *
 * @example Simple Example
 * ```tsx
 * import { SlideContainer, Slide } from "@react-md/core";
 * import type { ReactElement, ReactNode } from "react";
 * import { useState } from "react";
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
 *     <SlideContainer direction={direction}>
 *       <Slide active={activeIndex === 0}>
 *         Slide 1
 *       </Slide>
 *       <Slide active={activeIndex === 1}>
 *         Slide 2
 *       </Slide>
 *       <Slide active={activeIndex === 2}>
 *         Slide 3
 *       </Slide>
 *     </SlideContainer>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export const SlideContainer = forwardRef<HTMLDivElement, SlideContainerProps>(
  function SlideContainer(props, ref) {
    const { className, direction, children, ...remaining } = props;

    return (
      <div
        {...remaining}
        ref={ref}
        className={slideContainer({ className, direction })}
      >
        {children}
      </div>
    );
  }
);
