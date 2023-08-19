import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-slide-container");

/**
 * @example
 * Direction "left"
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
 * @example
 * Direction "right"
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
 * @remarks \@since 6.0.0
 */
export type SlideDirection = "left" | "right";

/** @remarks \@since 6.0.0 */
export interface SlideContainerClassNameOptions {
  className?: string;

  /** @see {@link SlideDirection} */
  direction: SlideDirection;
}

/**
 * @see {@link useSlideTransition} for an example
 * @remarks \@since 6.0.0
 */
export function slideContainer(
  options: SlideContainerClassNameOptions
): string {
  const { className, direction } = options;

  return cnb(styles({ [direction]: true }), className);
}

/** @remarks \@since 6.0.0 */
export interface SlideContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    SlideContainerClassNameOptions {}

/**
 * **Server Component**
 * This is a server component, but generally relies on state so probably a client component.
 *
 * @example
 * Simple Example
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
 * @example
 * Persistent Slides
 * ```tsx
 * import type { SlideDirection } from "@react-md/core";
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
 *   // enabling `persistent` makes it so that the `<Slide>` never unmounts so
 *   // that state can be maintained while it is not active.
 *   return (
 *     <SlideContainer direction={direction}>
 *       <Slide active={activeIndex === 0} persistent>
 *         Slide 1
 *       </Slide>
 *       <Slide active={activeIndex === 1} persistent>
 *         Slide 2
 *       </Slide>
 *       <Slide active={activeIndex === 2} persistent>
 *         Slide 3
 *       </Slide>
 *     </SlideContainer>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0
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
