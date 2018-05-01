import * as React from "react";
import { Component } from "react";
import * as PropTypes from "prop-types";
import { createPortal } from "react-dom";

import { RenderContainer } from "../../types";

export interface IPortalProps {
  /**
   * An optional id to apply to the portal's container. This is generally recommended for
   * testing and debugging benefits only when the `render` prop is provided.
   */
  id?: string;

  /**
   * An optional class name to apply to the portal's container element.
   */
  className?: string;

  /**
   * A single React element that should be rendered in the portal's container.
   */
  children: React.ReactElement<any>;

  /**
   * Boolean if the Portal is currently visible.
   */
  visible: boolean;

  /**
   * This is how the Portal determines where it's child should be rendered in the entire
   * document. This can either be a function, string, HTMLELement, or null.
   *
   * If this is a function, it should return an HTMLElement on the page. So for example:
   * ```js
   * function render(): HTMLElement {
   *   return document.getElementById('portal-entry-point') || document.body;
   * }
   * ```
   *
   * If this is a string, it will be passed to `document.querySelector`. So for example:
   * ```js
   * const renderById = '#portal-entry-point';
   * const renderByClassName = '.portal-entry-point';
   * const renderComplex = '[aria-haspopup="true"] > span';
   * ```
   *
   * If this is an HTMLElement, the children will be rendered as a child of this element.
   *
   * Finally, if this is null, it will render in the `document.body`.
   */
  render?: (() => HTMLElement) | string | HTMLElement | null;

  /**
   * Boolean if the Portal should render the children as the last child in the Portal's container
   * instead of the first.
   */
  lastChild?: boolean;
}

export interface IDefaultPortalProps {
  id: "";
  className: "";
}

export type PortalWithDefaultProps = IPortalProps & IDefaultPortalProps;

export interface IPortalState {
  container: RenderContainer;
}

function removePortal(): IPortalState {
  return { container: null };
}

/**
 * This will be called every single time the component updates while the visible prop
 * is true. The first time this is run, it will create an HTMLElement with the provided
 * tag prop so that the children can be rendered in it.
 */
function renderPortal(props: PortalWithDefaultProps, state: IPortalState): IPortalState {
  const { id, className, render } = props;
  let { container } = state;

  if (container === null) {
    if (typeof render === "function") {
      container = render();
      if (process.env.NODE_ENV !== "production" && !container) {
        const message = "The render function provided to the Portal component did not return a valid HTMLElement." +
          `Falling back to the \`document.body\`. This should be fixed before moving to production.`;

        // tslint:disable-next-line:no-console
        console.error(message);
      }
    } else if (typeof render === "string") {
      container = document.querySelector(render);
      if (process.env.NODE_ENV !== "production" && !container) {
        const message = "Unable to find a valid HTMLElement to render a portal in with the provided query selector: " +
          `\`${render}\`. Falling back to the \`document.body\`. This should be fixed before moving to production.`;

        // tslint:disable-next-line:no-console
        console.error(message);
      }
    } else if (render) {
      container = render;
    }

    if (!container) {
      container = document.body;
    }
  }

  if (container.id !== id && container !== document.body) {
    container.id = id;
  }

  if (container.className !== className) {
    container.className = className;
  }

  return { container };
}

export default class Portal extends Component<PortalWithDefaultProps, IPortalState> {
  public static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.element.isRequired,
    visible: PropTypes.bool.isRequired,
    tag: PropTypes.oneOf(["span", "div"]),
    render: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.instanceOf(HTMLElement),
    ]),
    lastChild: PropTypes.bool,
  };

  public static defaultProps = {
    id: "",
    className: "",
    tag: "span",
    render: null,
    lastChild: false,
  };

  public static getDerivedStateFromProps(nextProps: PortalWithDefaultProps, prevState: IPortalState) {
    const { container } = prevState;
    const { id, className, visible } = nextProps;

    const nextState = visible ? renderPortal(nextProps, prevState) : removePortal();
    if (container !== nextState.container) {
      return nextState;
    }

    return null;
  }

  public state = {
    container: null,
    portalElement: null,
  };

  public render() {
    const { visible, children } = this.props;
    const { container } = this.state;
    if (!container) {
      return null;
    }

    return createPortal(children, container);
  }
}
