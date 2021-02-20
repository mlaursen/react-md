import React, { ElementType, ReactElement, useCallback, useState } from "react";

import { OnResizeObserverChange, useResizeObserver } from "./useResizeObserver";
import { ResizeObserverTarget } from "./useResizeObserverV1";

export interface ResizeObserverProps {
  /**
   * An optional className to provide to this component when the `target` prop
   * is provided. You should really not be adding styles to this component as it
   * is hidden.
   */
  className?: string;

  /**
   * This prop will only be used when the `target` prop is `undefined`. Since
   * the `ResizeObserver` will need to find a DOM node to listen to changes to,
   * it will be rendered in the dom and find the parent element for size
   * changes. You really only want to change this up if trying to listen to
   * table resize events and not using the `target` prop.
   */
  component?: ElementType;

  /**
   * Boolean if the resize observer should stop tracking height changes. This
   * will only update the callback/renderer to not update on height changes, so
   * there will not be a huge performance boost.
   */
  disableHeight?: boolean;

  /**
   * Boolean if the resize observer should stop tracking width changes. This
   * will only update the callback/renderer to not update on height changes, so
   * there will not be a huge performance boost.
   */
  disableWidth?: boolean;

  /**
   * An optional resize target to be used instead of the parent element of this
   * component.  This can either be an `HTMLElement`, a `querySelector` string,
   * a function that returns an `HTMLElement` or `null`.
   *
   * Setting this to `null` will result in a "lazy Observer". The observer will
   * not start until it has been updated to be a string or an HTMLElement.
   */
  target?: ResizeObserverTarget;

  /**
   * The resize event handler for the resize observer. The callback will include
   * the next height, width, scrollHeight, scrollWidth, and the element that is
   * being observed.
   */
  onResize: OnResizeObserverChange;
}

/**
 * The resize observer is used to track the size changes for a single element in
 * a page. This is a bit different than a normal `ResizeListener` since it does
 * not rely on entire page size changes.
 *
 * @deprecated 2.3.0 You should really use the `useResizeObserver` hook instead
 * since it offers a lot more flexibility and functionality than this component.
 */
export function ResizeObserver({
  disableHeight = false,
  disableWidth = false,
  className,
  component: Component = "span",
  target,
  onResize,
}: ResizeObserverProps): ReactElement | null {
  const [element, setElement] = useState<HTMLElement | null>(null);
  useResizeObserver({
    disableHeight,
    disableWidth,
    target: target || element,
    onResize,
  });
  const ref = useCallback((instance: HTMLElement | null) => {
    if (!instance) {
      setElement(null);
      return;
    }

    setElement(instance.parentElement);
  }, []);

  if (target === null || target) {
    return null;
  }

  return <Component className={className} aria-hidden="true" ref={ref} />;
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ResizeObserver.propTypes = {
      disableHeight: PropTypes.bool,
      disableWidth: PropTypes.bool,
      className: PropTypes.string,
      component: PropTypes.oneOfType([
        // workaround for Typescript since PropTypes.string throws WeakValidationMap error
        // but this component only supports string components
        PropTypes.string,
      ]),
      target: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
    };
  } catch (e) {}
}
