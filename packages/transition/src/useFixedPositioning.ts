import {
  CSSProperties,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TransitionProps } from "react-transition-group/Transition";
import {
  FixedPositionOptions,
  getFixedPosition,
  getViewportSize,
  PositionAnchor,
  useResizeListener,
  useScrollListener,
} from "@react-md/utils";

export type FixedToFunction = () => HTMLElement | null;

/**
 * @remarks \@since 2.8.0 Supports `RefObject` implementation.
 */
export type FixedTo =
  | RefObject<HTMLElement | null>
  | FixedToFunction
  | HTMLElement
  | string
  | null;
export type OptionalFixedPositionOptions = Omit<
  FixedPositionOptions,
  "container" | "element"
>;
export type GetFixedPositionOptions = (
  node: HTMLElement
) => OptionalFixedPositionOptions;

export type PositionChange = (
  wanted: PositionAnchor,
  actual: PositionAnchor
) => void;

export interface ScrollData {
  element: HTMLElement | null;
  fixedTo: HTMLElement | null;

  /**
   * Boolean if the `fixedTo` element is visible within the viewport. This is useful
   * if you'd like to hide the element only once the user scrolls these elements
   * out of view.
   */
  visible: boolean;
}

export type OnFixedPositionScroll = (event: Event, data: ScrollData) => void;

export type TransitionHooks = Pick<
  TransitionProps,
  "onEnter" | "onEntering" | "onEntered" | "onExited"
>;

export interface FixedPositioningOptions
  extends OptionalFixedPositionOptions,
    TransitionHooks {
  /**
   * The element that the transitioning node should be fixed to.
   */
  fixedTo: FixedTo;

  /**
   * An optional style object to merge and override the generated fixed
   * positioning styles.
   *
   * @example
   * Overriding
   * ```ts
   * useFixedPositioning({
   *   // this will force the `top` to always be `0`
   *   style: { top: 0 },
   * });
   * ```
   *
   * @remarks \@since 2.8.0
   */
  style?: CSSProperties;

  /**
   * An optional function to call to dynamically get the options when the node
   * has been added to the DOM. This is helpful if you need to check sizes or other
   * things once the DOM node has been added for initial positioning or other things
   * like that. The returned options will override the existing options
   */
  getOptions?: GetFixedPositionOptions;

  /**
   * An optional function to call when the element is in the DOM and a window resize
   * event has occurred. The main use-case for this is hiding the fixed element when
   * the page is resized.
   */
  onResize?(event: Event): void;

  /**
   * An optional function to call when the element is in the DOM and a window scroll
   * event has occurred. The main use-case for this is hiding the fixed element when
   * the element or the entire page has a scroll event.
   */
  onScroll?: OnFixedPositionScroll;

  /**
   * An optional function to call when the provide `xPosition` and `yPosition` are not
   * the same as the "calculated" position after trying to make the element fixed
   * within the viewport.
   */
  onPositionChange?: PositionChange;
}

function getFixedTo(fixedTo: FixedTo): HTMLElement | null {
  if (!fixedTo) {
    return null;
  }

  if (typeof fixedTo === "string") {
    return (
      document.getElementById(fixedTo) ||
      document.querySelector<HTMLElement>(fixedTo)
    );
  }

  if (typeof fixedTo === "function") {
    return fixedTo();
  }

  if ("current" in fixedTo) {
    return fixedTo.current;
  }

  return fixedTo;
}

interface FixedPositioningHookReturnValue extends Required<TransitionHooks> {
  style: CSSProperties;
  updateStyle(): void;
}

/**
 * This hook is used to automatically handle fixed positioning when an element
 * is used alongside a `Transition` from `react-transition-group`. This will
 * provide merged `onEnter`, `onEntering`, `onEntered`, and `onExited` handlers
 * to pass down as well as the current style object to apply to the element.
 *
 * Until the element has been removed from the DOM and is visible, the position
 * will automatically update when the user scrolls or resizes the screen.
 *
 * @remarks
 *
 * It is recommended to start the exit animation when that happens though.
 */
