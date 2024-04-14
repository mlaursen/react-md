import type {
  CSSTransitionClassNames,
  CSSTransitionClassNamesObject,
  TransitionActions,
  TransitionTimeout,
  TransitionTimeoutObject,
} from "./types.js";

/**
 * @since 4.0.0
 * @internal
 */
export interface TransitionTimeoutOptions extends Required<TransitionActions> {
  timeout: TransitionTimeout;
}

/**
 * @since 4.0.0
 * @internal
 */
export function getTransitionTimeout(
  options: Readonly<TransitionTimeoutOptions>
): Readonly<Required<TransitionTimeoutObject>> {
  const { timeout, appear, enter, exit } = options;
  if (typeof timeout === "number") {
    return {
      appear: appear ? timeout : 0,
      enter: enter ? timeout : 0,
      exit: exit ? timeout : 0,
    };
  }

  return {
    appear: (appear && (timeout.appear ?? timeout.enter)) || 0,
    enter: (enter && timeout.enter) || 0,
    exit: (exit && timeout.exit) || 0,
  };
}

/**
 * @since 4.0.0
 * @internal
 */
export interface CollapseSizing {
  maxHeight?: number;
  paddingTop?: number;
  paddingBottom?: number;
}

/**
 * A small util that will find the max-height, padding-top, and padding-bottom
 * for the provided element. This is really used to be able to transition the
 * max-height value since `max-height: auto` does not transition. The only way
 * to get transition is to change max-height values manually.
 *
 * @since 4.0.0
 * @internal
 */
export function getElementSizing(element: HTMLElement | null): CollapseSizing {
  let maxHeight: number | undefined;
  let paddingTop: number | undefined;
  let paddingBottom: number | undefined;
  if (element) {
    // clone the element so that the total height and padding can be calculated
    // without being affected by the collapse transition inline styles
    const cloned = element.cloneNode(true) as HTMLElement;
    cloned.style.maxHeight = "";
    cloned.style.padding = "";
    cloned.style.paddingLeft = element.style.paddingLeft;
    cloned.style.paddingRight = element.style.paddingRight;
    cloned.style.visibility = "hidden";

    const container = element.parentElement || document.body;
    container.appendChild(cloned);
    maxHeight = cloned.scrollHeight;
    const style = window.getComputedStyle(cloned);
    const isContentBox = style.boxSizing === "content-box";
    if (style.paddingTop) {
      paddingTop = parseFloat(style.paddingTop);
      if (isContentBox) {
        maxHeight += paddingTop;
      }
    }

    if (style.paddingBottom) {
      paddingBottom = parseFloat(style.paddingBottom);
      if (isContentBox) {
        maxHeight += paddingBottom;
      }
    }
    container.removeChild(cloned);
  }

  return { maxHeight, paddingTop, paddingBottom };
}

/**
 * @since 4.0.0
 * @internal
 */
export interface TransitionClassNamesOptions extends TransitionTimeoutOptions {
  classNames: CSSTransitionClassNames;
}

/**
 * @since 4.0.0
 * @internal
 */
export function getTransitionClassNames(
  options: TransitionClassNamesOptions
): Readonly<Required<CSSTransitionClassNamesObject>> {
  const { classNames, ...timeoutOptions } = options;
  const timeout = getTransitionTimeout(timeoutOptions);

  if (typeof classNames === "string") {
    const { appear, enter, exit } = timeout;
    return {
      appear: appear ? `${classNames}--appear` : "",
      appearActive: appear ? `${classNames}--appear-active` : "",
      appearDone: "",
      enter: enter ? `${classNames}--enter` : "",
      enterActive: enter ? `${classNames}--enter-active` : "",
      enterDone: "",
      exit: exit ? `${classNames}--exit` : "",
      exitActive: exit ? `${classNames}--exit-active` : "",
      exitDone: "",
    };
  }

  const {
    enter = "",
    enterActive = "",
    enterDone = "",
    exit = "",
    exitActive = "",
    exitDone = "",
    appear = (timeout.appear && enter) || "",
    appearActive = (timeout.appear && enterActive) || "",
    appearDone = (timeout.appear && enterDone) || "",
  } = classNames;

  return {
    appear,
    appearActive,
    appearDone,
    enter,
    enterActive,
    enterDone,
    exit,
    exitActive,
    exitDone,
  };
}
