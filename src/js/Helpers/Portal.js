import { PureComponent, PropTypes } from 'react';
import {
  unmountComponentAtNode as unmount,
  unstable_renderSubtreeIntoContainer as render,
} from 'react-dom';
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';

/**
 * Creates a "Portal" for the children to be rendered in. Basically it will render the
 * children only when the `visible` prop is `true`. When it is visible, a new `component`
 * will be rendered as the last child in the body with the children inside.
 */
export default class Portal extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the newly created `component` when visible.
     */
    style: PropTypes.object,

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
    children: PropTypes.node,

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
    if (this.props.visible === visible) {
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

    if (props.style) {
      CSSPropertyOperations.setValueForStyles(
        this._container,
        props.style,
        this._reactInternalInstance
      );
    }
  }

  _renderPortal(props) {
    if (!this._container) {
      this._container = document.createElement(props.component);

      this._applyStyles(props);
      document.body.appendChild(this._container);
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
      document.body.removeChild(this._container);
    }

    this._portal = null;
    this._container = null;
  }

  render() {
    return null;
  }
}
