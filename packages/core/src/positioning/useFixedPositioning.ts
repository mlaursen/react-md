"use client";
import type { CSSProperties, Ref, RefCallback, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { delegateEvent } from "../delegateEvent.js";
import type { TransitionCallbacks } from "../transition/types.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
import { BELOW_CENTER_ANCHOR } from "./constants.js";
import { getFixedPosition } from "./getFixedPosition.js";
import type { CalculateFixedPositionOptions } from "./types.js";
import { isWithinViewport } from "./utils.js";

const noop = (): undefined => undefined;

/**
 * @remarks \@since 4.0.0
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
 * @remarks \@since 4.0.0
 */
export interface FixedPositioningTransitionOptions<E extends HTMLElement>
  extends FixedPositioningTransitionCallbacks {
  /** {@inheritDoc TransitionOptions.nodeRef} */
  nodeRef?: Ref<E>;
}

/**
 * @typeParam FixedToElement - An HTMLElement type for the static element.
 * @typeParam FixedElement - An HTMLElement type for the fixed element.
 * @remarks \@since 4.0.0
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
 * @remarks \@since 4.0.0
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
 * @remarks \@since 4.0.0
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
  getFixedPositionOptions?(): CalculateFixedPositionOptions;

  /**
   * An optional function to call if the page resizes while the `FixedElement`
   * is visible.
   */
  onResize?: EventListener;
  /** @see {@link TransitionScrollCallback} */
  onScroll?: TransitionScrollCallback<FixedToElement, FixedElement>;
}

/**
 * @typeParam E - An HTMLElement type for the fixed element.
 * @remarks \@since 4.0.0
 */
export interface FixedPositioningHookReturnValue<E extends HTMLElement> {
  /**
   * A ref that should be passed to a component for the fixed positioning
   * behavior to work correctly.
   *
   * This should really only be used if the {@link TransitionOptions} is not
   * being used.
   */
  ref: RefCallback<E>;

  /**
   * @see {@link FixedPositionStyle}
   */
  style: CSSProperties;

  /**
   * This should really only be used if the {@link transitionOptions} is not
   * being used.
   */
  callbacks: Readonly<Required<FixedPositioningTransitionCallbacks>>;

  /**
   * A function that can be called to update the style for the fixed element.
   */
  updateStyle(): void;

  /** {@inheritDoc FixedPositioningTransitionOptions} */
  transitionOptions: Readonly<Required<FixedPositioningTransitionOptions<E>>>;
}

/**
 * This hook is used to attach a temporary (fixed) element to another element
 * within the page. In other words, this is a way to have an element with
 * `position: fixed` as if it were `position: absolute` to a parent element that
 * had `position: relative`.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { ReactElement, useRef, useState } from "react";
 * import { Button, useCSSTransition, useFixedPositioning } from "@react-md/core";
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
 *       <Button
 *         ref={fixedTo}
 *         onClick={() => setTransitionIn(!transitionIn)}
 *       >
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
 * @typeParam FixedToElement - An HTMLElement type for the static element.
 * @typeParam FixedElement - An HTMLElement type for the fixed element.
 * @remarks \@since 4.0.0
 */
export function useFixedPositioning<
  FixedToElement extends HTMLElement,
  FixedElement extends HTMLElement,
>(
  options: FixedPositioningOptions<FixedToElement, FixedElement>
): FixedPositioningHookReturnValue<FixedElement> {
  const {
    style: propStyle,
    nodeRef,
    fixedTo,
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

    // Only changing the initialX and initialY should cause the useEffect below
    // to trigger, which is why everything else is set in a ref.
  }, [initialX, initialY]);

  useEffect(() => {
    if (!active) {
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
  }, [active, fixedTo, onResize, onScroll, ref, updateStyle]);

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
    style: { ...style, ...propStyle },
    callbacks,
    updateStyle,
    transitionOptions: {
      ...callbacks,
      nodeRef: refHandler,
    },
  };
}
