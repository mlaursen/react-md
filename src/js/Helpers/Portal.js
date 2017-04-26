import React, { PureComponent, PropTypes } from 'react';
import {
  unmountComponentAtNode as unmount,
  unstable_renderSubtreeIntoContainer as render,
} from 'react-dom';

/**
 * Creates a "Portal" for the children to be rendered in. Basically it will render the
 * children only when the `visible` prop is `true`. When it is visible, a new `component`
 * will be rendered as the first child in the body with the children inside.
 *
 * Unlike all the other components, `style` will not be applied for the `Portal`.
 */
export default class Portal extends PureComponent {
  static propTypes = {
    /**
     * An optional className to apply to the newly created `component` when visible.
     */
    className: PropTypes.string,

    /**
     * Boolean if the children are visible.
     */
    visible: PropTypes.bool.isRequired,

    /**
     * The children to render when visible.
     */
    children: PropTypes.element,

    /**
     * The component to render as. This should be a valid DOM element.
     */
    component: PropTypes.string.isRequired,

    /**
     * An optional function to call when the portal is opened.
     */
    onOpen: PropTypes.func,

    /**
     * An optional function to call when the portal is closed
     */
    onClose: PropTypes.func,

    /**
     * An optional DOM Node to render the portal into. The default is to render as
     * the first child in the `body`.
     */
    renderNode: PropTypes.object,

    /**
     * Boolean if the portal should render the childeren as the last child of the `renderNode`
     * or `body` instead of the first.
     */
    lastChild: PropTypes.bool,
  };

  static defaultProps = {
    component: 'span',
  };

  constructor(props) {
    super(props);

    this._portal = null;
    this._container = null;

    this._applyStyles = this._applyStyles.bind(this);
    this._renderPortal = this._renderPortal.bind(this);
    this._removePortal = this._removePortal.bind(this);
  }

  componentDidMount() {
    if (this.props.visible) {
      this._renderPortal(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { visible, onOpen } = nextProps;
    if (this.props.visible === visible && this._container) {
      // Need to just re-render the subtree
      this._renderPortal(nextProps);
      return;
    }

    if (visible) {
      if (onOpen) {
        onOpen();
      }
      this._renderPortal(nextProps);
    } else {
      this._removePortal();
    }
  }

  componentWillUnmount() {
    this._removePortal();
  }

  _applyStyles(props) {
    if (props.className) {
      this._container.className = props.className;
    }
  }

  _renderPortal(props) {
    if (!this._container) {
      this._container = document.createElement(props.component);

      this._applyStyles(props);
      const node = (props.renderNode || document.body);
      if (props.lastChild) {
        node.appendChild(this._container);
      } else {
        node.insertBefore(this._container, node.firstChild);
      }
    } else {
      this._applyStyles(props);
    }

    this._portal = render(this, props.children, this._container);
  }

  _removePortal() {
    if (this.props.onClose) {
      this.props.onClose();
    }

    if (this._container) {
      unmount(this._container);
      (this.props.renderNode || document.body).removeChild(this._container);
    }

    this._portal = null;
    this._container = null;
  }

  render() {
    // When doing server side rendering, actualy render the component as a direct child of its parent.
    // Once it has been rendered and working client side, it will be removed correctly.
    if (typeof window === 'undefined' && this.props.visible) {
      const { component: Component, className, children } = this.props;
      return <Component className={className}>{children}</Component>;
    }

    return null;
  }
}
