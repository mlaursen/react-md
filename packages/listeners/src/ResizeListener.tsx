import * as React from "react";
import * as PropTypes from "prop-types";

import { throttleEvent, IThrottledEventHandler, addTouchEvent, removeTouchEvent } from "@react-md/utils";

export interface IResizeListenerBaseProps {
  /**
   * The function to call when the throttled resize event has been triggered. Either this or a children
   * callback function is required to work, but this is the "preferred" way of handling resizes since you
   * might need to do additional checks before re-rendering children.
   *
   * Either the `onResize` or `children` prop is required, but both should **not** be used at the same time.
   *
   * @docgen
   */
  onResize?: (event: Event) => void;

  /**
   * An optional children callback function that will be called after each successful resize event.
   * This method isn't quite as preferred as using the `onResize` prop, but it can be done.
   *
   * Either the `onResize` or `children` prop is required, but both should **not** be used at the same time.
   *
   * @docgen
   */
  children?: () => React.ReactNode;

  /**
   * This is the duration between a touchmove event and a resize event that will consider the
   * resize event valid. Some mobile browsers will incorrectly trigger a resize event when the user
   * touches the page and scrolls because fixed toolbars move within the viewport.
   *
   * @docgen
   */
  touchDelay?: number;

  /**
   * This is the duration between a scroll event and a resize event that will consider the
   * resize event valid. Some mobile browsers will incorrectly trigger a resize event when
   * the page scrolls because the fixed toolbars move within the viewport.
   *
   * @docgen
   */
  scrollDelay?: number;

  /**
   * Boolean if the resize listener should also be updated so that it is not triggered incorrectly
   * by iOS devices when the user scrolls the page.
   *
   * @docgen
   */
  fixTouches?: boolean;

  /**
   * Boolean if the resize listener should also be updated so that it does not trigger incorrectly
   * by page scrolls.
   *
   * @docgen
   */
  fixScrolls?: boolean;
}

export interface IResizeListenerWithResize extends IResizeListenerBaseProps {
  onResize: (e: Event) => void;
}

export interface IResizeListenerWithChildren extends IResizeListenerBaseProps {
  children: () => React.ReactNode;
}

export type IResizeListenerProps = IResizeListenerWithResize | IResizeListenerWithChildren;

export interface IResizeListenerDefaultProps {
  fixTouches: boolean;
  fixScrolls: boolean;
  touchDelay: number;
  scrollDelay: number;
}

export type ResizeListenerWithDefaultProps = IResizeListenerProps & IResizeListenerDefaultProps;

export default class ResizeListener extends React.Component<IResizeListenerProps, {}> {
  public static propTypes = {
    onResize: PropTypes.func.isRequired,
    capture: PropTypes.bool,
    touchDelay: PropTypes.number,
    scrollDelay: PropTypes.number,
    children: PropTypes.node,
  };

  public static defaultProps: IResizeListenerDefaultProps = {
    fixTouches: true,
    fixScrolls: true,
    touchDelay: 800,
    scrollDelay: 800,
  };

  private scrollTimeout?: number;
  private touchMoveTimeout?: number;
  private resizeHandler: IThrottledEventHandler | null;
  private scrollHandler: IThrottledEventHandler | null;

  constructor(props: IResizeListenerProps) {
    super(props);

    this.resizeHandler = null;
    this.scrollHandler = null;
  }

  public componentDidMount() {
    this.resizeHandler = throttleEvent("resize", window);
    this.resizeHandler.add(this.handleResize);
    this.scrollHandler = throttleEvent("scroll", window, true);

    this.updateScroll();
    this.updateTouch();
  }

  public componentDidUpdate(prevProps: ResizeListenerWithDefaultProps) {
    if (this.props.fixScrolls !== prevProps.fixScrolls) {
      this.updateScroll();
    }

    if (this.props.fixTouches !== prevProps.fixTouches) {
      this.updateTouch();
    }
  }

  public componentWillUnmount() {
    window.clearTimeout(this.scrollTimeout);
    window.clearTimeout(this.touchMoveTimeout);
    removeTouchEvent(window, "move", this.handleTouchMove);

    if (this.resizeHandler) {
      this.resizeHandler.remove(this.handleResize);
    }

    if (this.scrollHandler) {
      this.scrollHandler.remove(this.handleScroll);
    }
  }

  public render() {
    const { children } = this.props;
    return children ? children() : null;
  }

  private updateScroll = (enabled: boolean = (this.props as ResizeListenerWithDefaultProps).fixScrolls) => {
    if (!this.scrollHandler) {
      return;
    }

    if (enabled) {
      this.scrollHandler.add(this.handleScroll);
    } else {
      this.scrollHandler.remove(this.handleScroll);
    }
  };

  private updateTouch = (enabled: boolean = (this.props as ResizeListenerWithDefaultProps).fixTouches) => {
    if (enabled) {
      addTouchEvent(window, "move", this.handleTouchMove);
    } else {
      removeTouchEvent(window, "move", this.handleTouchMove);
    }
  };

  private handleResize = (event: Event) => {
    const { fixScrolls, fixTouches } = this.props;
    if ((!fixScrolls || this.scrollTimeout === undefined) && (!fixTouches || this.touchMoveTimeout === undefined)) {
      const { onResize, children } = this.props;
      if (onResize) {
        onResize(event);
      } else if (children) {
        // force re-render the children so any rendering logic can be done
        this.forceUpdate();
      }
    }
  };

  private handleScroll = () => {
    window.clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.scrollTimeout = undefined;
    }, this.props.scrollDelay);
  };

  private handleTouchMove = () => {
    window.clearTimeout(this.touchMoveTimeout);
    this.touchMoveTimeout = setTimeout(() => {
      this.touchMoveTimeout = undefined;
    }, this.props.touchDelay);
  };
}
