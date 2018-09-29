import * as React from "react";
import * as PropTypes from "prop-types";
import ResizeObserverAPI from "resize-observer-polyfill";

export interface IResizeObserverResizeOptions {
  readonly el: Element | null;
  readonly height: number;
  readonly width: number;
  readonly scrollHeight: number;
  readonly scrollWidth: number;
}

export interface IResizeObserverBaseProps {
  /**
   * Boolean if the height should be watched for the resize target.
   *
   * @docgen
   */
  watchHeight?: boolean;

  /**
   * Boolean if the width should be watched for the resize target.
   *
   * @docgen
   */
  watchWidth?: boolean;

  /**
   * The target for the resize observer. This can either a `document.querySelector` string,
   * an `Element`, or `null`. If the target is `null`, the resize observer will not be started
   * until it is switched to a valid `Element` or query selector.
   *
   * @docgen
   */
  target: string | Element | null;

  /**
   * An optional function to call when the target element resizes. The callback will
   * include the new dimensions of the target element as well as the target element itself.
   *
   * NOTE: It is possible for this to be called with a `null` element and all dimensions set to `0`,
   * so make sure to check for "valid" values before updating elements with these sizes. It _should_ only
   * be `null` and `0` before a correct `target` is initialized.
   *
   * Either the `onResize` or `children` prop is required, but both should **not** be used at the same time.
   *
   * @docgen
   */
  onResize?: (options: IResizeObserverResizeOptions) => void;

  /**
   * An optional render function to call when the target element resizes. This will only be called
   * once the sizing of the element changes, so this might block child updates.
   *
   * Either the `onResize` or `children` prop is required, but both should **not** be used at the same time.
   *
   * @docgen
   */
  children?: (options: IResizeObserverResizeOptions) => React.ReactNode;
}

export interface IResizeObserverWithResize extends IResizeObserverBaseProps {
  onResize: (options: IResizeObserverResizeOptions) => void;
}

export interface IResizeObserverWithChildren extends IResizeObserverBaseProps {
  children: (options: IResizeObserverResizeOptions) => React.ReactNode;
}

export type IResizeObserverProps = IResizeObserverWithResize | IResizeObserverWithChildren;

export interface IResizeObserverDefaultProps {
  watchHeight: boolean;
  watchWidth: boolean;
}

export type ResizeObserverWithDefaultProps = IResizeObserverProps & IResizeObserverDefaultProps;
export type IResizeObserverState = IResizeObserverResizeOptions;

/**
 * This is a React component that works with the
 * [resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill).
 * You can either use a children callback function that will get called each time the
 * target changes sizes, or just use a default `onResize` listener so many elements can
 * be updated with custom functionality
 */
export default class ResizeObserverComp extends React.Component<
  IResizeObserverProps,
  IResizeObserverState
> {
  // It was named ResizeObserver since the resize-observer-polyfill updates the global namespace with ResizeObserver
  public static displayName = "ResizeObserver";
  public static propTypes = {
    watchHeight: PropTypes.bool,
    watchWidth: PropTypes.bool,
    target: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.instanceOf(Element),
    ]),
    onResize: PropTypes.func,
    children: PropTypes.func,
    _validator: (props: IResizeObserverProps, propName: string, componentName: string) => {
      if (typeof props.children === "undefined" && typeof props.onResize === "undefined") {
        return new Error(
          `The \`${componentName}\` component requires either a children callback function or the \`onResize\` ` +
            "props to be provided, but they were both `undefined`."
        );
      }

      return null;
    },
  };

  public static defaultProps: IResizeObserverDefaultProps = {
    watchHeight: true,
    watchWidth: true,
  };

  private observer: ResizeObserver | null;

  constructor(props: IResizeObserverProps) {
    super(props);

    this.state = {
      el: null,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    };

    this.observer = null;
  }

  public componentDidMount() {
    this.observer = new ResizeObserverAPI(this.measure);
    const el = this.findEl(this.props);
    if (el) {
      // this will immediately call measure so it will update the children as well
      this.observer.observe(el);
    }
  }

  public shouldComponentUpdate(
    nextProps: ResizeObserverWithDefaultProps,
    nextState: IResizeObserverState
  ) {
    const { target } = this.props;
    if (target !== nextProps.target) {
      return true;
    } else if (typeof nextProps.children !== "function") {
      return false;
    }

    return this.state !== nextState;
  }

  public componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  public render() {
    const { children } = this.props;

    if (typeof children === "function") {
      return children(this.state);
    }

    return null;
  }

  private findEl = ({ target }: IResizeObserverProps) => {
    if (typeof target === "string") {
      return document.querySelector(target) as Element | null;
    } else if (target) {
      return target;
    }

    return null;
  };

  private isHeightChange = (height: number, scrollHeight: number) => {
    if (!this.props.watchHeight) {
      return false;
    }

    return this.state.height !== height || this.state.scrollHeight !== scrollHeight;
  };

  private isWidthChange = (width: number, scrollWidth: number) => {
    if (!this.props.watchWidth) {
      return false;
    }

    return this.state.width !== width || this.state.scrollWidth !== scrollWidth;
  };

  private measure = (entries: ResizeObserverEntry[]) => {
    if (!this.observer || entries.length > 1 || entries.length === 0) {
      return;
    }

    const [entry] = entries;
    const { height, width } = entry.contentRect;
    const { scrollHeight, scrollWidth } = entry.target;
    if (this.isHeightChange(height, scrollHeight) || this.isWidthChange(width, scrollWidth)) {
      const nextState = {
        height,
        width,
        scrollHeight,
        scrollWidth,
        el: entry.target,
      };

      if (this.props.onResize) {
        this.props.onResize(nextState);
      }

      this.setState(nextState);
    }
  };
}
