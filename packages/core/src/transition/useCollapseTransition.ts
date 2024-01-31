"use client";
import { cnb } from "cnbuilder";
import type { CSSProperties } from "react";
import { useState } from "react";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { DISPLAY_NONE_CLASS } from "../utils/isElementVisible.js";
import { collapse } from "./collapseStyles.js";
import type {
  CSSTransitionElementProps,
  CSSTransitionHookReturnValue,
  PreconfiguredCSSTransitionOptions,
  TransitionTimeout,
  TransitionTimeoutObject,
} from "./types.js";
import { useTransition } from "./useTransition.js";
import { getElementSizing, getTransitionTimeout } from "./utils.js";

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 2.0.0
 */
export const DEFAULT_COLLAPSE_TIMEOUT: Readonly<TransitionTimeoutObject> = {
  enter: 250,
  exit: 200,
};

/**
 * @remarks \@since 4.0.0
 */
export interface CollapseConfigurationStyle {
  /**
   * The minimum height that the collapsed element can be which defaults to `0`.
   * This can either be a number of pixels or a string CSS height value.
   *
   * Setting this value to any non-zero value will allow for the element to
   * shrink to the defined min-height, and then expand to the full height once
   * no longer collapsed.
   *
   * Note: If the `minHeight`, `minPaddingTop`, and `minPaddingBottom` options
   * are all set to `0` (default), the child will be removed from the DOM while
   * collapsed.
   *
   * @defaultValue `0`
   */
  minHeight?: number | string;

  /**
   * The minimum padding-top that the collapsed element can be which defaults to
   * `0`. This can either be a number of pixels or a string CSS `padding-top`
   * value.
   *
   * Note: If the `minHeight`, `minPaddingTop`, and `minPaddingBottom` options
   * are all set to `0` (default), the child will be removed from the DOM while
   * collapsed.
   *
   * @defaultValue `0`
   */
  minPaddingTop?: number | string;

  /**
   * The minimum padding-bottom that the collapsed element can be which defaults
   * to `0`. This can either be a number of pixels or a string CSS
   * `padding-bottom` value.
   *
   * Note: If the `minHeight`, `minPaddingTop`, and `minPaddingBottom` options
   * are all set to `0` (default), the child will be removed from the DOM while
   * collapsed.
   *
   * @defaultValue `0`
   */
  minPaddingBottom?: number | string;
}

/**
 * @remarks \@since 4.0.0
 */
export interface CollapseStyle extends CollapseConfigurationStyle {
  /**
   * This will only be set when the {@link TransitionStage} is `"entering"` or
   * `"exiting"` as `"${timeout}ms"`.
   */
  transitionDuration?: string;
}

/**
 * These props (and `ref`) **must** be passed to a DOM element for the collapse
 * transition to work.
 *
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @remarks \@since 4.0.0
 */
export interface CollapseElementProps<E extends HTMLElement>
  extends CSSTransitionElementProps<E> {
  /**
   * A merged styled object required for the collapse transition to work.
   *
   * @see {@link CollapseStyle}
   * @see {@link CollapseTransitionHookOptions.style}
   */
  style: CSSProperties;
}

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @remarks \@since 4.0.0
 */
export interface CollapseTransitionHookOptions<E extends HTMLElement>
  extends Omit<PreconfiguredCSSTransitionOptions<E>, "exitedHidden">,
    CollapseConfigurationStyle {
  /**
   * An optional style to merge with the required collapse transition styles.
   *
   * If any keys from the {@link CollapseStyle} are included in this object,
   * these styles will override and possibly break the collapse transition.
   */
  style?: CSSProperties;

  /**
   *
   * @see {@link DEFAULT_COLLAPSE_TIMEOUT}
   * @defaultValue `DEFAULT_COLLAPSE_TIMEOUT`
   */
  timeout?: TransitionTimeout;

  /**
   *
   * @defaultValue `minHeight === 0 && minPaddingTop === 0 && minPaddingBottom === 0`
   */
  temporary?: boolean;
}

/**
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @remarks \@since 4.0.0
 */
export interface CollapseTransitionHookReturnValue<E extends HTMLElement>
  extends CSSTransitionHookReturnValue<E>,
    CollapseElementProps<E> {
  /**
   * This is just a convenience object so that you don't need to destructure as
   * many variables to pass to an element.
   *
   * @example
   * Simple Usage
   * ```tsx
   * const { elementProps, rendered } = useCollapseTransition({
   *   // ...options
   *   transitionIn,
   * });
   *
   * if (!rendered) {
   *   return null
   * }
   *
   * return <div {...elementProps}>{children}</div>;
   *
   * // This is the long-hand version
   * const { ref, style, className, hidden, rendered } = useCollapseTransition({
   *   // ...options
   *   transitionIn,
   * });
   *
   * if (!rendered) {
   *   return null
   * }
   *
   * return (
   *   <div
   *     ref={ref}
   *     style={style}
   *     className={className}
   *     hidden={hidden}
   *   >
   *     {children}
   *   </div>
   * );
   * ```
   */
  elementProps: Readonly<CollapseElementProps<E>>;
}

