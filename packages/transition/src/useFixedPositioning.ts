import type { CSSProperties, RefCallback, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CalculateFixedPositionOptions } from "@react-md/utils";
import {
  BELOW_CENTER_ANCHOR,
  getFixedPosition,
  useEnsuredRef,
  useResizeListener,
  useScrollListener,
} from "@react-md/utils";

import type {
  FixedPositioningTransitionCallbacks,
  FixedPositioningTransitionOptions,
  TransitionScrollCallback,
} from "./types";
import { isWithinViewport } from "./utils";

/**
 * @typeParam FixedToElement - An HTMLElement type for the static element.
 * @typeParam FixedElement - An HTMLElement type for the fixed element.
 * @remarks \@since 4.0.0
 */
export interface FixedPositioningOptions<
  FixedToElement extends HTMLElement,
  FixedElement extends HTMLElement
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
   * An optional function to call if the page resizes while the
   * {@link FixedElement} is visible.
   */
  onResize?: EventListener;
  /** {@inheritDoc TransitionScrollCallback} */
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
   * This should really only be used if the {@link transitionOptions} is not
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
 * import { Button } from "@react-md/button";
 * import { useCSSTransition, useFixedPositioning } from "@react-md/transition";
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
  FixedElement extends HTMLElement
>({
  style: propStyle,
  nodeRef,
  fixedTo,
  onEnter,
  onEntering,
  onEntered,
  onExited,
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
  getFixedPositionOptions,
  onScroll,
  onResize,
}: FixedPositioningOptions<
  FixedToElement,
  FixedElement
>): FixedPositioningHookReturnValue<FixedElement> {
  const [style, setStyle] = useState<CSSProperties | undefined>();
  const [active, setActive] = useState(false);
  const [ref, refHandler] = useEnsuredRef(nodeRef);
  const options = {
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
  } as const;
  const optionsRef = useRef(options);
  optionsRef.current = options;

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
      ...getFixedPositionOptions?.(),
    });

    setStyle(style);
    setActive(!!element && !element.hidden);

    // Only changing the initialX and initialY should cause the useEffect below
    // to trigger, which is why everything else is set in a ref.
  }, [initialX, initialY]);

  useResizeListener({
    enabled: active,
    onResize(event) {
      onResize?.(event);
      updateStyle();
    },
  });

  useScrollListener({
    enabled: active,
    onScroll(event) {
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
    },
  });

  useEffect(() => {
    if (!ref.current || !ref.current.hidden) {
      updateStyle();
    }
  }, [ref, updateStyle]);

  const callbacks: Required<FixedPositioningTransitionCallbacks> = {
    onEnter(appearing) {
      onEnter?.(appearing);
      updateStyle();
    },
    onEntering(appearing) {
      onEntering?.(appearing);
      updateStyle();
    },
    onEntered(appearing) {
      onEntered?.(appearing);
      updateStyle();
    },
    onExited() {
      onExited?.();
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
