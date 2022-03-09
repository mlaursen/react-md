import type { ReactElement } from "react";
import { Children, cloneElement } from "react";
import cn from "classnames";
import type { RenderConditionalPortalProps } from "@react-md/portal";
import { ConditionalPortal } from "@react-md/portal";

import type { CSSTransitionComponentImplementation } from "./types";
import type { ScaleTransitionHookOptions } from "./useScaleTransition";
import { useScaleTransition } from "./useScaleTransition";

/**
 * @typeParam E - The HTMLElement type used or the ref required for the
 * transition.
 * @remarks \@since 2.0.0
 * @remarks \@since 4.0.0 The typeParam was added
 */
export interface ScaleTransitionProps<E extends HTMLElement>
  extends CSSTransitionComponentImplementation<E>,
    RenderConditionalPortalProps,
    ScaleTransitionHookOptions<E> {}

/**
 * A component implementation of the {@link useScaleTransition} hook that just
 * has some reasonable defaults and supports portalling the children. Since this
 * component uses the `React.cloneElement` to inject the `ref` and `className`
 * into the `children`, it is recommended to use the hook instead.
 *
 * @example
 * Dropdown Menu Example
 * ```tsx
 * import { ReactElement, useRef, useState } from "react";
 * import { Button } from "@react-md/button";
 * import { useFixedPositioning, useScaleTransition } from "@react-md/transition";
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
 * @remarks \@since 2.0.0
 * @remarks \@since 4.0.0 The typeParam was added and the API was updated.
 */
export function ScaleTransition<E extends HTMLElement>({
  portal,
  portalInto,
  portalIntoId,
  children,
  className,
  ...options
}: ScaleTransitionProps<E>): ReactElement {
  const child = Children.only(children);
  const { elementProps, rendered } = useScaleTransition({
    ...options,
    className: cn(child.props.className, className),
  });

  return (
    <ConditionalPortal
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      {rendered && cloneElement(children, elementProps)}
    </ConditionalPortal>
  );
}