/**
 * This hook is used to create a transition to collapse and expand an element
 * **inline** with other content like an accordion by animating the
 * `max-height`, `padding-top`, and `padding-bottom` CSS properties. The default
 * behavior is to hide the element completely while collapsed, but providing the
 * `minHeight`, `minPaddingTop`, and `minPaddingBottom` options can make this
 * work like a "See More"/"Preview" type of element
 *
 * @example
 * Simple Example
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { Button, Typography, useCollapseTransition } from "@react-md/core";
 *
 * function Example(): ReactElement {
 *   const [collapsed, setCollapsed] = useState(true);
 *   const { elementProps, rendered } =
 *     useCollapseTransition({
 *       transitionIn: !collapsed,
 *       // If the collapsible element should maintain state by not unmounting
 *       // while collapsed, uncomment this next line
 *       // temporary: false,
 *     });
 *
 *   return (
 *     <>
 *       <Button onClick={() => setCollapsed(!collapsed)}>
 *         Toggle
 *       </Button>
 *       {rendered && (
 *         <div {...elementProps}>
 *           <Typography>Stuff that should be collapsed</Typography>
 *           <div>Whatever content...</div>
 *         </div>
 *       )}
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * See More Example
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { Button, IconRotator, Typography, useCollapseTransition } from "@react-md/core";
 * import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";
 *
 * import styles from "./Example.module.scss";
 * // pretend styles:
 * //
 * // .container {
 * //   padding: 1rem;
 * //   position: relative;
 * // }
 * //
 * // .button {
 * //   position: absolute;
 * //   right: 0;
 * //   top: 0;
 * // }
 *
 *
 * function Example(): ReactElement {
 *   const [collapsed, setCollapsed] = useState(true);
 *   const { elementProps } =
 *     useCollapseTransition({
 *       transitionIn: !collapsed,
 *       minHeight: 120,
 *       minPaddingTop: 16,
 *       className: styles.container,
 *     });
 *
 *   return (
 *     <div {...elementProps}>
 *       <Button
 *         aria-expanded={!collapsed}
 *         aria-label="Expand"
 *         onClick={() => setCollapsed(!collapsed)}
 *         buttonType="icon"
 *         className={styles.button}
 *       >
 *         <IconRotator rotated={!collapsed}>
 *           <KeyboardArrowDownSVGIcon />
 *         </IconRotator>
 *       </Button>
 *       <SomeComponentWithALotOfContent />
 *     </div>
 *   );
 * }
 * ```
 *
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @remarks \@since 4.0.0
 */
export function useCollapseTransition<E extends HTMLElement>(
  options: CollapseTransitionHookOptions<E>
): CollapseTransitionHookReturnValue<E> {
  const {
    nodeRef: propNodeRef,
    style: propStyle,
    className,
    transitionIn,
    timeout = DEFAULT_COLLAPSE_TIMEOUT,
    minHeight = 0,
    minPaddingTop = 0,
    minPaddingBottom = 0,
    temporary = minHeight === 0 &&
      minPaddingTop === 0 &&
      minPaddingBottom === 0,
    appear = false,
    enter = true,
    exit = true,
    onEnter = noop,
    onEntering = noop,
    onEntered = noop,
    onExit = noop,
    onExiting = noop,
    onExited = noop,
  } = options;

  const [nodeRef, refCallback] = useEnsuredRef(propNodeRef);
  const [style, setStyle] = useState<CSSProperties | undefined>(() => {
    if (transitionIn) {
      return undefined;
    }

    return {
      maxHeight: minHeight,
      paddingTop: minPaddingTop,
      paddingBottom: minPaddingBottom,
    };
  });

  const transitionTimeout = getTransitionTimeout({
    timeout,
    appear,
    enter,
    exit,
  });

  const { appearing, rendered, ref, stage, transitionTo, disablePortal } =
    useTransition({
      nodeRef: refCallback,
      timeout,
      transitionIn,
      reflow: true,
      appear,
      enter,
      exit,
      temporary,
      onEnter(appearing) {
        onEnter(appearing);
        setStyle({
          maxHeight: minHeight,
          paddingTop: minPaddingTop,
          paddingBottom: minPaddingBottom,
        });
      },
      onEntering(appearing) {
        onEntering(appearing);
        const { maxHeight, paddingTop, paddingBottom } = getElementSizing(
          nodeRef.current
        );

        const duration = appearing
          ? transitionTimeout.appear
          : transitionTimeout.enter;

        setStyle({
          maxHeight,
          paddingTop,
          paddingBottom,
          transitionDuration: `${duration}ms`,
        });
      },
      onEntered(appearing) {
        onEntered(appearing);
        setStyle(undefined);
      },
      onExit() {
        onExit();
        const { maxHeight, paddingTop, paddingBottom } = getElementSizing(
          nodeRef.current
        );

        setStyle({
          maxHeight,
          paddingTop,
          paddingBottom,
          transitionDuration: `${transitionTimeout.exit}ms`,
        });
      },
      onExiting() {
        onExiting();
        setStyle({
          maxHeight: minHeight,
          paddingTop: minPaddingTop,
          paddingBottom: minPaddingBottom,
          transitionDuration: `${transitionTimeout.exit}ms`,
        });
      },
      onExited() {
        onExited();
        setStyle({
          maxHeight: minHeight,
          paddingTop: minPaddingTop,
          paddingBottom: minPaddingBottom,
        });
      },
    });
  const entering = stage === "enter" || stage === "entering";
  const exiting = stage === "exit" || stage === "exiting";
  const collapsible =
    transitionTimeout.enter !== 0 || transitionTimeout.exit !== 0;

  const elementProps: CollapseElementProps<E> = {
    ref,
    style: { ...style, ...propStyle },
    className:
      cnb(
        className,
        collapsible &&
          collapse({
            enter: entering,
            leave: exiting,
            disableOverflow: !transitionIn || !!style,
          }),
        stage === "exited" &&
          minHeight === 0 &&
          minPaddingTop === 0 &&
          minPaddingBottom === 0 &&
          DISPLAY_NONE_CLASS
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
