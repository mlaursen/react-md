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
   * Boolean if the resize listener should no longer ignore resize events that can occur on iOS devices when the user
   * scrolls which causes the fixed toolbar to move out of the viewport.
   *
   * @docgen
   */
  disableTouchFixes?: boolean;

  /**
   * Boolean if the resize listener should no longer ignore resize events that can occur when the user scrolls the page.
   * This normally goes hand-in-hand with the `disableTouchFixes` prop.
   *
   * @docgen
   */
  disableScrollFixes?: boolean;

  /**
   * Boolean if the `onResize` prop **should not** be called after the component mounts. This functionality is enabled
   * by default since it makes initial layout changes easier.
   *
   * NOTE: This will be a `new Event("resize")` that is dispatched from the `window`. This means that it will not
   * be a trusted source.
   *
   * @docgen
   */
  disableMountResizeTrigger?: boolean;
}

export interface IResizeListenerWithResize extends IResizeListenerBaseProps {
  onResize: (e: Event) => void;
}

export interface IResizeListenerWithChildren extends IResizeListenerBaseProps {
  children: () => React.ReactNode;
}

export type IResizeListenerProps = IResizeListenerWithResize | IResizeListenerWithChildren;

export interface IResizeListenerDefaultProps {
  touchDelay: number;
  scrollDelay: number;
  disableTouchFixes: boolean;
  disableScrollFixes: boolean;
  disableMountResizeTrigger: boolean;
}

export type ResizeListenerWithDefaultProps = IResizeListenerProps & IResizeListenerDefaultProps;

/**
 * The `ResizeListener` is a component used to create "performant" window resize listeners that also
 * fixes some of the inconsistencies with how different devices and browsers trigger resize events.
 */
export default class ResizeListener extends React.Component<IResizeListenerProps, {}> {
  public static propTypes = {
    onResize: PropTypes.func,
    touchDelay: PropTypes.number,
    scrollDelay: PropTypes.number,
    children: PropTypes.func,
    disableTouchFixes: PropTypes.bool,
    disableScrollFixes: PropTypes.bool,
    disableMountResizeTrigger: PropTypes.bool,
    _validate: (props: IResizeListenerProps, propName: string, componentName: string) => {
      const isResize = typeof props.onResize !== "undefined";
      const isChildren = typeof props.children !== "undefined";
      if (isResize || isChildren) {
        return null;
      }

      return new Error(
        `The \`${componentName}\` component requires either the \`onResize\` or \`children\` props to be defined ` +
          "as functions but both were `undefined`."
      );
    },
  };

  public static defaultProps: IResizeListenerDefaultProps = {
    touchDelay: 800,
    scrollDelay: 800,
    disableTouchFixes: false,
    disableScrollFixes: false,
    disableMountResizeTrigger: false,
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
    const { disableMountResizeTrigger, onResize } = this.props;
    this.resizeHandler = throttleEvent("resize", window);
    this.resizeHandler.add(this.handleResize);
    this.scrollHandler = throttleEvent("scroll", window, true);

    this.updateScroll();
    this.updateTouch();

    if (onResize && !disableMountResizeTrigger) {
      window.dispatchEvent(new Event("resize"));
    }
  }

  public componentDidUpdate(prevProps: ResizeListenerWithDefaultProps) {
    if (this.props.disableScrollFixes !== prevProps.disableScrollFixes) {
      this.updateScroll();
    }

    if (this.props.disableTouchFixes !== prevProps.disableTouchFixes) {
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

  private updateScroll = () => {
    if (!this.scrollHandler) {
      return;
    }

    if (!this.props.disableScrollFixes) {
      this.scrollHandler.add(this.handleScroll);
    } else {
      this.scrollHandler.remove(this.handleScroll);
    }
  };

  private updateTouch = () => {
    if (!this.props.disableTouchFixes) {
      addTouchEvent(window, "move", this.handleTouchMove);
    } else {
      removeTouchEvent(window, "move", this.handleTouchMove);
    }
  };

  private handleResize = (event: Event) => {
    const { disableScrollFixes, disableTouchFixes } = this.props;
    if ((disableScrollFixes || !this.scrollTimeout) && (disableTouchFixes || !this.touchMoveTimeout)) {
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
