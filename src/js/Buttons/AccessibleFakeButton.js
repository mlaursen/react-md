import { PureComponent, PropTypes, createElement } from 'react';
import { SPACE, ENTER } from '../constants/keyCodes';

/**
 * The `AccessibleFakeButton` is a generic component that can be used to render
 * a `div` or any other non `button` components as a button. This should not be
 * used often.
 *
 * The `AccessibleFakeButton` allows the user to tab focus the element, use the
 * space or enter key to trigger the `onClick` event, and toggles the `aria-pressed`
 * attribute.
 */
export default class AccessibleFakeButton extends PureComponent {
  static propTypes = {
    /**
     * Any children to display in the Accessible Fake Button.
     */
    children: PropTypes.node,

    /**
     * An optional onClick function to call whent he user clicks the
     * button or presses space || enter.
     */
    onClick: PropTypes.func,

    /**
     * An optional onKeyUp function to call.
     */
    onKeyUp: PropTypes.func,

    /**
     * The component to render the Fake button as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * The tab index to use for the Fake button so it is keyboard focusable.
     */
    tabIndex: PropTypes.number.isRequired,
  };

  static defaultProps = {
    component: 'div',
    tabIndex: 0,
  };

  constructor(props) {
    super(props);

    this.state = { pressed: false };
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
  }

  _handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.setState({ pressed: !this.state.pressed });
  }

  _handleKeyUp(e) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }

    if ([SPACE, ENTER].indexOf(e.which || e.keyCode) !== -1) {
      this._handleClick(e);
    }
  }

  render() {
    const { component, children, ...props } = this.props;
    delete props.onClick;
    delete props.onKeyUp;

    return createElement(component, {
      ...props,
      role: 'button',
      onClick: this._handleClick,
      onKeyUp: this._handleKeyUp,
      'aria-pressed': this.state.pressed,
    }, children);
  }
}
