"use client";

import {
  type CSSProperties,
  type Ref,
  type RefCallback,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { delegateEvent } from "../delegateEvent.js";
import { type TransitionCallbacks } from "../transition/types.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
import { BELOW_CENTER_ANCHOR } from "./constants.js";
import { getFixedPosition } from "./getFixedPosition.js";
import {
  type CalculateFixedPositionOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type FixedPositionStyle,
} from "./types.js";
import { isWithinViewport } from "./utils.js";

const noop = (): undefined => undefined;

/**
 * @since 4.0.0
 */
export type FixedPositioningTransitionCallbacks = Pick<
  TransitionCallbacks,
  "onEnter" | "onEntering" | "onEntered" | "onExited"
>;

/**
 * This options should be passed to the {@link useCSSTransition} for the styling
 * and positioning to work correctly.
 *
 * @typeParam E - An HTMLElement type used for the ref required for the
 * transition.
 * @since 4.0.0
 */
export interface FixedPositioningTransitionOptions<E extends HTMLElement>
  extends FixedPositioningTransitionCallbacks {
  /** {@inheritDoc TransitionOptions.nodeRef} */
  nodeRef?: Ref<E>;
}

/**
 * @typeParam FixedToElement - An HTMLElement type for the static element.
 * @typeParam FixedElement - An HTMLElement type for the fixed element.
 * @since 4.0.0
 */
export interface FixedPositioningScrollData<
  FixedToElement extends HTMLElement,
  FixedElement extends HTMLElement,
> {
  fixedElement: FixedElement;
  fixedToElement: FixedToElement;

  /**
   * Boolean if the {@link fixedToElement} is visible within the viewport.
   */
  visible: boolean;
}

/**
 * This function is called when the page is scrolled while the fixed element is
 * visible. This is generally used to reposition the fixed element or hide it if
 * it is no longer visible within the viewport.
 *
 * @typeParam FixedToElement - An HTMLElement type for the static element.
 * @typeParam FixedElement - An HTMLElement type for the fixed element.
 * @param event - The scroll event
 * @param data - The {@link FixedPositioningScrollData} that can be used for
 * custom scroll behavior.
 * @since 4.0.0
 */
export type TransitionScrollCallback<
  FixedToElement extends HTMLElement,
  FixedElement extends HTMLElement,
> = (
  event: Event,
  data: Readonly<FixedPositioningScrollData<FixedToElement, FixedElement>>
) => void;

/**
 * @typeParam FixedToElement - An HTMLElement type for the static element.
 * @typeParam FixedElement - An HTMLElement type for the fixed element.
 * @since 4.0.0
 */
export interface FixedPositioningOptions<
  FixedToElement extends HTMLElement,
  FixedElement extends HTMLElement,
> extends FixedPositioningTransitionOptions<FixedElement>,
    CalculateFixedPositionOptions {
  /**
   * An optional style that will be merged with the fixed positioning required
   * styles.
   *
   * @see {@link FixedPositionStyle}
   */
  style?: CSSProperties;

  /**
   * A ref pointing to an element that another element should be fixed to. This
   * **must** be provided for the positioning to work.
   */
  fixedTo: RefObject<FixedToElement>;

  /**
   * An optional function that can be used to override positioning options if
   * some options require the element to be in the DOM for specific
   * calculations.
   */
  getFixedPositionOptions?: () => CalculateFixedPositionOptions;

  /**
   * An optional function to call if the page resizes while the `FixedElement`
   * is visible.
   */
  onResize?: EventListener;
  /** @see {@link TransitionScrollCallback} */
  onScroll?: TransitionScrollCallback<FixedToElement, FixedElement>;

  /**
   * Set this to `true` to disable the fixed positioning behavior so it can be
   * customized within CSS or manually instead. This was added mostly to just
   * support rendering menus inline with other content (like autocompletes
   * within a dialog).
   *
   * @defaultValue `false`
   * @since 6.0.0
   */
  disabled?: boolean;
}

/**
 * @typeParam E - An HTMLElement type for the fixed element.
 * @since 4.0.0
 * @since 6.0.0 Renamed from `FixedPositioningHookReturnValue` to
 * `FixedPositioningImplementation` to match naming conventions.
 */
export interface FixedPositioningImplementation<E extends HTMLElement> {
  /**
   * A ref that should be passed to a component for the fixed positioning
   * behavior to work correctly.
   *
   * This should really only be used if the {@link TransitionOptions} is not
   * being used.
   */
  ref: RefCallback<E>;

  /**
   * This is the {@link FixedPositionStyle} merged with the
   * {@link FixedPositioningOptions.style}. This will only return `undefined`
   * when {@link FixedPositioningOptions.disabled} is `true` and no `style` was
   * provided.
   */
  style: CSSProperties | undefined;

  /**
   * This should really only be used if the {@link transitionOptions} is not
   * being used.
   */
  callbacks: Readonly<Required<FixedPositioningTransitionCallbacks>>;

  /**
   * A function that can be called to update the style for the fixed element.
   */
  updateStyle: () => void;

  /** {@inheritDoc FixedPositioningTransitionOptions} */
  transitionOptions: Readonly<Required<FixedPositioningTransitionOptions<E>>>;
}

/**
 * This hook is used to attach a temporary (fixed) element to another element
 * within the page. In other words, this is a way to have an element with
 * `position: fixed` as if it were `position: absolute` to a parent element that
 * had `position: relative`.
 *
 * @example Simple Example
 * ```tsx
 * "use client";
 *
 * import { Button } from "@react-md/core/button/Button";
 * import { useFixedPositioning } from "@react-md/core/positioning/useFixedPositioning";
 * import { useCSSTransition } from "@react-md/core/transition/useCSSTransition";
 * import { type ReactElement, useRef, useState } from "react";
 *
 * function Example(): ReactElement {
 *   const fixedTo = useRef<HTMLButtonElement>(null);
 *   const [transitionIn, setTransitionIn] = useState(false);
 *   const { style, transitionOptions } = useFixedPositioning({
 *     fixedTo,
 *   });
 *   const { elementProps, rendered } = useCSSTransition({
 *     ...transitionOptions,
 *     transitionIn,
 *     temporary: true,
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
 *   });
 *
 *   return (
 *     <>
 *       <Button ref={fixedTo} onClick={() => setTransitionIn(!transitionIn)}>
 *         Toggle
 *       </Button>
 *       {rendered && (
 *         <div {...elementProps} style={style}>
 *           Fixed Temporary Element
 *         </div>
 *       )}
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/hooks/use-fixed-positioning | useFixedPositioning Demos}
 * @typeParam FixedToElement - An HTMLElement type for the static element.
 * @typeParam FixedElement - An HTMLElement type for the fixed element.
 * @since 4.0.0
 */
export function useFixedPositioning<
  FixedToElement extends HTMLElement,
  FixedElement extends HTMLElement,
>(
  options: FixedPositioningOptions<FixedToElement, FixedElement>
): FixedPositioningImplementation<FixedElement> {
  const {
    style: propStyle,
    nodeRef,
    fixedTo,
    disabled,
    onEnter = noop,
    onEntering = noop,
    onEntered = noop,
    onExited = noop,
    anchor = BELOW_CENTER_ANCHOR,
    disableSwapping,
    disableVHBounds,
    initialX,
    initialY,
    preventOverlap,
    transformOrigin,
    vhMargin,
    vwMargin,
    width,
    xMargin,
    yMargin,
    getFixedPositionOptions = noop,
    onScroll,
    onResize = noop,
  } = options;

  const [active, setActive] = useState(false);
  const [ref, refHandler] = useEnsuredRef(nodeRef);
  const optionsRef = useRef({
    ref,
    fixedTo,
    anchor,
    disableSwapping,
    disableVHBounds,
    preventOverlap,
    transformOrigin,
    vhMargin,
    vwMargin,
    width,
    xMargin,
    yMargin,
    getFixedPositionOptions,
  } as const);
  useIsomorphicLayoutEffect(() => {
    optionsRef.current = {
      ref,
      fixedTo,
      anchor,
      disableSwapping,
      disableVHBounds,
      preventOverlap,
      transformOrigin,
      vhMargin,
      vwMargin,
      width,
      xMargin,
      yMargin,
      getFixedPositionOptions,
    };
  }, [
    ref,
    fixedTo,
    anchor,
    disableSwapping,
    disableVHBounds,
    preventOverlap,
    transformOrigin,
    vhMargin,
    vwMargin,
    width,
    xMargin,
    yMargin,
    getFixedPositionOptions,
  ]);
  const [style, setStyle] = useState<CSSProperties | undefined>(
    () =>
      getFixedPosition({
        container: ref.current,
        element: fixedTo.current,
        anchor,
        disableSwapping,
        disableVHBounds,
        initialX,
        initialY,
        preventOverlap,
        transformOrigin,
        vhMargin,
        vwMargin,
        width,
        xMargin,
        yMargin,
        ...getFixedPositionOptions(),
      }).style
  );

  const updateStyle = useCallback(() => {
    if (disabled) {
      return;
    }

    const {
      ref,
      fixedTo,
      anchor,
      disableSwapping,
      disableVHBounds,
      preventOverlap,
      transformOrigin,
      vhMargin,
      vwMargin,
      width,
      xMargin,
      yMargin,
      getFixedPositionOptions,
    } = optionsRef.current;
    const element = ref.current;
    const container = fixedTo.current;
    const { style } = getFixedPosition({
      container,
      element,
      anchor,
      disableSwapping,
      disableVHBounds,
      initialX,
      initialY,
      preventOverlap,
      transformOrigin,
      vhMargin,
      vwMargin,
      width,
      xMargin,
      yMargin,
      ...getFixedPositionOptions(),
    });

    setStyle(style);
    setActive(!!element && !element.hidden);

    // Only changing the initialX, initialY, or disabled should cause the
    // useEffect below to trigger, which is why everything else is set in a ref.
  }, [disabled, initialX, initialY]);

  useEffect(() => {
    if (!active || disabled) {
      return;
    }

    const resizeCallback = (event: Event): void => {
      onResize(event);
      updateStyle();
    };
    const scrollCallback = (event: Event): void => {
      const fixedElement = ref.current;
      const fixedToElement = fixedTo.current;
      if (onScroll && fixedElement && fixedToElement) {
        onScroll(event, {
          visible: isWithinViewport({ fixedElement, fixedToElement }),
          fixedElement,
          fixedToElement,
        });
      }

      updateStyle();
    };

    const resizeHandler = delegateEvent("resize", window, true);
    const scrollHandler = delegateEvent("scroll", window, true, {
      passive: true,
    });
    resizeHandler.add(resizeCallback);
    scrollHandler.add(scrollCallback);
    return () => {
      resizeHandler.remove(resizeCallback);
      scrollHandler.remove(scrollCallback);
    };
  }, [active, disabled, fixedTo, onResize, onScroll, ref, updateStyle]);

  const callbacks: Required<FixedPositioningTransitionCallbacks> = {
    onEnter(appearing) {
      onEnter(appearing);
      updateStyle();
    },
    onEntering(appearing) {
      onEntering(appearing);
      updateStyle();
    },
    onEntered(appearing) {
      onEntered(appearing);
      updateStyle();
    },
    onExited() {
      onExited();
      setActive(false);
    },
  };

  return {
    ref: refHandler,
    style: disabled ? propStyle : { ...style, ...propStyle },
    callbacks,
    updateStyle,
    transitionOptions: {
      ...callbacks,
      nodeRef: refHandler,
    },
  };
}
