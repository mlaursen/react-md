import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

// I could have done this with the react-transition-group instead, but I couldn't figure out how
// to get the transition to work as smoothly as this.

export interface ICollapseChildrenProps {
  /**
   * A conditional style that should be applied to the child element. This will be provided if one
   * or more of the `minHeight`, `minPaddingBottom`, or `minPaddingTop` props are greater than 0 OR
   * the `isEmptyCollapsed` prop is set to `false` OR there are prop styles defined.
   */
  style?: React.CSSProperties;

  /**
   * The class name to apply that will allow for the child element to transition between collapsed
   * states.
   */
  className: string;

  /**
   * A ref callback that **must** be applied to the child element. The value provided to this has
   * to be an html element so that the dynamic max-height style can be calculated. This will work if
   * you apply it to any JSX Element, but if you apply it to a React component, it will fail. To get
   * it working with a React Component instance, you can do something like this instead:
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
}

export interface ICollapseProps {
  /**
   * An optional style to apply. This will be merged with the required animation styles of
   * `min-height`, `padding-top`, and `padding-bottom`. If the `style` prop defines any of these
   * values, they will be used instead of this component's computed values.
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
  minHeight?: number | string;

  /**
   * The min padding bottom to apply to the collapse. This will be used with the `minHeight`
   * and `minPaddingTop` props to set the collapsed size.
   */
  minPaddingBottom?: number | string;

  /**
   * The min padding top to apply to the collapse. This will be used with the `minHeight`
   * and `minPaddingBottom` props to set the collapsed size.
   */
  minPaddingTop?: number | string;

  /**
   * The duration for the entire enter animation in milliseconds. This should normally stay as
   * the default value of `250ms`, but can be updated to be any value if you feel there should
   * be a longer animation time based on content size.
   */
  enterDuration?: number;

  /**
   * The duration for the entire leave animation in milliseconds. This should normally stay at
   * the default value of `200ms`, but can be updated to be any value if you feel there should be
   * a longer animation time based on content size.
   */
  leaveDuration?: number;

  /**
   * Boolean if the children should be removed from the DOM when collapsed. When this prop is
   * `undefined`, it will remove the collapsed children only when the `minHeight`,
   * `minPaddingBottom`, and `minPaddingTop` values are set to `0`.
   */
  isEmptyCollapsed?: boolean;

  /**
   * A callback function that will include the props for rendering a child element with the collapse
   * transition.
   */
  children: (props: ICollapseChildrenProps) => React.ReactNode;

  /**
   * An optional function to call when the "expanding" animation has finished when the `collapsed`
   * prop is changed from `true` to `false`.
   */
  onExpanded?: () => void;

  /**
   * An optional function to call when the "collapsing" animation has finished when the `collapsed`
   * prop is changed from `false` to `true`.
   */
  onCollapsed?: () => void;
}

export interface ICollapseDefaultProps {
  minHeight: number;
  minPaddingBottom: number;
  minPaddingTop: number;
  enterDuration: number;
  leaveDuration: number;
}

export type CollapseWithDefaultProps = ICollapseProps & ICollapseDefaultProps;

export interface ICollapseState {
  prevCollapsed: boolean;
  entering: boolean;
  leaving: boolean;
  maxHeight?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
}

