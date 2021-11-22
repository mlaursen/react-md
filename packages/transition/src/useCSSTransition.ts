import cn from "classnames";

import type {
  CSSTransitionHookOptions,
  CSSTransitionHookReturnValue,
  CSSTransitionElementProps,
} from "./types";
import { useTransition } from "./useTransition";
import { getTransitionClassNames } from "./utils";

/**
 * This hook is used to create CSS transitions for different components whenever
 * a {@link TransitionHookOptions.transitionIn} flag is changed.
 *
 * @example
 * Simple Transition
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { Button } from "@react-md/button";
 * import { useCSSTransition } from "@react-md/transition";
 * import { Typography } from "@react-md/typography";
 *
 * // Pretend styles
 * // .enter {
 * //   opacity: 0.5;
 * //   transition: opacity .15s;
 * // }
 * //
 * // .enter--active {
 * //   opacity: 1;
 * // }
 * //
 * // .exit {
 * //   opacity: 1;
 * //   transition: opacity .15s;
 * // }
 * //
 * // .exit--active {
 * //   opacity: 0.5;
 * // }
 *
 * function Example(): ReactElement {
 *   const [transitionIn, setTransitionIn] = useState(false);
 *   const { elementProps } = useCSSTransition({
 *     timeout: 150,
 *     classNames: {
 *       enter: "enter",
 *       enterActive: "enter--active",
 *       exit: "exit",
 *       exitActive: "exit--active",
 *     },
 *     transitionIn,
 *   });
 *
 *   return (
 *     <>
 *       <Button onClick={() => setTransitionIn(!transitionIn)}>
 *         Toggle
 *       </Button>
 *       <Typography {...elementProps}>
 *         Some Opacity Changing Text
 *       </Typography>
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * Visibility Transition
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { Button } from "@react-md/button";
 * import { useCSSTransition } from "@react-md/transition";
 * import { Typography } from "@react-md/typography";
 *
 * // Pretend styles
 * // .enter {
 * //   opacity: 0;
 * //   transition: opacity .2s;
 * // }
 * //
 * // .enter--active {
 * //   opacity: 1;
 * // }
 * //
 * // .exit {
 * //   opacity: 1;
 * //   transition: opacity .15s;
 * // }
 * //
 * // .exit--active {
 * //   opacity: 0;
 * // }
 *
 * function Example(): ReactElement {
 *   const [transitionIn, setTransitionIn] = useState(false);
 *   const { elementProps, rendered } = useCSSTransition({
 *     timeout: {
 *       enter: 200,
 *       exit: 150,
 *     },
 *     classNames: {
 *       enter: "enter",
 *       enterActive: "enter--active",
 *       exit: "exit",
 *       exitActive: "exit--active",
 *     },
 *     transitionIn,
 *     temporary: true,
 *   });
 *
 *   return (
 *     <>
 *       <Button onClick={() => setTransitionIn(!transitionIn)}>
 *         Toggle
 *       </Button>
 *       {rendered && (
 *         <Typography {...elementProps}>
 *           Some Opacity Changing Text
 *         </Typography>
 *       )}
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * Mount Transition
 * ```tsx
 * import type { ReactElement } from "react";
 * import { useCSSTransition } from "@react-md/transition";
 *
 * // Pretend styles
 * // .opacity {
 * //   opacity: 0;
 * //   transition: opacity .3s;
 * // }
 * //
 * // .opacity--active {
 * //   opacity: 1;
 * // }
 * //
 *
 * function Example(): ReactElement {
 *   const { elementProps } = useCSSTransition({
 *     appear: true,
 *     transitionIn: true,
 *     timeout: 300,
 *     classNames: "opacity",
 *   })
 *
 *   return <div {...elementProps}>Some Content!</div>;
 * }
 * ```
 *
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @remarks \@since 4.0.0
 */
export function useCSSTransition<E extends HTMLElement>({
  className,
  classNames,
  appear = false,
  enter = true,
  exit = true,
  timeout,
  ...options
}: CSSTransitionHookOptions<E>): CSSTransitionHookReturnValue<E> {
  const { ref, stage, rendered, appearing, transitionTo } = useTransition({
    ...options,
    appear,
    enter,
    exit,
    timeout,
    reflow: true,
  });
  const isEntering = stage === "entering";
  const isEnter = isEntering || stage === "enter";
  const isEntered = stage === "entered";
  const isExiting = stage === "exiting";
  const isExit = isExiting || stage === "exit";
  const isExited = stage === "exited";
  const transitionClassNames = getTransitionClassNames({
    timeout,
    appear,
    enter,
    exit,
    classNames,
  });

  const elementProps: CSSTransitionElementProps<E> = {
    ref,
    className:
      cn(
        // always apply the provided className first since it makes snapshot
        // tests easier to parse if dynamic classes come afterwards
        className,
        appearing && isEnter && transitionClassNames.appear,
        appearing && isEntering && transitionClassNames.appearActive,
        appearing && isEntered && transitionClassNames.appearDone,
        !appearing && isEnter && transitionClassNames.enter,
        !appearing && isEntering && transitionClassNames.enterActive,
        !appearing && isEntered && transitionClassNames.enterDone,
        isExit && transitionClassNames.exit,
        isExiting && transitionClassNames.exitActive,
        isExited && transitionClassNames.exitDone
      ) || undefined,
  };

  return {
    ...elementProps,
    stage,
    rendered,
    appearing,
    elementProps,
    transitionTo,
  };
}
