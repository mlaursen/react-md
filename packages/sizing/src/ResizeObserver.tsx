import React, {
  FunctionComponent,
  ElementType,
  useCallback,
  useState,
} from "react";
import useResizeObserver, {
  ResizeObserverChangeEventHandler,
  ResizeObserverTargetFinder,
} from "./useResizeObserver";

export interface ResizeObserverProps {
  /**
   * An optional className to provide to this component when the `target` prop is provided. You
   * should really not be adding styles to this component as it is hidden.
   */
  className?: string;

  /**
   * This prop will only be used when the `target` prop is `undefined`. Since the `ResizeObserver`
   * will need to find a DOM node to listen to changes to, it will be rendered in the dom and find
   * the parent element for size changes. You really only want to change this up if trying to listen
   * to table resize events and not using the `target` prop.
   */
  component?: ElementType;

  /**
   * Boolean if the resize observer should stop tracking height changes. This will only
   * update the callback/renderer to not update on height changes, so there will not
   * be a huge performance boost.
   */
  disableHeight?: boolean;

  /**
   * Boolean if the resize observer should stop tracking width changes. This will only
   * update the callback/renderer to not update on height changes, so there will not
   * be a huge performance boost.
   */
  disableWidth?: boolean;

  /**
   * An optional resize target to be used instead of the parent element of this component.
   * This can either be an `HTMLElement`, a `querySelector` string, a function that returns
   * an `HTMLElement` or `null`.
   *
   * Setting this to `null` will result in a "lazy Observer". The observer will not start until it has
   * been updated to be a string or an HTMLElement.
   */
  target?: ResizeObserverTargetFinder;

  /**
   * The resize event handler for the resize observer. The callback will include the next height, width,
   * scrollHeight, scrollWidth, and the element that is being observed.
   */
  onResize: ResizeObserverChangeEventHandler;
}

type DefaultProps = Required<
  Pick<ResizeObserverProps, "disableWidth" | "disableHeight" | "component">
>;
type WithDefaultProps = ResizeObserverProps & DefaultProps;

/**
 * The resize observer is used to track the size changes for a single element in a page.
 * This is a bit different than a normal `ResizeListener` since it does not rely on entire
 * page size changes.
 */
const ResizeObserver: FunctionComponent<
  ResizeObserverProps
> = providedProps => {
  const {
    disableHeight,
    disableWidth,
    className,
    component: Component,
    target,
    onResize,
  } = providedProps as WithDefaultProps;

  const [element, setElement] = useState<HTMLElement | null>(null);
  const getTarget = target || element;
  useResizeObserver({ disableHeight, disableWidth, getTarget, onResize });
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
};

const defaultProps: DefaultProps = {
  disableHeight: false,
  disableWidth: false,
  component: "span",
};

ResizeObserver.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
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
  }
}

export default ResizeObserver;
