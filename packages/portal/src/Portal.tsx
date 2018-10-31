import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";

/**
 * This is the type for how a portal can be rendered into another element.
 * This can either be a function that returns the HTMLElement, an HTMLElement,
 * or a `document.querySelector` string.
 */
export type PortalInto = (() => HTMLElement) | HTMLElement | string;

export interface IPortalProps {
  /**
   * Boolean if the portal is currently visible.
   */
  visible: boolean;

  /**
   * Either a function that returns an HTMLElement, an HTMLElement, or a `document.querySelector` string
   * that will return the HTMLElement to render the children into. If both the `into` and `intoId` props
   * are `undefined`, the `document.body` will be chosen instead.
   */
  into?: PortalInto;

  /**
   * The id of an element that the portal should be rendered into. This element **must** exist on the page
   * before the `visible` prop is enabled to work. If both the `into` and `intoId` props are `undefined`,
   * the `document.body` will be chosen instead.
   */
  intoId?: string;

  /**
   * The children to render within the portal.
   */
  children?: React.ReactNode;
}

export interface IPortalState {
  container: HTMLElement | null;
}

export default class Portal extends React.Component<IPortalProps, IPortalState> {
  public static propTypes = {
    visible: PropTypes.bool.isRequired,
    into: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
      PropTypes.instanceOf(HTMLElement),
    ]),
    intoId: PropTypes.string,
  };

  public static getDerivedStateFromProps(nextProps: IPortalProps, prevState: IPortalState) {
    if (!prevState.container && nextProps.visible) {
      return Portal.renderPortal(nextProps);
    } else if (prevState.container && !nextProps.visible) {
      return Portal.removePortal();
    }

    return null;
  }

  private static renderPortal = ({ into, intoId }: IPortalProps) => {
    const isDev = process.env.NODE_ENV !== "production";
    let container: HTMLElement | null = null;
    if (typeof into === "undefined" && typeof intoId === "undefined") {
      container = document.body;
    } else if (typeof intoId === "string") {
      container = document.getElementById(intoId);
      if (!container && isDev) {
        throw new Error(
          `Unable to find a valid HTMLElement to render a portal into with the provided id: \`${intoId}\`. ` +
            "Please provide an id of an element that exists on the page at the time of the portal rendering, " +
            "provide a valid `into` prop, or leave both the `intoId` and `into` props `undefined` to render in " +
            "the `document.body`."
        );
      }
    } else if (typeof into === "string") {
      container = document.querySelector(into);
      if (!container && isDev) {
        throw new Error(
          `Unable to find a valid HTMLElement to render a portal into with the provided querySelector: \`${into}\`. ` +
            "Please provide a querySelector that will return a valid HTMLElement on the page at the time of the " +
            "portal rendering, an HTMLElement, an id for an element on the page with `intoId`, or leave both the " +
            "`intoId` and `into` props `undefined` to render in the `document.body`."
        );
      }
    } else if (typeof into === "function") {
      container = into();
      if (!container && isDev) {
        throw new Error(
          `Unable to find a valid HTMLElement to render a portal into with the provided into function: \`${into}\`. ` +
            "Please return a valid HTMLElement from this function, switch to a querySelector, switch to a static " +
            "HTMLElement, or leave both the `intoId` and `into` props `undefined` to render in the `document.body`."
        );
      }
    } else if (into) {
      container = into;
    }

    return { container };
  };

  private static removePortal = () => ({ container: null });

  constructor(props: IPortalProps) {
    super(props);

    this.state = { container: null };
  }

  public componentDidMount() {
    if (this.props.visible && !this.state.container) {
      this.setState(Portal.renderPortal(this.props));
    }
  }

  public render() {
    const { container } = this.state;
    const { children, visible } = this.props;
    if (!container || !visible) {
      return null;
    }

    return ReactDOM.createPortal(children, container);
  }
}