export default class Collapse extends React.Component<ICollapseProps, ICollapseState> {
  public static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    collapsed: PropTypes.bool.isRequired,
    minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minPaddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minPaddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    enterDuration: PropTypes.number,
    leaveDuration: PropTypes.number,
    isEmptyCollapsed: PropTypes.bool,
    onExpanded: PropTypes.func,
    onCollapsed: PropTypes.func,
    children: PropTypes.func.isRequired,
  };

  public static defaultProps: ICollapseDefaultProps = {
    minHeight: 0,
    minPaddingTop: 0,
    minPaddingBottom: 0,
    enterDuration: 250,
    leaveDuration: 200,
  };

  public static getDerivedStateFromProps(nextProps: ICollapseProps, prevState: ICollapseState) {
    const { collapsed, minHeight, minPaddingTop, minPaddingBottom } = nextProps;
    if (collapsed !== prevState.prevCollapsed) {
      // when collapsing, need to immediately start the "leaving" transition so that the
      // children don't unmount before the animation starts.
      if (collapsed) {
        return { prevCollapsed: collapsed, entering: false, leaving: true };
      }

      // when expanding, update styles to be the min values so they can be animated after a render
      return {
        prevCollapsed: collapsed,
        entering: true,
        leaving: false,
        maxHeight: minHeight,
        paddingTop: minPaddingTop,
        paddingBottom: minPaddingBottom,
      };
    }
    return null;
  }

  private target: HTMLElement | null;
  private transitionTimeout?: number;
  constructor(props: ICollapseProps) {
    super(props);

    const { collapsed, minHeight, minPaddingTop, minPaddingBottom } = props;
    this.state = {
      entering: false,
      leaving: false,
      prevCollapsed: collapsed,
      maxHeight: collapsed ? minHeight : undefined,
      paddingTop: collapsed ? minPaddingTop : undefined,
      paddingBottom: collapsed ? minPaddingBottom : undefined,
    };
    this.target = null;
  }

  public componentDidUpdate(prevProps: ICollapseProps) {
    const { collapsed } = this.props;
    const { entering, leaving } = this.state;
    if (collapsed === prevProps.collapsed) {
      return;
    }

    if (!collapsed && entering) {
      this.transitionIn();
    } else if (collapsed && leaving) {
      this.transitionOut();
    }
  }

  public componentWillUnmount() {
    window.clearTimeout(this.transitionTimeout);
  }

  public render() {
    const { entering, leaving, maxHeight, paddingTop, paddingBottom } = this.state;
    const { collapsed, className, children, enterDuration, leaveDuration } = this
      .props as CollapseWithDefaultProps;

    if (collapsed && !entering && !leaving && this.isEmptyCollapsed()) {
      return null;
    }

    const transitionDuration = `${collapsed ? leaveDuration : enterDuration}ms`;

    return children({
      style: this.createStyle(
        transitionDuration,
        this.props.style,
        maxHeight,
        paddingTop,
        paddingBottom
      ),
      className: cn(
        "rmd-collapse",
        {
          "rmd-collapse--enter": entering,
          "rmd-collapse--leave": leaving,
          "rmd-collapse--no-overflow": collapsed || entering || leaving,
        },
        className
      ),
      refCallback: this.refCallback,
    });
  }

  private isEmptyCollapsed = (
    { isEmptyCollapsed, minHeight, minPaddingTop, minPaddingBottom } = this.props
  ) => {
    if (typeof isEmptyCollapsed === "boolean") {
      return isEmptyCollapsed;
    }

    return minHeight === 0 && minPaddingTop === 0 && minPaddingBottom === 0;
  };

  private refCallback = (target: HTMLElement | null) => {
    this.target = target;
  };

  private getSizing = () => {
    let maxHeight;
    let paddingTop;
    let paddingBottom;
    if (this.target) {
      maxHeight = this.target.scrollHeight;

      // clone the element (not deep) just to figure out it's padding without the inline
      // styles applied
      const cloned = this.target.cloneNode(false) as HTMLElement;
      cloned.style.paddingTop = "";
      cloned.style.paddingBottom = "";
      cloned.style.visibility = "hidden";

      const container = this.target.parentElement || document.body;
      container.appendChild(cloned);
      const style = window.getComputedStyle(cloned);
      if (style.paddingTop) {
        paddingTop = parseFloat(style.paddingTop);
      }

      if (style.paddingBottom) {
        paddingBottom = parseFloat(style.paddingBottom);
      }
      container.removeChild(cloned);
    }

    return { maxHeight, paddingTop, paddingBottom };
  };

  /**
   * Handles the expansion animation. This relies on the `getDerivedStateFromProps` returning
   * `entering: true` to work as expected.
   *
   * The basic flow for "expanding" is:
   * - mount children (if they were not rendered before)
   * - apply no-overflow class, enter class, and styles for setting the max-height, padding-top,
   *     and padding-bottom to 0 so they can be animated
   * - apply the calculated max-height, padding-top, and padding bottom to start animation. also
   *     create a timeout for the animation duration
   * - remove "calculated" styles, no-overflow, and enter class names to get ready for the leave
   *     transition.
   */
  private transitionIn = () => {
    window.clearTimeout(this.transitionTimeout);
    const { enterDuration } = this.props as CollapseWithDefaultProps;

    this.transitionTimeout = window.setTimeout(() => {
      this.transitionTimeout = undefined;
      if (this.props.onExpanded) {
        this.props.onExpanded();
      }

      this.setState({
        entering: false,
        maxHeight: undefined,
        paddingTop: undefined,
        paddingBottom: undefined,
      });
    }, enterDuration);
    this.setState(this.getSizing());
  };

  /**
   * Handles the collapsing animation. This relies on the `getDerivedStateFromProps` returning
   * `leaving: true` to work as expected.
   */
  private transitionOut = () => {
    window.clearTimeout(this.transitionTimeout);
    const { leaveDuration, minHeight, minPaddingTop, minPaddingBottom } = this
      .props as CollapseWithDefaultProps;

    this.setState(this.getSizing());

    // wait for the sizing to be applied and then finish the rest of transition. without this
    // wait, the animation might start halfway through. All browsers except for Firefox have
    // fluid leave animations with window.requestAnimationFrame so a timeout has to be used instead.
    this.transitionTimeout = window.setTimeout(() => {
      this.transitionTimeout = window.setTimeout(() => {
        this.transitionTimeout = undefined;
        if (this.props.onCollapsed) {
          this.props.onCollapsed();
        }

        this.setState({
          leaving: false,
          maxHeight: undefined,
          paddingTop: undefined,
          paddingBottom: undefined,
        });
      }, leaveDuration);

      this.setState({
        maxHeight: minHeight,
        paddingTop: minPaddingTop,
        paddingBottom: minPaddingBottom,
      });
    }, 25);
  };

  /**
   * Creates the style for the child element by merging the prop styles into the dynamically
   * generated maxHeight, paddingTop, and paddingBottom styles.
   *
   * When there are no styles to create, `undefined` will be returned instead of a style object.
   */
  private createStyle = (
    transitionDuration: string,
    propStyle?: React.CSSProperties,
    maxHeight?: number | string,
    paddingTop?: number | string,
    paddingBottom?: number | string
  ) => {
    const isHeight = typeof maxHeight !== "undefined";
    const isPadTop = typeof paddingTop !== "undefined";
    const isPadBot = typeof paddingBottom !== "undefined";
    if (!propStyle && !isHeight && !isPadTop && !isPadBot) {
      return undefined;
    }

    if (propStyle) {
      return {
        maxHeight,
        paddingTop,
        paddingBottom,
        transitionDuration,
        ...propStyle,
      };
    }

    return { maxHeight, paddingTop, paddingBottom, transitionDuration };
  };
}
