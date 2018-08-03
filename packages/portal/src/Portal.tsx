import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";

export interface IPortalBaseProps {
  visible: boolean;
  into?: (() => HTMLElement) | string | HTMLElement;
  intoId?: string;

  lastChild?: boolean;
}

export interface IPortalIntoProps extends IPortalBaseProps {
  into: (() => HTMLElement) | string;
}

export interface IPortalIntoIdProps extends IPortalBaseProps {
  intoId: string;
}

export type IPortalProps = IPortalBaseProps | IPortalIntoProps | IPortalIntoIdProps;
export interface IPortalDefaultProps {
  lastChild: boolean;
}

export interface IPortalState {
  container: HTMLElement | null;
}

export default class Portal extends React.Component<IPortalProps, IPortalState> {
  public static propTypes = {
    className: PropTypes.string,
  };

  public static defaultProps: IPortalDefaultProps = {
    lastChild: false,
  };

  public static getDerivedStateFromProps(nextProps: IPortalProps, prevState: IPortalState) {
    if (!prevState.container && nextProps.visible) {
      return Portal.renderPortal(nextProps);
    } else if (prevState.container && !nextProps.visible) {
      return Portal.removePortal();
    }
    return null;
  };

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
