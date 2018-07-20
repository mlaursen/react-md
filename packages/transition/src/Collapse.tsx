import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import memoizeOne from "memoize-one";

export interface ICollapseChildrenProps {
  /**
   * A conditional style that should be applied to the child element. This will be provided if one or more
   * of the `minHeight`, `minPaddingBottom`, or `minPaddingTop` props are greater than 0 OR the `isEmptyCollapsed`
   * prop is set to `false` OR there are prop styles defined.
   */
  style?: React.CSSProperties;

  /**
   * The class name to apply that will allow for the child element to transition between collapsed states.
   */
  className: string;

  /**
   * A ref callback that **must** be applied to the child element. The value provided to this has to be an html
   * element so that the dynamic max-height style can be calculated. This will work if you apply it to any JSX
   * Element, but if you apply it to a React component, it will fail. To get it working with a React Component
   * instance, you can do something like this instead:
   *
   * ```jsx
   * render() {
   *   return <MyComponent ref={this.handleRef} />;
   * }
   *
   * handleRef = (instance) => {
   *   // choose one of the following
   *   const el = ReactDOM.findDOMNode(instance);
   *   const el = document.getElementById('my-component-id');
   *   const el = document.querySelector('my-component-query');
   *
   *   this.props.callbackRef(instance ? el : null);
   * }
   * ```
   */
  refCallback: (instance: HTMLElement | null) => void;

  /**
   * A transition end handler that must be applied to the child element. This will correctly update the styles
   * and class names once the transition has finished to be ready for the next collapse transition with easing
   * speeds and duration.
   */
  onTransitionEnd: (event: React.TransitionEvent<Element>) => void;
}

export interface ICollapseProps {
  /**
   * An optional style to apply. This will be merged with the required animation styles of `min-height`,
   * `padding-top`, and `padding-bottom`. If the `style` prop defines any of these values, they will be
   * used instead of this component's computed values.
   */
  style?: React.CSSProperties;

  /**
   * An optional class name to also apply to the collapse.
   */
  className?: string;

  /**
   * Boolean if currently collapsed. When this prop changes, the collapse transition will begin.
   */
  collapsed: boolean;

  /**
   * An optional min height to set for the collapsing element. If this is set to `0`,
   * the `children` will be removed from the DOM once the collapsing animation has finished.
   *
   * Note: the height will include the padding props. So if you want the collapse to be
   * `50px` by default and 20px padding, you would want to set the `minHeight` to `90px`.
   * So you want to use this formula:
   *
   * ```ts
   * const desiredHeight = minHeight + minPaddingBottom + minPaddingTop;
   * ```
   */
  minHeight?: number;

  /**
   * The min padding bottom to apply to the collapse. This will be used with the `minHeight`
   * and `minPaddingTop` props to set the collapsed size.
   */
  minPaddingBottom?: number;

  /**
   * The min padding top to apply to the collapse. This will be used with the `minHeight`
   * and `minPaddingBottom` props to set the collapsed size.
   */
  minPaddingTop?: number;

  /**
   * Boolean if the children should be removed from the DOM when collapsed. When this prop is
   * `undefined`, it will remove the collapsed children only when the `minHeight`, `minPaddingBottom`,
   * and `minPaddingTop` values are set to `0`.
   */
  isEmptyCollapsed?: boolean;

  /**
   * A callback function that will include the props for rendering a child element with the collapse
   * transition.
   */
  children: (props: ICollapseChildrenProps) => React.ReactNode;
}

export interface ICollapseDefaultProps {
  minHeight: number;
  minPaddingBottom: number;
  minPaddingTop: number;
}

export type CollapseWithDefaultProps = ICollapseProps & ICollapseDefaultProps;

export interface ICollapseState {
  prevCollapsed: boolean;
  transitioning: boolean;
  maxHeight?: number;
  paddingTop?: number;
  paddingBottom?: number;
}

