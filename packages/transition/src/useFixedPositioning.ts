import { CSSProperties, useCallback, useRef, useState } from "react";
import { TransitionProps } from "react-transition-group/Transition";
import {
  FixedPositionOptions,
  getFixedPosition,
  PositionAnchor,
  useRefCache,
  useResizeListener,
  useScrollListener,
  getViewportSize,
} from "@react-md/utils";

export type FixedToFunction = () => HTMLElement | null;
export type FixedTo = string | HTMLElement | null | FixedToFunction;
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
  onResize?: (event: Event) => void;

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

  const t = typeof fixedTo;
  switch (t) {
    case "string":
      fixedTo = fixedTo as string;
      return (
        document.getElementById(fixedTo) ||
        document.querySelector<HTMLElement>(fixedTo)
      );
    case "function":
      return (fixedTo as FixedToFunction)();
    default:
      return fixedTo as HTMLElement;
  }
}

interface ReturnValue extends Required<TransitionHooks> {
  style?: CSSProperties;
  updateStyle: () => void;
}

/**
 * This hook is used to automatically handle fixed positioning when an element is used alongside a
 * `Transition` from `react-transition-group`. This will provide merged `onEnter`, `onEntering`,
 * `onEntered`, and `onExited` handlers to pass down as well as the current style object to apply
 * to the element.
 *
 * Until the element has been removed from the DOM and is visible, the position will automatically
 * update when the user scrolls or resizes the screen.
 *
 * > It is recommended to start the exit animation when that happens though.
 */
export default function useFixedPositioning({
  onEnter,
  onEntering,
  onEntered,
  onExited,
  fixedTo,
  getOptions,
  onResize,
  onScroll,
  ...remainingOptions
}: FixedPositioningOptions): ReturnValue {
  const [style, setStyle] = useState<CSSProperties | undefined>();
  const handlers = useRefCache({ onEnter, onEntering, onEntered, onExited });
  const options = useRefCache({ fixedTo, getOptions, ...remainingOptions });

  const element = useRef<HTMLElement | null>(null);

  const updateStyle = useCallback(() => {
    const node = element.current;
    if (!node) {
      return;
    }

    const {
      fixedTo,
      getOptions,
      onPositionChange,
      anchor: currentAnchor = {},
      ...remaining
    } = options.current;
    const anchor = {
      x: currentAnchor.x || "center",
      y: currentAnchor.y || "below",
    };
    const overrides = typeof getOptions === "function" ? getOptions(node) : {};
    const opts = {
      ...remaining,
      ...overrides,
      anchor,
    };

    const { style, actualX, actualY } = getFixedPosition({
      container: getFixedTo(fixedTo),
      element: node,
      ...opts,
    });

    const actual = { x: actualX, y: actualY };
    if (onPositionChange && (anchor.x !== actual.x || anchor.y !== actual.y)) {
      onPositionChange(anchor, actual);
    }

    setStyle(style);
  }, [options]);

  const updateNodeAndStyle = useCallback(
    (node: HTMLElement) => {
      element.current = node;
      updateStyle();
    },
    [updateStyle]
  );

  const handleEnter = useCallback(
    (node: HTMLElement, appear: boolean) => {
      const { onEnter } = handlers.current;
      if (onEnter) {
        onEnter(node, appear);
      }

      updateNodeAndStyle(node);
    },
    [handlers, updateNodeAndStyle]
  );

  const handleEntering = useCallback(
    (node: HTMLElement, appear: boolean) => {
      const { onEntering } = handlers.current;
      if (onEntering) {
        onEntering(node, appear);
      }

      updateNodeAndStyle(node);
    },
    [handlers, updateNodeAndStyle]
  );

  const handleEntered = useCallback(
    (node: HTMLElement, appear: boolean) => {
      const { onEntered } = handlers.current;
      if (onEntered) {
        onEntered(node, appear);
      }

      updateNodeAndStyle(node);
    },
    [handlers, updateNodeAndStyle]
  );

  const handleExited = useCallback(
    (node: HTMLElement) => {
      const { onExited } = handlers.current;
      if (onExited) {
        onExited(node);
      }

      element.current = null;
    },
    [handlers]
  );

  useResizeListener({
    enabled: !!element.current,
    onResize: event => {
      if (onResize) {
        onResize(event);
      }

      updateStyle();
    },
  });

  useScrollListener({
    enabled: !!element.current,
    onScroll: event => {
      if (onScroll) {
        const container = getFixedTo(fixedTo);
        const rect = container && container.getBoundingClientRect();
        let visible = false;
        if (rect) {
          const { vhMargin = 16, vwMargin = 16 } = remainingOptions;
          const vh = getViewportSize("height");
          const vw = getViewportSize("width");
          const { top, left } = rect;

          visible =
            top >= vhMargin &&
            top <= vh - vhMargin &&
            left >= vwMargin &&
            left <= vw - vwMargin;
        }

        onScroll(event, {
          element: element.current,
          fixedTo: container,
          visible,
        });
      }

      updateStyle();
    },
  });

  return {
    style,
    updateStyle,
    onEnter: handleEnter,
    onEntering: handleEntering,
    onEntered: handleEntered,
    onExited: handleExited,
  };
}
