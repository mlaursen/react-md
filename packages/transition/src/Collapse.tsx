import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { IBaseProps } from "@react-md/internal-types";

declare const process: any;

export interface ICollapseTransitionStyle {
  maxHeight?: number;
  paddingTop?: number;
  paddingBottom?: number;
}

/**
 * An interface for an accessible collapse transition.
 */
export interface ICollapseTransition {
  id: string;
  style: ICollapseTransitionStyle;
  className: string;
  onTransitionEnd: () => void;
  ["aria-hidden"]?: "true" | "false";
  ref: React.RefObject<any>;
}

export interface ICollpaseProps extends IBaseProps {
  /**
   * An id for the collapse component. This is required for accessibility and requires
   * an element on the page to have:
   * - aria-controls="id"
   * - aria-expanded="true" // or "false"
   */
  id: string;

  /**
   * Boolean if currently collapsed.
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
   * ```
   * desiredHeight = minHeight + minPaddingBottom + minPaddingTop;
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
  removeCollapsedChildren?: boolean;
  children?: React.ReactNode | ((transitionProps: ICollapseTransition) => React.ReactNode | null);
}

export interface ICollapseDefaultProps {
  minHeight: number;
  minPaddingBottom: number;
  minPaddingTop: number;
  removeCollapsedChildren: boolean;
}

export type CollapseWithDefaultProps = ICollpaseProps & ICollapseDefaultProps;

export interface ICollapseState {
  style: ICollapseTransitionStyle;
  transitioning: boolean;
  collapsed: boolean;
  container: React.RefObject<any>;
}

export default class Collapse extends React.Component<ICollpaseProps, ICollapseState> {
  public static propTypes = {
    id: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    minHeight: PropTypes.number,
    minPaddingTop: PropTypes.number,
    minPaddingBottom: PropTypes.number,
    transitionDuration: PropTypes.number,
    removeCollapsedChildren: PropTypes.bool,
  };

  public static defaultProps = {
    minHeight: 0,
    minPaddingBottom: 0,
    minPaddingTop: 0,
  };

  public static getDerivedStateFromProps(nextProps: CollapseWithDefaultProps, prevState: ICollapseState) {
    const { container } = prevState;
    const {
      collapsed,
      minHeight,
      minPaddingBottom,
      minPaddingTop,
    } = nextProps;
    if (container.current && prevState.collapsed !== collapsed) {
      return {
        style: {
          maxHeight: collapsed ? minHeight : container.current.scrollHeight,
          paddingTop: collapsed ? minPaddingTop : null,
          paddingBottom: collapsed ? minPaddingBottom : null,
        },
        transitioning: true,
        collapsed: nextProps.collapsed,
      };
    }

    return null;
  }

  constructor(props: CollapseWithDefaultProps) {
    super(props);

    const {
      collapsed,
      minHeight,
      minPaddingBottom,
      minPaddingTop,
    } = props;

    this.state = {
      style: {
        maxHeight: collapsed ? minHeight : undefined,
        paddingBottom: collapsed ? minPaddingBottom : undefined,
        paddingTop: collapsed ? minPaddingTop : undefined,
      },
      transitioning: false,
      collapsed: props.collapsed,
      container: React.createRef(),
    };
  }

  public componentDidUpdate(prevProps: CollapseWithDefaultProps, prevState: ICollapseState) {
    const { container, transitioning } = this.state;
    if (container.current && this.state.transitioning !== prevState.transitioning) {
      const { minHeight, minPaddingBottom, minPaddingTop, collapsed } = this.props;
      this.setState({
        style: {
          maxHeight: collapsed ? minHeight : container.current.scrollHeight,
          paddingTop: collapsed ? minPaddingTop : undefined,
          paddingBottom: collapsed ? minPaddingBottom : undefined,
        },
      });
    }

    if (process.env.NODE_ENV === "development" && !this.props.collapsed && typeof this.props.children !== "function") {
      const { id } = this.props;
      const toggles = document.querySelectorAll(`[aria-controls="${id}"]`);
      if (!toggles.length) {
        const message = "The `Collapse` component requires an element on the page to have " +
          `\`aria-controls="COLLAPSE_ID" and \`aria-expanded="EXPANDED_STATE"\` but none were found. ` +
          "If this is being used for an independent animation only, please use the children callback " +
          `function instead. Collapse id: \`${id}\`.`;
        throw new Error(message);
      }
    }
  }

  public render() {
    const { style, container, transitioning } = this.state;
    const {
      id,
      className,
      collapsed,
      children,
      minHeight,
      minPaddingBottom,
      minPaddingTop,
    } = this.props;

    const isEmptyCollapsed = this.isEmptyCollapsed();
    const props: ICollapseTransition = {
      id,
      style,
      className: cn("md-collapse", {
        "md-collapse--enter": transitioning && !collapsed,
        "md-collapse--leave": transitioning && collapsed,
        "md-collapse--no-overflow": transitioning || collapsed,
      }, className),
      onTransitionEnd: this.handleTransitionEnd,
      ref: container,
    };

    if (minHeight === 0) {
      props["aria-hidden"] = collapsed ? "true" : "false";
    }

    if (typeof children === "function") {
      return children(props);
    }

    let content = null;
    if (!this.isEmptyCollapsed() || (transitioning || !collapsed)) {
      content = children;
    }

    return (
      <div {...props}>
        {content}
      </div>
    );
  }

  private isEmptyCollapsed = ({
    removeCollapsedChildren,
    minHeight,
    minPaddingBottom,
    minPaddingTop,
  } = this.props): boolean => {
    if (typeof removeCollapsedChildren === "boolean") {
      return removeCollapsedChildren;
    }

    return minHeight === 0 && minPaddingBottom === 0 && minPaddingTop === 0;
  }

  private handleTransitionEnd = (): void => {
    if (this.state.transitioning) {
      let { style } = this.state;
      if (this.isEmptyCollapsed()) {
        style = {};
      }

      this.setState({ transitioning: false, style });
    }
  }
}