export default class Collapse extends React.Component<ICollapseProps, ICollapseState> {
  public static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    minHeight: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    collapsed: PropTypes.bool.isRequired,
  };

  public static defaultProps: ICollapseDefaultProps = {
    minHeight: 0,
    minPaddingBottom: 0,
    minPaddingTop: 0,
  };

  public static getDerivedStateFromProps(nextProps: CollapseWithDefaultProps, prevState: ICollapseState) {
    if (nextProps.collapsed !== prevState.prevCollapsed) {
      return {
        transitioning: true,
        prevCollapsed: nextProps.collapsed,
      };
    }

    return null;
  }

  private createStyle = memoizeOne(
    (
      propStyle?: React.CSSProperties,
      maxHeight?: number,
      paddingBottom?: number,
      paddingTop?: number
    ): React.CSSProperties | undefined => {
      if (propStyle) {
        return { maxHeight, paddingBottom, paddingTop, ...propStyle };
      } else if (typeof maxHeight === "number" && typeof paddingBottom === "number" && typeof paddingTop === "number") {
        return {
          maxHeight,
          paddingBottom,
          paddingTop,
        };
      }

      return undefined;
    }
  );

  private el: HTMLElement | null;
  constructor(props: ICollapseProps) {
    super(props);

    const { collapsed, minPaddingTop, minPaddingBottom, minHeight } = props;

    this.state = {
      transitioning: false,
      prevCollapsed: collapsed,
      maxHeight: collapsed ? minHeight : undefined,
      paddingTop: collapsed ? minPaddingTop : undefined,
      paddingBottom: collapsed ? minPaddingBottom : undefined,
    };
    this.el = null;
  }

  public componentDidUpdate(prevProps: CollapseWithDefaultProps, prevState: ICollapseState) {
    if (this.el && this.state.transitioning !== prevState.transitioning) {
      // this allows for the transition class names to be applied, and then starts the transition with
      // the enter or leave transition timing funcs/duration
      window.requestAnimationFrame(this.updateHeight);
    }
  }

  public render() {
    const { transitioning, maxHeight, paddingBottom, paddingTop } = this.state;
    const { children, collapsed } = this.props;

    const style = this.createStyle(this.props.style, maxHeight, paddingBottom, paddingTop);
    const className = cn(
      "rmd-collapse",
      {
        "rmd-collapse--enter": transitioning && !collapsed,
        "rmd-collapse--leave": transitioning && collapsed,
        "rmd-collapse--no-overflow": transitioning || collapsed,
      },
      this.props.className
    );

      return children({
        style,
        className,
        refCallback: this.refCallback,
        onTransitionEnd: this.handleTransitionEnd,
      });
  }

  private updateHeight = () => {
    if (!this.el) {
      return;
    }

    const { collapsed, minHeight, minPaddingBottom, minPaddingTop } = this.props;
    this.setState({
      maxHeight: collapsed ? minHeight : this.el.scrollHeight,
      paddingTop: collapsed ? minPaddingTop : undefined,
      paddingBottom: collapsed ? minPaddingBottom : undefined,
    });
  };

  private refCallback = (instance: HTMLElement | null) => {
    this.el = instance;
  };

  private isEmptyCollapsed = (
    { isEmptyCollapsed, minHeight, minPaddingBottom, minPaddingTop } = this.props
  ): boolean => {
    if (typeof isEmptyCollapsed === "boolean") {
      return isEmptyCollapsed;
    }

    return minHeight === 0 && minPaddingBottom === 0 && minPaddingTop === 0;
  };

  private handleTransitionEnd = (): void => {
    if (this.state.transitioning) {
      const nextState = {
        transitioning: false,
        maxHeight: this.state.maxHeight,
        paddingBottom: this.state.paddingBottom,
        paddingTop: this.state.paddingTop,
      };

      if (this.isEmptyCollapsed()) {
        // set styles to undefined so that class defined styles are used instead which
        // allows for the content to be updated while not collapsed and having sizing issues
        nextState.maxHeight = undefined;
        nextState.paddingBottom = undefined;
        nextState.paddingTop = undefined;
      }
      this.setState(nextState);
    }
  };
}
