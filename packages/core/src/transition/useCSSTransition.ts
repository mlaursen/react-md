"use client";

import { cnb } from "cnbuilder";

import { DISPLAY_NONE_CLASS } from "../utils/isElementVisible.js";
import type {
  CSSTransitionElementProps,
  CSSTransitionHookOptions,
  CSSTransitionHookReturnValue,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TransitionHookOptions,
} from "./types.js";
import { useTransition } from "./useTransition.js";
import { getTransitionClassNames } from "./utils.js";

/**
 * This hook is used to create CSS transitions for different components whenever
 * a {@link TransitionHookOptions.transitionIn} flag is changed.
 *
 * @example Simple Transition
 * ```tsx
 * import { Button } from "@react-md/core/button/Button";
 * import { useCSSTransition } from "@react-md/core/transition/useCSSTransition";
 * import { Typography } from "@react-md/core/typography/Typography";
 * import { type ReactElement, useState } from "react";
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
 * @example Visibility Transition
 * ```tsx
 * import { Button } from "@react-md/core/button/Button";
 * import { useCSSTransition } from "@react-md/core/transition/useCSSTransition";
 * import { Typography } from "@react-md/core/typography/Typography";
 * import { type ReactElement, useState } from "react";
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
 * @example Mount Transition
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
 * @see {@link https://react-md.dev/hooks/use-css-transition | useCSSTransition Demos}
 * @see {@link https://react-md.dev/components/css-transition | CSSTransition Demos}
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export function useCSSTransition<E extends HTMLElement>(
  options: CSSTransitionHookOptions<E>
): CSSTransitionHookReturnValue<E> {
  const {
    className,
    classNames,
    appear = false,
    enter = true,
    exit = true,
    timeout,
    temporary = false,
    exitedHidden = false,
    ...transitionOptions
  } = options;

  const { ref, stage, rendered, appearing, transitionTo, disablePortal } =
    useTransition({
      ...transitionOptions,
      appear,
      enter,
      exit,
      timeout,
      reflow: true,
      temporary,
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
      cnb(
        // always apply the provided className first since it makes snapshot
        // tests easier to parse if dynamic classes come afterwards
        className,
        !temporary && exitedHidden && stage === "exited" && DISPLAY_NONE_CLASS,
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
    disablePortal,
  };
}
