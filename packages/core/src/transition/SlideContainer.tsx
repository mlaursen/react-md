import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { bem } from "../bem";

const styles = bem("rmd-slide-container");

/** @remarks \@since 6.0.0 */
export interface SlideContainerClassNameOptions {
  className?: string;

  /**
   * Set this to `true` if the slides should animate from right to left and
   * `false` to animate from left to right.
   *
   * @example
   * Right to left
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
   * Left to right
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
   */
  rtl: boolean;
}

/**
 * @see {@link useSlideTransition} for an example
 * @remarks \@since 6.0.0
 */
export function slideContainer(
  options: SlideContainerClassNameOptions
): string {
  const { className, rtl } = options;

  return cnb(
    styles({
      rtl,
      ltr: !rtl,
    }),
    className
  );
}

/** @remarks \@since 6.0.0 */
export interface SlideContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    SlideContainerClassNameOptions {}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { SlideContainer, Slide } from "@react-md/core";
 * import type { ReactElement, ReactNode } from "react";
 * import { useState } from "react";
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
 *     <SlideContainer rtl={rtl}>
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
 * Persistant Slides
 * ```tsx
 * import { SlideContainer, Slide } from "@react-md/core";
 * import type { ReactElement, ReactNode } from "react";
 * import { useState } from "react";
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
 *   // enabling `persistant` makes it so that the `<Slide>` never unmounts so
 *   // that state can be maintained while it is not active.
 *   return (
 *     <SlideContainer rtl={rtl}>
 *       <Slide active={activeIndex === 0} persistant>
 *         Slide 1
 *       </Slide>
 *       <Slide active={activeIndex === 1} persistant>
 *         Slide 2
 *       </Slide>
 *       <Slide active={activeIndex === 2} persistant>
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
    const { className, rtl, children, ...remaining } = props;

    return (
      <div
        {...remaining}
        ref={ref}
        className={slideContainer({ className, rtl })}
      >
        {children}
      </div>
    );
  }
);