export function useFixedPositioning({
  style: propStyle,
  onEnter,
  onEntering,
  onEntered,
  onExited,
  fixedTo,
  getOptions,
  onResize,
  onScroll,
  anchor: currentAnchor = {},
  initialX,
  initialY,
  xMargin = 0,
  vwMargin = 16,
  yMargin = 0,
  vhMargin = 16,
  width = "auto",
  onPositionChange,
  transformOrigin = false,
  preventOverlap = false,
  disableSwapping = false,
  disableVHBounds = false,
}: FixedPositioningOptions): FixedPositioningHookReturnValue {
  const [style, setStyle] = useState<CSSProperties | undefined>();
  const [element, setElement] = useState<HTMLElement | null>(null);

  const updateStyle = useCallback(
    (nextElement?: HTMLElement | null) => {
      const node = nextElement ?? element;
      if (typeof nextElement !== "undefined") {
        setElement(nextElement);
      }

      if (!node) {
        return;
      }

      const anchor = {
        x: currentAnchor.x || "center",
        y: currentAnchor.y || "below",
      };
      const overrides =
        typeof getOptions === "function" ? getOptions(node) : {};
      const opts: FixedPositionOptions = {
        initialX,
        initialY,
        xMargin,
        vwMargin,
        yMargin,
        vhMargin,
        width,
        transformOrigin,
        preventOverlap,
        disableSwapping,
        disableVHBounds,
        anchor,
        container: getFixedTo(fixedTo),
        element: node,
        ...overrides,
      };

      const { style, actualX, actualY } = getFixedPosition(opts);

      const actual = { x: actualX, y: actualY };
      if (
        onPositionChange &&
        (anchor.x !== actual.x || anchor.y !== actual.y)
      ) {
        onPositionChange(anchor, actual);
      }

      setStyle(style);
    },
    [
      currentAnchor.x,
      currentAnchor.y,
      disableSwapping,
      disableVHBounds,
      fixedTo,
      getOptions,
      initialX,
      initialY,
      onPositionChange,
      preventOverlap,
      transformOrigin,
      vhMargin,
      vwMargin,
      width,
      xMargin,
      yMargin,
      element,
    ]
  );

  const handleEnter = useCallback(
    (node: HTMLElement, appear: boolean) => {
      if (onEnter) {
        onEnter(node, appear);
      }

      updateStyle(node);
    },
    [onEnter, updateStyle]
  );

  const handleEntering = useCallback(
    (node: HTMLElement, appear: boolean) => {
      if (onEntering) {
        onEntering(node, appear);
      }

      updateStyle(node);
    },
    [onEntering, updateStyle]
  );

  const handleEntered = useCallback(
    (node: HTMLElement, appear: boolean) => {
      if (onEntered) {
        onEntered(node, appear);
      }

      updateStyle(node);
    },
    [onEntered, updateStyle]
  );

  const handleExited = useCallback(
    (node: HTMLElement) => {
      if (onExited) {
        onExited(node);
      }

      setElement(null);
    },
    [onExited]
  );

  useResizeListener({
    enabled: !!element,
    onResize: (event) => {
      if (onResize) {
        onResize(event);
      }

      updateStyle();
    },
  });

  useScrollListener({
    enabled: !!element,
    onScroll: (event) => {
      if (onScroll) {
        const container = getFixedTo(fixedTo);
        const containerRect = container && container.getBoundingClientRect();
        const elementRect = element && element.getBoundingClientRect();
        let visible = false;
        if (containerRect && elementRect) {
          const vh = getViewportSize("height");
          const vw = getViewportSize("width");
          const top = Math.min(elementRect.top, containerRect.top);
          const right = Math.max(elementRect.right, containerRect.right);
          const bottom = Math.max(elementRect.bottom, containerRect.bottom);
          const left = Math.min(elementRect.left, containerRect.left);

          visible = bottom >= 0 && top <= vh && right >= 0 && left <= vw;
        }

        onScroll(event, {
          element,
          fixedTo: container,
          visible,
        });
      }

      updateStyle();
    },
  });

  useEffect(() => {
    updateStyle();

    // Need to only update when the initialX and initialY values are changed.
    // If this is triggered each time the updateStyle is changed, it causes an
    // infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialX, initialY]);

  return {
    style: { ...style, ...propStyle },
    updateStyle,
    onEnter: handleEnter,
    onEntering: handleEntering,
    onEntered: handleEntered,
    onExited: handleExited,
  };
}
